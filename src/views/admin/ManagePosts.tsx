'use client';
import { useState, useEffect, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { useSearchParams } from 'next/navigation';
import { 
  Plus, Edit, Trash2, Search, FileText, Calendar, 
  Eye, Star, ChevronRight, Globe, Image as ImageIcon, 
  Settings, MoreHorizontal, Layout, X
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

type Post = {
  id: string;
  titulo: string;
  categoria: string;
  created_at: string;
  featured: boolean;
};

type Props = {
  initialData?: Post[];
};

export default function ManagePosts({ initialData = [] }: Props) {
  const { role } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const searchParams = useSearchParams();
  const q = searchParams.get('q');

  useEffect(() => {
    if (q !== null) {
      setSearchTerm(q);
    }
  }, [q]);

  // Form states
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState('');
  const [tempoLeitura, setTempoLeitura] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [featured, setFeatured] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // New settings states
  const [autorNome, setAutorNome] = useState('');
  const [autorDescricao, setAutorDescricao] = useState('');
  const [status, setStatus] = useState('publicado');
  const [categories, setCategories] = useState<string[]>([]);
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialData.length === 0) {
      fetchPosts();
    }
    fetchCategories();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('funsa_posts')
      .select('id, titulo, categoria, created_at, featured')
      .order('created_at', { ascending: false });
    if (error) {
      toast({ title: 'Erro ao carregar posts', description: error.message, variant: 'destructive' });
    }
    if (data) setPosts(data);
    setLoading(false);
  }

  async function fetchCategories() {
    const { data } = await supabase.from('funsa_posts').select('categoria');
    const defaults = ['Geral', 'Notícias', 'Memorial', 'Homenagens'];
    if (data) {
      const uniqueCats = Array.from(new Set(data.map((p: any) => p.categoria).filter(Boolean))) as string[];
      defaults.forEach(def => {
        if (!uniqueCats.includes(def)) {
          uniqueCats.push(def);
        }
      });
      setCategories(uniqueCats);
    } else {
      setCategories(defaults);
    }
  }

  function handleOpenNew() {
    setTitulo('');
    setResumo('');
    setCategoria('');
    setImagem('');
    setTempoLeitura('');
    setConteudo('');
    setFeatured(false);
    setAutorNome('');
    setAutorDescricao('');
    setStatus('publicado');
    setEditingId(null);
    setIsOpen(true);
  }

  async function handleEdit(id: string) {
    const { data } = await supabase.from('funsa_posts').select('*').eq('id', id).single();
    if (data) {
      // Converte null → '' para evitar TypeError ao chamar .trim() no formulário
      setTitulo(data.titulo || '');
      setResumo(data.resumo || '');
      setCategoria(data.categoria || '');
      setImagem(data.imagem || '');
      setTempoLeitura(data.tempo_leitura || '');
      setConteudo(data.conteudo || '');
      setFeatured(data.featured ?? false);
      setAutorNome(data.autor_nome || '');
      setAutorDescricao(data.autor_descricao || '');
      setStatus(data.status || 'publicado');
      setEditingId(id);
      setIsOpen(true);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja apagar este post?')) {
      const { error } = await supabase.from('funsa_posts').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Post removido com sucesso' });
        fetchPosts();
      }
    }
  }

  function handleCreateCategory() {
    const cleaned = newCategoryName.trim();
    if (!cleaned) return;
    if (!categories.includes(cleaned)) {
      setCategories(prev => [...prev, cleaned]);
    }
    setCategoria(cleaned);
    setNewCategoryName('');
    setIsNewCategoryOpen(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) return;
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog_covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('blog_covers')
        .getPublicUrl(filePath);

      setImagem(publicUrl);
      toast({ title: 'Imagem carregada com sucesso' });
    } catch (err: any) {
      toast({ title: 'Erro ao fazer upload', description: err.message, variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (!titulo.trim()) {
      toast({ title: 'O título é obrigatório', variant: 'destructive' });
      return;
    }

    // Envia null para campos opcionais vazios (evita erro NOT NULL)
    // Usa (valor || '') antes do .trim() para garantir que nunca chama trim() em null
    const payload = {
      titulo: (titulo || '').trim(),
      resumo: (resumo || '').trim() || null,
      categoria: (categoria || '').trim() || null,
      imagem: (imagem || '').trim() || null,
      tempo_leitura: (tempoLeitura || '').trim() || null,
      conteudo: conteudo || '',
      featured,
      autor_nome: (autorNome || '').trim() || null,
      autor_descricao: (autorDescricao || '').trim() || null,
      status: status || 'publicado',
    };

    if (editingId) {
      const { error } = await supabase
        .from('funsa_posts')
        .update(payload)
        .eq('id', editingId);
      if (error) {
        console.error('Erro ao atualizar post:', error);
        toast({
          title: 'Erro ao atualizar',
          description: `${error.message}${error.details ? ' — ' + error.details : ''}`,
          variant: 'destructive',
        });
      } else {
        toast({ title: '✅ Post atualizado com sucesso!' });
        setIsOpen(false);
        fetchPosts();
      }
    } else {
      const { error } = await supabase
        .from('funsa_posts')
        .insert([payload]);
      if (error) {
        console.error('Erro ao criar post:', error);
        toast({
          title: 'Erro ao publicar',
          description: `${error.message}${error.details ? ' — ' + error.details : ''}`,
          variant: 'destructive',
        });
      } else {
        toast({ title: '✅ Post publicado com sucesso!' });
        setIsOpen(false);
        fetchPosts();
      }
    }
  }

  const filteredPosts = posts.filter(p => 
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-gray-400" />
            Gestão de Blog
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">Controle os artigos e notícias do site institucional.</p>
        </div>
        {role !== 'viewer' && (
          <Button 
            onClick={handleOpenNew} 
            className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-5 h-11 transition-all flex items-center gap-2 font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            Novo Artigo
          </Button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Pesquisar por título..."
            className="admin-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {filteredPosts.length} Artigos encontrados
        </p>
      </div>

      {/* Table Area */}
      <div className="admin-card overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="admin-table-header">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Artigo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Categoria</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data</th>
                {role !== 'viewer' && (
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              <AnimatePresence>
                {loading ? (
                  <tr><td colSpan={role === 'viewer' ? 3 : 4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-semibold text-gray-500">Sincronizando...</span>
                    </div>
                  </td></tr>
                ) : filteredPosts.length === 0 ? (
                  <tr><td colSpan={role === 'viewer' ? 3 : 4} className="px-6 py-12 text-center text-gray-400 italic text-xs">
                    Nenhum conteúdo encontrado.
                  </td></tr>
                ) : (
                  filteredPosts.map((post, idx) => (
                    <motion.tr 
                      key={post.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-gray-50/80 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-800 text-[13px]">{post.titulo}</span>
                            {post.featured && (
                              <span className="flex items-center gap-1 mt-0.5 text-amber-500 text-[9px] font-bold uppercase tracking-wider">
                                <Star className="w-2.5 h-2.5 fill-current" /> Destaque da Home
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-2 py-1 rounded-md bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                            {post.categoria}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(post.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                      {role !== 'viewer' && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            <button onClick={() => handleEdit(post.id)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(post.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent hideCloseButton className="max-w-5xl bg-white rounded-3xl p-0 overflow-hidden border border-gray-100 shadow-2xl overflow-y-auto max-h-[90vh]">
          <form onSubmit={handleSave}>
          {/* Dialog Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-black/10">
                <Layout className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {editingId ? 'Editar Publicação' : 'Nova Publicação'}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  Painel Editorial <ChevronRight className="w-3 h-3" /> Blog Funsa
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Descartar
              </button>
              <button 
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gray-900 text-white text-xs font-bold shadow-xl hover:bg-gray-700 transition-all flex items-center gap-2"
              >
                {editingId ? 'Salvar Alterações' : 'Publicar Artigo'}
              </button>
              <button type="button" onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-50 text-gray-400 ml-2">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#FBFBFC]">
            <div className="lg:col-span-2 space-y-6">
              {/* Main Content Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Título do Artigo</label>
                  <input 
                     required 
                     value={titulo} 
                     onChange={e => setTitulo(e.target.value)} 
                     placeholder="Digite o título da publicação..." 
                     className="w-full text-xl font-bold text-gray-800 placeholder:text-gray-200 border-none p-0 focus:ring-0 outline-none"
                  />
                </div>

                <div className="w-full h-px bg-gray-50" />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Conteúdo Editorial</label>
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-green-50 text-green-600 text-[9px] font-bold uppercase">
                      <Globe className="w-3 h-3" /> Auto-save ativo
                    </div>
                  </div>
                  <div className="rounded-xl border border-gray-100 overflow-hidden bg-white quill-bottom-toolbar">
                    <ReactQuill 
                      theme="snow" 
                      value={conteudo} 
                      onChange={setConteudo} 
                      className="quill-clean min-h-[300px]"
                      modules={{
                        toolbar: {
                          container: [
                            [{ header: [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike'],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['link'],
                            ['clean']
                          ]
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Resumo Curto (SEO / Listagem) — Opcional</label>
                <textarea 
                  value={resumo} 
                  onChange={e => setResumo(e.target.value)} 
                  placeholder="Escreva uma breve descrição para captar a atenção do leitor..." 
                  className="w-full min-h-[100px] p-0 border-none text-sm text-gray-600 placeholder:text-gray-300 focus:ring-0 outline-none resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Sidebar Config */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
                <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2">
                  <Settings className="w-3.5 h-3.5 text-gray-400" />
                  CONFIGURAÇÕES
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Nome do Autor (Opcional)</label>
                    <Input 
                      value={autorNome} 
                      onChange={e => setAutorNome(e.target.value)} 
                      placeholder="Ex: Dr. Lucas Dohmen" 
                      className="h-10 rounded-xl border-gray-100 bg-gray-50/50 text-xs font-medium focus-visible:ring-gray-200" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Descrição Curta (Opcional)</label>
                    <textarea 
                      value={autorDescricao} 
                      onChange={e => setAutorDescricao(e.target.value)} 
                      placeholder="Ex: Advogado Especialista em Direito da Saúde..." 
                      className="w-full min-h-[80px] p-3 rounded-xl border border-gray-100 bg-gray-50/50 text-xs font-medium focus-visible:ring-gray-200 outline-none resize-none leading-relaxed" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Categoria</label>
                    <div className="flex gap-2 items-center">
                      <select 
                        required
                        value={categoria} 
                        onChange={e => setCategoria(e.target.value)}
                        className="flex-1 h-10 rounded-xl border border-gray-100 bg-gray-50/50 px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
                      >
                        <option value="" disabled>Selecione uma categoria...</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <button 
                        type="button" 
                        onClick={() => setIsNewCategoryOpen(!isNewCategoryOpen)}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all ${
                          isNewCategoryOpen 
                            ? 'bg-gray-900 border-gray-900 text-white hover:bg-gray-800' 
                            : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50 shadow-sm'
                        }`}
                      >
                        {isNewCategoryOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                      </button>
                    </div>

                    {isNewCategoryOpen && (
                      <div className="bg-white border border-gray-100 rounded-2xl p-4 mt-2 space-y-3 shadow-sm">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block">Nova Categoria</span>
                        <input 
                          type="text" 
                          value={newCategoryName}
                          onChange={e => setNewCategoryName(e.target.value)}
                          placeholder="Digite o nome..." 
                          className="w-full h-10 px-3 rounded-xl border border-gray-100 bg-gray-50/50 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                        <div className="flex gap-2">
                          <button 
                            type="button" 
                            onClick={handleCreateCategory}
                            className="flex-1 py-2 rounded-xl bg-gray-900 text-white text-[11px] font-bold shadow-sm hover:bg-gray-800 transition-colors"
                          >
                            Criar Categoria
                          </button>
                          <button 
                            type="button" 
                            onClick={() => {
                              setIsNewCategoryOpen(false);
                              setNewCategoryName('');
                            }}
                            className="flex-1 py-2 rounded-xl bg-gray-50 text-gray-600 text-[11px] font-bold hover:bg-gray-100 transition-colors"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Status</label>
                    <select
                      value={status}
                      onChange={e => setStatus(e.target.value)}
                      className="w-full h-10 rounded-xl border border-gray-100 bg-gray-50/50 px-3 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700"
                    >
                      <option value="publicado">Publicado</option>
                      <option value="rascunho">Rascunho</option>
                    </select>
                  </div>



                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${featured ? 'bg-amber-100 text-amber-600 shadow-sm shadow-amber-100' : 'bg-gray-200 text-gray-400'}`}>
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tight">Post em Destaque</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={featured} 
                      onChange={e => setFeatured(e.target.checked)} 
                      className="w-4 h-4 accent-gray-900 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h3 className="text-xs font-bold text-gray-800 flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-gray-400" />
                  IMAGEM DE CAPA
                </h3>
                <div className="space-y-3">
                  {imagem ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden group border border-gray-100 shadow-sm">
                      <img src={imagem} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-white text-gray-800 text-[11px] font-bold rounded-xl shadow-md hover:bg-gray-50 transition-colors">
                          Alterar
                        </button>
                        <button type="button" onClick={() => setImagem('')} className="px-3 py-1.5 bg-red-600 text-white text-[11px] font-bold rounded-xl shadow-md hover:bg-red-700 transition-colors">
                          Remover
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => fileInputRef.current?.click()} 
                      className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:bg-gray-50/50 transition-all flex flex-col items-center justify-center gap-2 bg-gray-50/20"
                    >
                      {uploading ? (
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Enviando imagem...</span>
                        </div>
                      ) : (
                        <>
                          <ImageIcon className="w-8 h-8 text-gray-300" />
                          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Clique para Upload</span>
                        </>
                      )}
                    </div>
                  )}
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    className="hidden" 
                  />
                </div>
              </div>
            </div>
          </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Search, FileText, Calendar, Eye, Star, ChevronRight, Globe, Image as ImageIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

type Post = {
  id: string;
  titulo: string;
  categoria: string;
  created_at: string;
  featured: boolean;
};

export default function ManagePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Form states
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagem, setImagem] = useState('');
  const [tempoLeitura, setTempoLeitura] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [featured, setFeatured] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('funsa_posts').select('id, titulo, categoria, created_at, featured').order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  function handleOpenNew() {
    setTitulo('');
    setResumo('');
    setCategoria('');
    setImagem('');
    setTempoLeitura('');
    setConteudo('');
    setFeatured(false);
    setEditingId(null);
    setIsOpen(true);
  }

  async function handleEdit(id: string) {
    const { data } = await supabase.from('funsa_posts').select('*').eq('id', id).single();
    if (data) {
      setTitulo(data.titulo);
      setResumo(data.resumo);
      setCategoria(data.categoria);
      setImagem(data.imagem);
      setTempoLeitura(data.tempo_leitura);
      setConteudo(data.conteudo);
      setFeatured(data.featured);
      setEditingId(id);
      setIsOpen(true);
    }
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja apagar este post?')) {
      const { error } = await supabase.from('funsa_posts').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Post movido para a lixeira' });
        fetchPosts();
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { titulo, resumo, categoria, imagem, tempo_leitura: tempoLeitura, conteudo, featured };

    if (editingId) {
      const { error } = await supabase.from('funsa_posts').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Post atualizado' }); setIsOpen(false); fetchPosts(); }
    } else {
      const { error } = await supabase.from('funsa_posts').insert([payload]);
      if (error) toast({ title: 'Erro ao criar', variant: 'destructive' });
      else { toast({ title: 'Post publicado' }); setIsOpen(false); fetchPosts(); }
    }
  }

  const filteredPosts = posts.filter(p => 
    p.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-500" />
             </div>
             Gestão de Conteúdo
          </h1>
          <p className="text-gray-500 text-sm mt-1">Artigos educativos e novidades da Rede FUNSA.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-azure hover:bg-navy text-white rounded-xl px-6 py-5 shadow-lg shadow-azure/20 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Artigo
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar artigos..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all text-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-navy">
            <thead className="admin-table-header">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Título do Artigo</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Categoria</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Publicado em</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">Carregando artigos...</td></tr>
              ) : filteredPosts.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">Nenhum artigo encontrado.</td></tr>
              ) : (
                filteredPosts.map(post => (
                  <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-navy group-hover:text-azure transition-colors">{post.titulo}</span>
                        {post.featured && (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-600 text-[9px] font-bold uppercase tracking-tighter">
                            <Star className="w-2.5 h-2.5 fill-current" /> Destaque
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className="px-2 py-0.5 rounded-lg bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest leading-none">
                          {post.categoria}
                       </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 text-xs">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(post.id)} className="p-2 text-azure hover:bg-azure/10 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-6xl bg-[#f8f9fc] rounded-3xl p-0 overflow-hidden border-none shadow-2xl overflow-y-auto max-h-[95vh]">
          <div className="bg-navy p-8 flex items-center justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy to-azure opacity-50" />
            <div className="relative z-10 flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                 <FileText className="w-6 h-6" />
               </div>
               <div>
                  <DialogTitle className="text-2xl font-bold">
                    {editingId ? 'Editar Publicação' : 'Criar Nova Publicação'}
                  </DialogTitle>
                  <p className="text-white/50 text-xs mt-1 uppercase tracking-widest font-semibold flex items-center gap-2">
                    Painel de Redação <ChevronRight className="w-3 h-3" /> Blog Funsa
                  </p>
               </div>
            </div>
            <div className="flex gap-3 relative z-10">
               <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/20 text-sm font-bold hover:bg-white/10 transition-colors">Cancelar</button>
               <button onClick={handleSave} className="px-6 py-2.5 rounded-xl bg-white text-navy text-sm font-bold shadow-xl hover:bg-azure hover:text-white transition-all">
                  {editingId ? 'Atualizar Post' : 'Publicar Agora'}
               </button>
            </div>
          </div>
          
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="admin-card p-6 border-none shadow-sm space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Título do Artigo</label>
                <Input 
                   required 
                   value={titulo} 
                   onChange={e => setTitulo(e.target.value)} 
                   placeholder="Digite um título impactante..." 
                   className="text-2xl h-14 font-bold border-none bg-gray-50 focus-visible:bg-white focus-visible:ring-1 focus-visible:ring-azure transition-all rounded-xl"
                />
              </div>
              
              <div className="admin-card p-0 border-none shadow-sm overflow-hidden bg-white min-h-[400px] flex flex-col">
                <div className="px-6 py-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                   <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Conteúdo do Post</span>
                   <Globe className="w-4 h-4 text-gray-300" />
                </div>
                <ReactQuill 
                  theme="snow" 
                  value={conteudo} 
                  onChange={setConteudo} 
                  className="flex-1 quill-modern"
                />
              </div>

              <div className="admin-card p-6 border-none shadow-sm space-y-4">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Resumo Curto (SEO)</label>
                <textarea 
                  required 
                  value={resumo} 
                  onChange={e => setResumo(e.target.value)} 
                  placeholder="Descreva brevemente o post para a listagem..." 
                  className="w-full min-h-[100px] p-4 rounded-xl border-none bg-gray-50 focus:bg-white focus:ring-1 focus:ring-azure outline-none transition-all text-sm leading-relaxed"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="admin-card p-6 border-none shadow-sm space-y-5">
                <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                  <Settings className="w-4 h-4 text-azure" />
                  Configurações
                </h3>
                
                <div className="space-y-4">
                   <div>
                     <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Categoria</label>
                     <Input required value={categoria} onChange={e => setCategoria(e.target.value)} className="h-10 rounded-xl border-gray-200 text-sm focus-visible:ring-azure" />
                   </div>
                   
                   <div>
                     <label className="block text-[10px] font-bold text-gray-400 uppercase mb-2">Tempo de Leitura</label>
                     <Input required value={tempoLeitura} onChange={e => setTempoLeitura(e.target.value)} placeholder="ex: 5 min" className="h-10 rounded-xl border-gray-200 text-sm focus-visible:ring-azure" />
                   </div>

                   <div className="p-4 rounded-xl bg-gray-50 flex items-center justify-between border border-gray-100">
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${featured ? 'bg-amber-100 text-amber-600' : 'bg-gray-200 text-gray-400'}`}>
                            <Star className="w-4 h-4 fill-current" />
                         </div>
                         <span className="text-xs font-bold text-gray-600 uppercase tracking-tighter">Destacar no Site</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={featured} 
                        onChange={e => setFeatured(e.target.checked)} 
                        className="w-5 h-5 accent-azure cursor-pointer"
                      />
                   </div>
                </div>
              </div>

              <div className="admin-card p-6 border-none shadow-sm space-y-5">
                <h3 className="text-sm font-bold text-navy flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-azure" />
                  Imagem Destacada
                </h3>
                <div className="space-y-3">
                  <Input 
                    value={imagem} 
                    onChange={e => setImagem(e.target.value)} 
                    placeholder="URL da imagem (pública)" 
                    className="h-10 rounded-xl border-gray-200 text-xs focus-visible:ring-azure"
                  />
                  {imagem ? (
                    <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm relative group">
                       <img src={imagem} alt="Preview" className="w-full h-40 object-cover" />
                       <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <Eye className="text-white" />
                       </div>
                    </div>
                  ) : (
                    <div className="h-40 rounded-xl border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-gray-300 gap-2">
                       <ImageIcon className="w-8 h-8 opacity-20" />
                       <span className="text-[10px] font-bold uppercase tracking-widest">Nenhuma imagem</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

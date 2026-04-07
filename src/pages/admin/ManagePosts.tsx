import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Post = {
  id: string;
  titulo: string;
  categoria: string;
  created_at: string;
};

export default function ManagePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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
    const { data } = await supabase.from('posts').select('id, titulo, categoria, created_at').order('created_at', { ascending: false });
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
    const { data } = await supabase.from('posts').select('*').eq('id', id).single();
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
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Post apagado' });
        fetchPosts();
      } else {
        toast({ title: 'Erro ao apagar', variant: 'destructive' });
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { titulo, resumo, categoria, imagem, tempo_leitura: tempoLeitura, conteudo, featured };

    if (editingId) {
      const { error } = await supabase.from('posts').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Post atualizado' }); setIsOpen(false); fetchPosts(); }
    } else {
      const { error } = await supabase.from('posts').insert([payload]);
      if (error) toast({ title: 'Erro ao criar', variant: 'destructive' });
      else { toast({ title: 'Post criado' }); setIsOpen(false); fetchPosts(); }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[23px] font-normal text-[#1d2327] flex items-center gap-4">
          Posts
          <Button onClick={handleOpenNew} className="h-7 px-3 py-0 text-[13px] bg-white text-[#2271b1] border border-[#2271b1] hover:bg-[#f6f7f7] hover:text-[#135e96] font-medium rounded-sm">
            Adicionar novo
          </Button>
        </h1>
      </div>

      <div className="bg-white border border-[#c3c4c7] relative">
        <table className="w-full text-left text-[13px] text-[#3c434a]">
          <thead className="bg-[#f0f0f1]/50 border-b border-[#c3c4c7]">
            <tr>
              <th className="p-3 font-semibold text-[#2c3338]">Título</th>
              <th className="p-3 font-semibold text-[#2c3338]">Categoria</th>
              <th className="p-3 font-semibold text-[#2c3338]">Data</th>
              <th className="p-3 font-semibold text-[#2c3338] text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-3 text-center">Carregando...</td></tr>
            ) : posts.length === 0 ? (
              <tr><td colSpan={4} className="p-3 text-center text-[#3c434a]">Nenhum post encontrado.</td></tr>
            ) : (
              posts.map(post => (
                <tr key={post.id} className="border-b border-[#c3c4c7] last:border-0 hover:bg-[#f6f7f7] transition-colors group">
                  <td className="p-3 font-semibold text-[#2271b1]">{post.titulo}</td>
                  <td className="p-3">{post.categoria}</td>
                  <td className="p-3 text-[#a7aaad]">
                    {new Date(post.created_at).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="p-3 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEdit(post.id)} className="text-[#2271b1] hover:text-[#135e96] text-[13px]">
                      Editar
                    </button>
                    <span className="text-[#c3c4c7]">|</span>
                    <button onClick={() => handleDelete(post.id)} className="text-[#d63638] hover:text-[#d63638] text-[13px]">
                      Lixeira
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f0f0f1] border-[#c3c4c7] p-0">
          <DialogHeader className="p-5 bg-white border-b border-[#c3c4c7]">
            <DialogTitle className="text-[23px] font-normal text-[#1d2327]">
              {editingId ? 'Editar Post' : 'Adicionar novo post'}
            </DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSave} className="p-5 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div>
                <Input required value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Adicionar título" className="text-xl px-4 py-3 border-[#8c8f94] rounded-sm focus-visible:ring-[#2271b1]" />
              </div>
              
              <div className="bg-white border border-[#c3c4c7] p-0 rounded-sm">
                <ReactQuill 
                  theme="snow" 
                  value={conteudo} 
                  onChange={setConteudo} 
                  className="h-80 border-none post-editor"
                />
              </div>

              <div className="bg-white border border-[#c3c4c7] p-4 rounded-sm">
                <label className="block text-[14px] font-semibold text-[#1d2327] mb-2">Resumo</label>
                <textarea required value={resumo} onChange={e => setResumo(e.target.value)} className="w-full border border-[#8c8f94] rounded-sm p-2 text-[13px] focus:ring-1 focus:ring-[#2271b1] outline-none min-h-[80px]" />
              </div>
            </div>

            <div className="space-y-5">
              <div className="bg-white border border-[#c3c4c7] rounded-sm">
                <div className="p-3 border-b border-[#c3c4c7]">
                  <h3 className="text-[14px] font-semibold text-[#1d2327]">Publicar</h3>
                </div>
                <div className="p-4 space-y-4 text-[13px] text-[#3c434a]">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="featured" checked={featured} onChange={e => setFeatured(e.target.checked)} className="rounded-sm border-[#8c8f94] text-[#2271b1] focus:ring-[#2271b1]" />
                    <label htmlFor="featured">Destacar no site</label>
                  </div>
                  <div className="pt-2 border-t border-[#c3c4c7] flex justify-end gap-2">
                    <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1.5 border border-[#2271b1] text-[#2271b1] rounded-sm hover:bg-[#f6f7f7]">Cancelar</button>
                    <button type="submit" className="px-4 py-1.5 bg-[#2271b1] text-white rounded-sm hover:bg-[#135e96]">{editingId ? 'Atualizar' : 'Publicar'}</button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#c3c4c7] rounded-sm">
                <div className="p-3 border-b border-[#c3c4c7]">
                  <h3 className="text-[14px] font-semibold text-[#1d2327]">Detalhes</h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-[13px] text-[#3c434a] mb-1">Categoria</label>
                    <Input required value={categoria} onChange={e => setCategoria(e.target.value)} className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                  </div>
                  <div>
                    <label className="block text-[13px] text-[#3c434a] mb-1">Tempo de Leitura</label>
                    <Input required value={tempoLeitura} onChange={e => setTempoLeitura(e.target.value)} placeholder="ex: 5 min" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#c3c4c7] rounded-sm">
                <div className="p-3 border-b border-[#c3c4c7]">
                  <h3 className="text-[14px] font-semibold text-[#1d2327]">Imagem Destacada</h3>
                </div>
                <div className="p-4">
                  <Input required value={imagem} onChange={e => setImagem(e.target.value)} placeholder="URL da imagem" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                  {imagem && <img src={imagem} alt="Preview" className="w-full mt-3 rounded-sm border border-[#c3c4c7]" />}
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

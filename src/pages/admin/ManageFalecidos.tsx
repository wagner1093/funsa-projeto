import { useState, useEffect } from 'react';
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

type Falecido = {
  id: string;
  nome: string;
  data: string;
  local: string;
  velorio: string;
  sepultamento: string;
  imagem: string | null;
  contato_medico: string | null;
};

export default function ManageFalecidos() {
  const [falecidos, setFalecidos] = useState<Falecido[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [local, setLocal] = useState('');
  const [velorio, setVelorio] = useState('');
  const [sepultamento, setSepultamento] = useState('');
  const [imagem, setImagem] = useState('');
  const [contatoMedico, setContatoMedico] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchFalecidos();
  }, []);

  async function fetchFalecidos() {
    setLoading(true);
    const { data } = await supabase.from('falecidos').select('*').order('created_at', { ascending: false });
    if (data) setFalecidos(data);
    setLoading(false);
  }

  function handleOpenNew() {
    setNome(''); setData(''); setLocal(''); setVelorio(''); setSepultamento(''); setImagem(''); setContatoMedico('');
    setEditingId(null);
    setIsOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja apagar este obituário?')) {
      const { error } = await supabase.from('falecidos').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Obituário apagado' });
        fetchFalecidos();
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { nome, data, local, velorio, sepultamento, imagem, contato_medico: contatoMedico };

    if (editingId) {
      const { error } = await supabase.from('falecidos').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Registro atualizado' }); setIsOpen(false); fetchFalecidos(); }
    } else {
      const { error } = await supabase.from('falecidos').insert([payload]);
      if (error) toast({ title: 'Erro ao criar', variant: 'destructive' });
      else { toast({ title: 'Registro criado' }); setIsOpen(false); fetchFalecidos(); }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[23px] font-normal text-[#1d2327] flex items-center gap-4">
          Obituários
          <Button onClick={handleOpenNew} className="h-7 px-3 py-0 text-[13px] bg-white text-[#2271b1] border border-[#2271b1] hover:bg-[#f6f7f7] hover:text-[#135e96] font-medium rounded-sm">
            Adicionar novo
          </Button>
        </h1>
      </div>

      <div className="bg-white border border-[#c3c4c7] relative">
        <table className="w-full text-left text-[13px] text-[#3c434a]">
          <thead className="bg-[#f0f0f1]/50 border-b border-[#c3c4c7]">
            <tr>
              <th className="p-3 font-semibold text-[#2c3338]">Nome</th>
              <th className="p-3 font-semibold text-[#2c3338]">Data</th>
              <th className="p-3 font-semibold text-[#2c3338]">Sepultamento</th>
              <th className="p-3 font-semibold text-[#2c3338] text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-3 text-center">Carregando...</td></tr>
            ) : falecidos.length === 0 ? (
              <tr><td colSpan={4} className="p-3 text-center text-[#3c434a]">Nenhum registro encontrado.</td></tr>
            ) : (
              falecidos.map(item => (
                <tr key={item.id} className="border-b border-[#c3c4c7] last:border-0 hover:bg-[#f6f7f7] transition-colors group">
                  <td className="p-3 font-semibold text-[#2271b1]">{item.nome}</td>
                  <td className="p-3 text-[#a7aaad]">{item.data}</td>
                  <td className="p-3 text-[#a7aaad]">{item.sepultamento}</td>
                  <td className="p-3 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => {
                        setNome(item.nome); setData(item.data); setLocal(item.local); 
                        setVelorio(item.velorio); setSepultamento(item.sepultamento); 
                        setImagem(item.imagem || ''); setContatoMedico(item.contato_medico || '');
                        setEditingId(item.id); setIsOpen(true);
                      }} className="text-[#2271b1] hover:text-[#135e96] text-[13px]">
                      Editar
                    </button>
                    <span className="text-[#c3c4c7]">|</span>
                    <button onClick={() => handleDelete(item.id)} className="text-[#d63638] hover:text-[#d63638] text-[13px]">
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
        <DialogContent className="max-w-xl bg-[#f0f0f1] border-[#c3c4c7] p-0">
          <DialogHeader className="p-5 bg-white border-b border-[#c3c4c7]">
            <DialogTitle className="text-[23px] font-normal text-[#1d2327]">{editingId ? 'Editar Registro' : 'Novo Obituário'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="p-5 space-y-4">
            <div className="bg-white border border-[#c3c4c7] p-4 rounded-sm grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Nome Completo</label>
                <Input required value={nome} onChange={e => setNome(e.target.value)} className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Data do Falecimento</label>
                <Input required value={data} onChange={e => setData(e.target.value)} placeholder="Ex: 15/02/2026" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Local (Sala)</label>
                <Input required value={local} onChange={e => setLocal(e.target.value)} placeholder="Ex: Sala Memorial" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Horário/Local Velório</label>
                <Input required value={velorio} onChange={e => setVelorio(e.target.value)} className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Data/Local Sepultamento</label>
                <Input required value={sepultamento} onChange={e => setSepultamento(e.target.value)} className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>
            </div>
            <div className="flex justify-end pt-2 gap-2">
              <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1.5 border border-[#2271b1] text-[#2271b1] rounded-sm hover:bg-[#f6f7f7] text-[13px]">Cancelar</button>
              <button type="submit" className="px-4 py-1.5 bg-[#2271b1] text-white rounded-sm hover:bg-[#135e96] text-[13px]">Salvar</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

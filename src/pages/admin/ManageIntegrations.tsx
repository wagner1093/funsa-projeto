import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Integracao = {
  id: string;
  nome: string;
  head_code: string | null;
  body_code: string | null;
  status: boolean;
};

export default function ManageIntegrations() {
  const [integracoes, setIntegracoes] = useState<Integracao[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [headCode, setHeadCode] = useState('');
  const [bodyCode, setBodyCode] = useState('');
  const [status, setStatus] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchIntegracoes();
  }, []);

  async function fetchIntegracoes() {
    setLoading(true);
    const { data } = await supabase.from('site_integracoes').select('*').order('created_at', { ascending: false });
    if (data) setIntegracoes(data);
    setLoading(false);
  }

  function handleOpenNew() {
    setNome(''); setHeadCode(''); setBodyCode(''); setStatus(true);
    setEditingId(null);
    setIsOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja apagar esta integração (Pixel/Tag)?')) {
      const { error } = await supabase.from('site_integracoes').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Integração removida' });
        fetchIntegracoes();
      }
    }
  }

  async function toggleStatus(id: string, currentStatus: boolean) {
    const { error } = await supabase.from('site_integracoes').update({ status: !currentStatus }).eq('id', id);
    if (!error) {
      toast({ title: !currentStatus ? 'Ativado' : 'Pausado' });
      fetchIntegracoes();
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { 
      nome, 
      head_code: headCode, 
      body_code: bodyCode, 
      status 
    };

    if (editingId) {
      const { error } = await supabase.from('site_integracoes').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Integração atualizada' }); setIsOpen(false); fetchIntegracoes(); }
    } else {
      const { error } = await supabase.from('site_integracoes').insert([payload]);
      if (error) toast({ title: 'Erro ao cadastrar', variant: 'destructive' });
      else { toast({ title: 'Integração cadastrada' }); setIsOpen(false); fetchIntegracoes(); }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[23px] font-normal text-[#1d2327] flex items-center gap-4">
          Integrações (Pixels & Tags)
          <Button onClick={handleOpenNew} className="h-7 px-3 py-0 text-[13px] bg-white text-[#2271b1] border border-[#2271b1] hover:bg-[#f6f7f7] hover:text-[#135e96] font-medium rounded-sm">
            Adicionar nova
          </Button>
        </h1>
      </div>

      <div className="bg-white border border-[#c3c4c7] relative">
        <table className="w-full text-left text-[13px] text-[#3c434a]">
          <thead className="bg-[#f0f0f1]/50 border-b border-[#c3c4c7]">
            <tr>
              <th className="p-3 font-semibold text-[#2c3338]">Identificação (Nome)</th>
              <th className="p-3 font-semibold text-[#2c3338]">Status</th>
              <th className="p-3 font-semibold text-[#2c3338] text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-3 text-center">Carregando...</td></tr>
            ) : integracoes.length === 0 ? (
              <tr><td colSpan={3} className="p-3 text-center text-[#3c434a]">Nenhuma integração ativa.</td></tr>
            ) : (
              integracoes.map(item => (
                <tr key={item.id} className="border-b border-[#c3c4c7] last:border-0 hover:bg-[#f6f7f7] transition-colors group">
                  <td className="p-3 font-semibold text-[#2271b1]">
                    {item.nome}
                    <div className="hidden group-hover:flex gap-2 text-[12px] mt-1 text-[#50575e] font-normal">
                       <button onClick={() => toggleStatus(item.id, item.status)} className="text-[#2271b1] hover:text-[#135e96]">{item.status ? 'Pausar' : 'Ativar'}</button>
                    </div>
                  </td>
                  <td className="p-3">
                    {item.status ? (
                      <span className="inline-block px-2 py-0.5 bg-[#edfaeb] text-[#135e2a] border border-[#c3e5bc] rounded-sm text-xs font-semibold">
                        Aprovado/Ativo
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 bg-[#f0f0f1] text-[#3c434a] border border-[#c3c4c7] rounded-sm text-xs font-semibold">
                        Pausado
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => {
                        setNome(item.nome); setHeadCode(item.head_code || ''); setBodyCode(item.body_code || ''); 
                        setStatus(item.status); setEditingId(item.id); setIsOpen(true);
                      }} className="text-[#2271b1] hover:text-[#135e96] text-[13px]">
                      Editar Código
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#f0f0f1] border-[#c3c4c7] p-0">
          <DialogHeader className="p-5 bg-white border-b border-[#c3c4c7]">
            <DialogTitle className="text-[23px] font-normal text-[#1d2327]">
              {editingId ? 'Detalhes da Integração' : 'Nova Integração'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="p-5 space-y-4">
            
            <div className="bg-white border border-[#c3c4c7] p-4 rounded-sm">
              <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Identificação / Nome (Uso interno)</label>
              <Input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Pixel do Facebook da Campanha X" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
            </div>

            <div className="bg-white border border-[#c3c4c7] p-4 rounded-sm">
              <h2 className="text-[14px] font-semibold text-[#1d2327] mb-1 border-b border-[#f0f0f1] pb-2">Bloco &lt;HEAD&gt;</h2>
              <p className="text-[12px] text-[#8c8f94] mb-2 mt-2">Ideal para tags de verificação ou eventos de PageView antecipados.</p>
              <textarea 
                value={headCode} 
                onChange={e => setHeadCode(e.target.value)} 
                className="w-full h-32 p-3 font-mono text-[12px] text-gray-800 bg-[#f9f9f9] border border-[#8c8f94] rounded-sm focus:ring-1 focus:ring-[#2271b1] outline-none"
                placeholder="<!-- Script do Cabeçalho -->"
              />
            </div>

            <div className="bg-white border border-[#c3c4c7] p-4 rounded-sm">
              <h2 className="text-[14px] font-semibold text-[#1d2327] mb-1 border-b border-[#f0f0f1] pb-2">Bloco &lt;BODY&gt;</h2>
              <p className="text-[12px] text-[#8c8f94] mb-2 mt-2">Ideal para `&lt;noscript&gt;` ou scripts interativos e botões (Chatbots, WhatsApp Flutuante).</p>
              <textarea 
                value={bodyCode} 
                onChange={e => setBodyCode(e.target.value)} 
                className="w-full h-32 p-3 font-mono text-[12px] text-gray-800 bg-[#f9f9f9] border border-[#8c8f94] rounded-sm focus:ring-1 focus:ring-[#2271b1] outline-none"
                placeholder="<!-- Script do Corpo -->"
              />
            </div>
            
            <div className="flex justify-end pt-2 gap-2">
              <button type="button" onClick={() => setIsOpen(false)} className="px-3 py-1.5 border border-[#2271b1] text-[#2271b1] rounded-sm hover:bg-[#f6f7f7] text-[13px]">Cancelar</button>
              <button type="submit" className="px-4 py-1.5 bg-[#2271b1] text-white rounded-sm hover:bg-[#135e96] text-[13px]">Salvar Integração</button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

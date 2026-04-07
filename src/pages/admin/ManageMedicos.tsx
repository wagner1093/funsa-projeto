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

type Medico = {
  id: string;
  nome: string;
  especialidade: string;
  crm: string | null;
  contato: string;
  imagem: string | null;
  endereco: string | null;
  profissional: string | null;
  categoria: string;
};

export default function ManageMedicos() {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const [contato, setContato] = useState('');
  const [imagem, setImagem] = useState('');
  const [endereco, setEndereco] = useState('');
  const [profissional, setProfissional] = useState('');
  const [categoria, setCategoria] = useState('medico');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchMedicos();
  }, []);

  async function fetchMedicos() {
    setLoading(true);
    const { data } = await supabase.from('medicos').select('*').order('nome', { ascending: true });
    if (data) setMedicos(data);
    setLoading(false);
  }

  function handleOpenNew() {
    setNome(''); setEspecialidade(''); setCrm(''); setContato(''); setImagem('');
    setEndereco(''); setProfissional(''); setCategoria('medico');
    setEditingId(null);
    setIsOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja apagar este registro da rede Prev Saúde?')) {
      const { error } = await supabase.from('medicos').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Registro apagado' });
        fetchMedicos();
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { nome, especialidade, crm, contato, imagem, endereco, profissional, categoria };

    if (editingId) {
      const { error } = await supabase.from('medicos').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Registro atualizado' }); setIsOpen(false); fetchMedicos(); }
    } else {
      const { error } = await supabase.from('medicos').insert([payload]);
      if (error) toast({ title: 'Erro ao cadastrar', variant: 'destructive' });
      else { toast({ title: 'Registro cadastrado' }); setIsOpen(false); fetchMedicos(); }
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[23px] font-normal text-[#1d2327] flex items-center gap-4">
          Rede Prev Saúde
          <Button onClick={handleOpenNew} className="h-7 px-3 py-0 text-[13px] bg-white text-[#2271b1] border border-[#2271b1] hover:bg-[#f6f7f7] hover:text-[#135e96] font-medium rounded-sm">
            Adicionar novo
          </Button>
        </h1>
      </div>

      <div className="bg-white border border-[#c3c4c7] relative">
        <table className="w-full text-left text-[13px] text-[#3c434a]">
          <thead className="bg-[#f0f0f1]/50 border-b border-[#c3c4c7]">
            <tr>
              <th className="p-3 font-semibold text-[#2c3338]">Tipo</th>
              <th className="p-3 font-semibold text-[#2c3338]">Nome / Clínica</th>
              <th className="p-3 font-semibold text-[#2c3338]">Especialidade</th>
              <th className="p-3 font-semibold text-[#2c3338]">Contato</th>
              <th className="p-3 font-semibold text-[#2c3338] text-right">Ações</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-3 text-center">Carregando...</td></tr>
            ) : medicos.length === 0 ? (
              <tr><td colSpan={5} className="p-3 text-center text-[#3c434a]">Nenhum registro.</td></tr>
            ) : (
              medicos.map(item => (
                <tr key={item.id} className="border-b border-[#c3c4c7] last:border-0 hover:bg-[#f6f7f7] transition-colors group">
                  <td className="p-3 text-[#a7aaad] uppercase text-xs">{item.categoria.replace('_', ' ')}</td>
                  <td className="p-3 font-semibold text-[#2271b1]">{item.nome}</td>
                  <td className="p-3 text-[#50575e]">{item.especialidade}</td>
                  <td className="p-3 text-[#50575e]">{item.contato || '-'}</td>
                  <td className="p-3 flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => {
                        setNome(item.nome); setEspecialidade(item.especialidade); setCrm(item.crm || ''); 
                        setContato(item.contato || ''); setImagem(item.imagem || '');
                        setEndereco(item.endereco || ''); setProfissional(item.profissional || '');
                        setCategoria(item.categoria || 'medico');
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
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto bg-[#f0f0f1] border-[#c3c4c7] p-0">
          <DialogHeader className="p-5 bg-white border-b border-[#c3c4c7]">
            <DialogTitle className="text-[23px] font-normal text-[#1d2327]">{editingId ? 'Editar Cadastro' : 'Novo Cadastro'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="p-5 space-y-4">
            <div className="bg-white border border-[#c3c4c7] p-4 rounded-sm grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Categoria</label>
                <select 
                  className="w-full flex h-8 rounded-sm text-[13px] border border-[#8c8f94] bg-white px-3 py-1 focus-visible:outline-none focus:ring-1 focus:ring-[#2271b1]" 
                  value={categoria} 
                  onChange={e => setCategoria(e.target.value)}
                >
                  <option value="medico">Médico Integrante</option>
                  <option value="clinica_avare">Clínica - Avaré/SP</option>
                  <option value="clinica_exame">Clínica de Exame - Avaré/SP</option>
                  <option value="clinica_outras">Clínica - Outras Cidades</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Nome {categoria === 'medico' ? 'do Médico' : 'da Clínica'}</label>
                <Input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Dr. Carlos / Clínica X" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Especialidade / Foco</label>
                <Input required value={especialidade} onChange={e => setEspecialidade(e.target.value)} placeholder="Ex: Cardiologia" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>

              <div>
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Contato (Opcional)</label>
                <Input value={contato} onChange={e => setContato(e.target.value)} placeholder="Ex: (14) 9999-9999" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
              </div>

              {categoria !== 'medico' && (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Endereço da Clínica</label>
                    <Input value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Endereço da clínica" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">Profissional Responsável (Opcional)</label>
                    <Input value={profissional} onChange={e => setProfissional(e.target.value)} placeholder="Ex: Dr. Fulano" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                  </div>
                </>
              )}

              {categoria === 'medico' && (
                <div>
                  <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">CRM (Opcional)</label>
                  <Input value={crm} onChange={e => setCrm(e.target.value)} placeholder="Ex: 123456" className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-[13px] font-semibold text-[#1d2327] mb-1">URL de Imagem (opcional)</label>
                <Input value={imagem} onChange={e => setImagem(e.target.value)} className="h-8 border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
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

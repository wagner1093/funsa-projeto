import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Search, Filter, Phone, MapPin, BadgeCheck, MoreVertical } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

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
  const [searchTerm, setSearchTerm] = useState('');
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
    const { data } = await supabase.from('funsa_medicos').select('*').order('nome', { ascending: true });
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
    if (confirm('Tem certeza que deseja apagar este registro da rede PrevSaúde?')) {
      const { error } = await supabase.from('funsa_medicos').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Registro apagado com sucesso', description: 'A base de dados foi atualizada.' });
        fetchMedicos();
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { nome, especialidade, crm, contato, imagem, endereco, profissional, categoria };

    if (editingId) {
      const { error } = await supabase.from('funsa_medicos').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Registro atualizado' }); setIsOpen(false); fetchMedicos(); }
    } else {
      const { error } = await supabase.from('funsa_medicos').insert([payload]);
      if (error) toast({ title: 'Erro ao cadastrar', variant: 'destructive' });
      else { toast({ title: 'Registro cadastrado' }); setIsOpen(false); fetchMedicos(); }
    }
  }

  const filteredMedicos = medicos.filter(m => 
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    m.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryBadge = (cat: string) => {
    switch(cat) {
      case 'medico': return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-600 uppercase tracking-wider">Médico</span>;
      case 'clinica_avare': return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-600 uppercase tracking-wider">Clínica Avaré</span>;
      case 'clinica_exame': return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-600 uppercase tracking-wider">Exames</span>;
      default: return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600 uppercase tracking-wider">Clínica</span>;
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-3">
            <HeartPulse className="w-8 h-8 text-azure" />
            Rede PrevSaúde
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie os médicos e clínicas parceiras da FUNSA.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-azure hover:bg-navy text-white rounded-xl px-6 py-5 shadow-lg shadow-azure/20 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Adicionar Novo
        </Button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar por nome ou especialidade..."
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-azure focus:ring-1 focus:ring-azure outline-none transition-all text-sm"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm hover:bg-gray-50 transition-colors">
          <Filter className="w-4 h-4" />
          Filtros
        </button>
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-navy">
            <thead className="admin-table-header">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Cadastro</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Nome / Clínica</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Especialidade</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Contato</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Carregando dados...</td></tr>
              ) : filteredMedicos.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-10 text-center text-gray-400">Nenhum registro encontrado.</td></tr>
              ) : (
                filteredMedicos.map(item => (
                  <motion.tr 
                    layout
                    key={item.id} 
                    className="hover:bg-gray-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      {getCategoryBadge(item.categoria)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-azure font-bold text-xs shrink-0 overflow-hidden border border-gray-200">
                          {item.imagem ? <img src={item.imagem} className="w-full h-full object-cover" /> : item.nome.charAt(0)}
                        </div>
                        <span className="font-bold text-navy whitespace-nowrap">{item.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 italic text-gray-600">
                      {item.especialidade}
                    </td>
                    <td className="px-6 py-4">
                      {item.contato ? (
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                          <Phone className="w-3.5 h-3.5 text-azure/50" />
                          {item.contato}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setNome(item.nome); setEspecialidade(item.especialidade); setCrm(item.crm || ''); 
                            setContato(item.contato || ''); setImagem(item.imagem || '');
                            setEndereco(item.endereco || ''); setProfissional(item.profissional || '');
                            setCategoria(item.categoria || 'medico');
                            setEditingId(item.id); setIsOpen(true);
                          }} 
                          className="p-2 text-azure hover:bg-azure/10 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/30 flex items-center justify-between">
          <p className="text-xs text-gray-400">Mostrando {filteredMedicos.length} de {medicos.length} registros</p>
          <div className="flex gap-2">
             <button className="px-3 py-1 rounded-md border border-gray-200 text-xs disabled:opacity-50" disabled>Anterior</button>
             <button className="px-3 py-1 rounded-md border border-gray-200 text-xs disabled:opacity-50" disabled>Próximo</button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-navy h-24 p-8 flex items-center justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-azure/20 rounded-full blur-3xl" />
            <DialogTitle className="text-white text-xl font-bold relative z-10 flex items-center gap-2">
               {editingId ? <Edit className="w-5 h-5 text-azure" /> : <Plus className="w-5 h-5 text-azure" />}
               {editingId ? 'Editar Cadastro' : 'Novo Cadastro na Rede'}
            </DialogTitle>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Categoria de Cadastro</label>
                <select 
                  className="w-full h-12 rounded-xl text-sm border border-gray-200 bg-gray-50 px-4 py-2 focus:ring-1 focus:ring-azure outline-none transition-all" 
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
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Nome {categoria === 'medico' ? 'do Médico' : 'da Clínica'}</label>
                <Input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: Dr. Carlos / Clínica X" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-azure" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Especialidade / Foco</label>
                <Input required value={especialidade} onChange={e => setEspecialidade(e.target.value)} placeholder="Ex: Cardiologia" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-azure" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Contato</label>
                <Input value={contato} onChange={e => setContato(e.target.value)} placeholder="Ex: (14) 9999-9999" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-azure" />
              </div>

              {categoria !== 'medico' && (
                <>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1.5"><MapPin className="w-3 h-3" /> Endereço Completo</label>
                    <Input value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua, Número, Bairro - Cidade" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-azure" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Responsável Técnico</label>
                    <Input value={profissional} onChange={e => setProfissional(e.target.value)} placeholder="Ex: Dr. Fulano de Tal" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-azure" />
                  </div>
                </>
              )}

              {categoria === 'medico' && (
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Número CRM</label>
                  <Input value={crm} onChange={e => setCrm(e.target.value)} placeholder="Ex: 123456" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-azure" />
                </div>
              )}

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">URL da Foto / Logotipo (URL)</label>
                <Input value={imagem} onChange={e => setImagem(e.target.value)} placeholder="Cole o link da imagem" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-azure" />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="px-6 py-3 border border-gray-200 text-gray-500 rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-azure text-white rounded-xl hover:bg-navy transition-all text-sm font-bold shadow-lg shadow-azure/20"
              >
                {editingId ? 'Salvar Alterações' : 'Cadastrar na Rede'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

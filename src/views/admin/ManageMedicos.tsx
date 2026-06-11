'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { useSearchParams } from 'next/navigation';
import { 
  Plus, Edit, Trash2, Search, Filter, Phone, 
  MapPin, BadgeCheck, MoreVertical, HeartPulse,
  ChevronRight, X, User, Stethoscope, Building2
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

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
  const { role } = useAuth();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
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
        toast({ title: 'Registro removido', description: 'A base de dados foi atualizada com sucesso.' });
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
      case 'medico': return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-blue-50 text-blue-500 uppercase tracking-wider border border-blue-100">Médico</span>;
      case 'clinica_avare': return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-purple-50 text-purple-500 uppercase tracking-wider border border-purple-100">Clínica Avaré</span>;
      case 'clinica_exame': return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-amber-50 text-amber-500 uppercase tracking-wider border border-amber-100">Exames</span>;
      default: return <span className="px-2 py-0.5 rounded-md text-[9px] font-bold bg-gray-50 text-gray-500 uppercase tracking-wider border border-gray-100">Parceiro</span>;
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <HeartPulse className="w-5 h-5 text-gray-400" />
            Rede PrevSaúde
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">Gestão de profissionais e clínicas conveniadas ao plano.</p>
        </div>
        {role !== 'viewer' && (
          <Button 
            onClick={handleOpenNew} 
            className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-5 h-11 transition-all flex items-center gap-2 font-semibold text-sm shadow-xl shadow-black/5"
          >
            <Plus className="w-4 h-4" />
            Adicionar Credenciado
          </Button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Nome ou especialidade..."
            className="admin-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {filteredMedicos.length} Credenciados listados
        </p>
      </div>

      {/* Table Area */}
      <div className="admin-card overflow-hidden border border-gray-100 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="admin-table-header">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tipo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Profissional / Unidade</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Especialidade</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contato</th>
                {role !== 'viewer' && (
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  <tr><td colSpan={role === 'viewer' ? 4 : 5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-semibold text-gray-500">Sincronizando rede...</span>
                    </div>
                  </td></tr>
                ) : filteredMedicos.length === 0 ? (
                  <tr><td colSpan={role === 'viewer' ? 4 : 5} className="px-6 py-12 text-center text-gray-400 italic text-xs">
                    Nenhum credenciado encontrado na rede.
                  </td></tr>
                ) : (
                  filteredMedicos.map((item, idx) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, x: -4 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.02 }}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getCategoryBadge(item.categoria)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                            {item.imagem ? (
                              <img src={item.imagem} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-4 h-4 text-gray-300" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 text-[13px]">{item.nome}</span>
                            {item.crm && (
                              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                                CRM: {item.crm}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-xs text-gray-500 font-medium italic">
                            {item.especialidade}
                         </span>
                      </td>
                      <td className="px-6 py-4">
                        {item.contato ? (
                          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                            <Phone className="w-3.5 h-3.5 text-gray-300" />
                            {item.contato}
                          </div>
                        ) : <span className="text-gray-300">--</span>}
                      </td>
                      {role !== 'viewer' && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            <button 
                              onClick={() => {
                                setNome(item.nome); setEspecialidade(item.especialidade); setCrm(item.crm || ''); 
                                setContato(item.contato || ''); setImagem(item.imagem || '');
                                setEndereco(item.endereco || ''); setProfissional(item.profissional || '');
                                setCategoria(item.categoria || 'medico');
                                setEditingId(item.id); setIsOpen(true);
                              }} 
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(item.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all">
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
        <DialogContent hideCloseButton className="max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border border-gray-100 shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-black/10">
                {categoria === 'medico' ? <Stethoscope className="w-5 h-5 text-white" /> : <Building2 className="w-5 h-5 text-white" />}
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {editingId ? 'Editar Cadastro' : 'Novo Credenciado'}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  Rede PrevSaúde <ChevronRight className="w-3 h-3" /> Gestão de Parceiros
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-50 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6 bg-[#FBFBFC]">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Tipo de Cadastro</label>
                <select 
                  className="w-full h-12 rounded-xl text-sm border border-gray-100 bg-white px-4 py-2 focus:ring-1 focus:ring-gray-200 outline-none transition-all font-medium shadow-sm" 
                  value={categoria} 
                  onChange={e => setCategoria(e.target.value)}
                >
                  <option value="medico">Médico (Individual)</option>
                  <option value="clinica_avare">Clínica (Unidade Avaré)</option>
                  <option value="clinica_exame">Clínica de Exames</option>
                  <option value="clinica_outras">Outras Unidades</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">
                  Nome {categoria === 'medico' ? 'do Profissional' : 'da Unidade'}
                </label>
                <Input 
                  required 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  placeholder="Ex: Dr. Carlos Eduardo / Centro Médico X" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Especialidade Principal</label>
                <Input 
                  required 
                  value={especialidade} 
                  onChange={e => setEspecialidade(e.target.value)} 
                  placeholder="Ex: Cardiologia" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Telefone de Contato</label>
                <Input 
                  value={contato} 
                  onChange={e => setContato(e.target.value)} 
                  placeholder="(00) 00000-0000" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>

              {categoria !== 'medico' && (
                <>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Endereço da Unidade</label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                      <Input 
                        value={endereco} 
                        onChange={e => setEndereco(e.target.value)} 
                        placeholder="Rua, Número, Bairro - Cidade" 
                        className="h-12 pl-10 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                      />
                    </div>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Responsável pela Unidade</label>
                    <Input 
                      value={profissional} 
                      onChange={e => setProfissional(e.target.value)} 
                      placeholder="Nome do administrador ou responsável técnico" 
                      className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                    />
                  </div>
                </>
              )}

              {categoria === 'medico' && (
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Número do CRM</label>
                  <Input 
                    value={crm} 
                    onChange={e => setCrm(e.target.value)} 
                    placeholder="Ex: 123456" 
                    className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="px-6 py-2.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-8 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all text-xs font-bold shadow-xl shadow-black/5 flex items-center gap-2"
              >
                {editingId ? 'Salvar Alterações' : 'Finalizar Cadastro'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


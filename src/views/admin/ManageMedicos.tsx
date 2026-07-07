'use client';
import { useState, useEffect, Fragment } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { useSearchParams } from 'next/navigation';
import {
  Plus, Edit, Trash2, Search, Filter, Phone,
  MapPin, BadgeCheck, MoreVertical, HeartPulse,
  ChevronRight, X, User, Stethoscope, Building2, Tags,
  ChevronUp, ChevronDown
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
  ordem: number;
};

type TipoMedico = {
  id: string;
  nome: string;
  slug: string;
  eh_medico: boolean;
  cor: string;
  ordem: number;
};

type Props = {
  initialData?: Medico[];
  initialTipos?: TipoMedico[];
};

const COLOR_OPTIONS = ['blue', 'purple', 'amber', 'emerald', 'rose', 'gray'] as const;

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-500 border-blue-100',
  purple: 'bg-purple-50 text-purple-500 border-purple-100',
  amber: 'bg-amber-50 text-amber-500 border-amber-100',
  emerald: 'bg-emerald-50 text-emerald-500 border-emerald-100',
  rose: 'bg-rose-50 text-rose-500 border-rose-100',
  gray: 'bg-gray-50 text-gray-500 border-gray-100',
};

const SWATCH_MAP: Record<string, string> = {
  blue: 'bg-blue-400',
  purple: 'bg-purple-400',
  amber: 'bg-amber-400',
  emerald: 'bg-emerald-400',
  rose: 'bg-rose-400',
  gray: 'bg-gray-400',
};

function slugify(text: string) {
  const COMBINING_MARKS = new RegExp('[̀-ͯ]', 'g');
  return text
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

export default function ManageMedicos({ initialData = [], initialTipos = [] }: Props) {
  const { role } = useAuth();
  const [medicos, setMedicos] = useState<Medico[]>(initialData);
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

  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [crm, setCrm] = useState('');
  const [contato, setContato] = useState('');
  const [imagem, setImagem] = useState('');
  const [endereco, setEndereco] = useState('');
  const [profissional, setProfissional] = useState('');
  const [categoria, setCategoria] = useState('medico');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [tipos, setTipos] = useState<TipoMedico[]>(initialTipos);
  const [isTiposOpen, setIsTiposOpen] = useState(false);
  const [tipoNome, setTipoNome] = useState('');
  const [tipoCor, setTipoCor] = useState<string>('gray');
  const [tipoEhMedico, setTipoEhMedico] = useState(false);
  const [tipoOrdem, setTipoOrdem] = useState(0);
  const [editingTipoId, setEditingTipoId] = useState<string | null>(null);
  const [savingTipo, setSavingTipo] = useState(false);

  const isMedicoCategoria = (cat: string) =>
    tipos.find(t => t.slug === cat)?.eh_medico ?? cat === 'medico';

  useEffect(() => {
    if (initialData.length === 0) {
      fetchMedicos();
    }
    if (initialTipos.length === 0) {
      fetchTipos();
    }
  }, []);

  async function fetchMedicos() {
    setLoading(true);
    const { data } = await supabase.from('funsa_medicos').select('*').order('nome', { ascending: true });
    if (data) setMedicos(data);
    setLoading(false);
  }

  async function fetchTipos() {
    const { data } = await supabase.from('funsa_medicos_tipos').select('*').order('ordem', { ascending: true });
    if (data) setTipos(data);
  }

  function handleOpenNew() {
    setNome(''); setEspecialidade(''); setCrm(''); setContato(''); setImagem('');
    setEndereco(''); setProfissional('');
    setCategoria(tipos.find(t => t.eh_medico)?.slug || tipos[0]?.slug || 'medico');
    setEditingId(null);
    setIsOpen(true);
  }

  function handleOpenNewTipo() {
    setTipoNome(''); setTipoCor('gray'); setTipoEhMedico(false);
    setTipoOrdem(tipos.length > 0 ? Math.max(...tipos.map(t => t.ordem)) + 1 : 1);
    setEditingTipoId(null);
  }

  function handleEditTipo(t: TipoMedico) {
    setTipoNome(t.nome); setTipoCor(t.cor); setTipoEhMedico(t.eh_medico); setTipoOrdem(t.ordem);
    setEditingTipoId(t.id);
  }

  async function handleSaveTipo(e: React.FormEvent) {
    e.preventDefault();
    if (!tipoNome.trim()) return;
    setSavingTipo(true);

    if (editingTipoId) {
      const { error } = await supabase.from('funsa_medicos_tipos')
        .update({ nome: tipoNome, cor: tipoCor, eh_medico: tipoEhMedico, ordem: tipoOrdem })
        .eq('id', editingTipoId);
      if (error) {
        toast({ title: 'Erro ao atualizar tipo', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Tipo atualizado' });
        handleOpenNewTipo();
        fetchTipos();
      }
    } else {
      const slug = slugify(tipoNome);
      const { error } = await supabase.from('funsa_medicos_tipos')
        .insert([{ nome: tipoNome, slug, cor: tipoCor, eh_medico: tipoEhMedico, ordem: tipoOrdem }]);
      if (error) {
        toast({ title: 'Erro ao criar tipo', description: error.message, variant: 'destructive' });
      } else {
        toast({ title: 'Tipo criado' });
        handleOpenNewTipo();
        fetchTipos();
      }
    }
    setSavingTipo(false);
  }

  async function handleDeleteTipo(id: string, slug: string) {
    const emUso = medicos.some(m => m.categoria === slug);
    if (emUso) {
      toast({
        title: 'Não é possível excluir',
        description: 'Existem credenciados usando este tipo. Reatribua-os para outro tipo antes de excluir.',
        variant: 'destructive',
      });
      return;
    }
    if (!confirm('Tem certeza que deseja apagar este tipo?')) return;
    const { error } = await supabase.from('funsa_medicos_tipos').delete().eq('id', id);
    if (error) {
      toast({ title: 'Erro ao excluir tipo', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Tipo removido' });
      fetchTipos();
    }
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

  async function handleMove(item: Medico, direction: 'up' | 'down') {
    const groupItems = sortedMedicos.filter(m => m.categoria === item.categoria);
    const idx = groupItems.findIndex(m => m.id === item.id);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= groupItems.length) return;
    const neighbor = groupItems[swapIdx];

    // Atualização otimista: reordena localmente na hora, sem recarregar a lista.
    setMedicos(prev => prev.map(m => {
      if (m.id === item.id) return { ...m, ordem: neighbor.ordem };
      if (m.id === neighbor.id) return { ...m, ordem: item.ordem };
      return m;
    }));

    const [{ error: e1 }, { error: e2 }] = await Promise.all([
      supabase.from('funsa_medicos').update({ ordem: neighbor.ordem }).eq('id', item.id),
      supabase.from('funsa_medicos').update({ ordem: item.ordem }).eq('id', neighbor.id),
    ]);
    if (e1 || e2) {
      toast({ title: 'Erro ao reordenar', description: (e1 || e2)?.message, variant: 'destructive' });
      fetchMedicos(); // reverte para o estado real do banco em caso de falha
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload: Partial<Medico> = { nome, especialidade, crm, contato, imagem, endereco, profissional, categoria };

    if (editingId) {
      const { error } = await supabase.from('funsa_medicos').update(payload).eq('id', editingId);
      if (error) {
        toast({ 
          title: 'Erro ao atualizar', 
          description: error.message, 
          variant: 'destructive' 
        });
      } else { 
        toast({ title: 'Registro atualizado' }); 
        setIsOpen(false); 
        fetchMedicos(); 
      }
    } else {
      const maxOrdem = medicos.filter(m => m.categoria === categoria).reduce((max, m) => Math.max(max, m.ordem ?? 0), 0);
      payload.ordem = maxOrdem + 1;
      const { error } = await supabase.from('funsa_medicos').insert([payload]);
      if (error) {
        toast({ 
          title: 'Erro ao cadastrar', 
          description: error.message, 
          variant: 'destructive' 
        });
      } else { 
        toast({ title: 'Registro cadastrado' }); 
        setIsOpen(false); 
        fetchMedicos(); 
      }
    }
  }

  const sortedMedicos = [...medicos].sort((a, b) => {
    const ta = tipos.find(t => t.slug === a.categoria)?.ordem ?? 999;
    const tb = tipos.find(t => t.slug === b.categoria)?.ordem ?? 999;
    if (ta !== tb) return ta - tb;
    if (a.ordem !== b.ordem) return (a.ordem ?? 0) - (b.ordem ?? 0);
    return a.nome.localeCompare(b.nome);
  });

  const filteredMedicos = sortedMedicos.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.especialidade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getCategoryBadge = (cat: string) => {
    const tipo = tipos.find(t => t.slug === cat);
    const classes = COLOR_MAP[tipo?.cor || 'gray'] || COLOR_MAP.gray;
    const label = tipo?.nome || cat || 'Parceiro';
    return <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border ${classes}`}>{label}</span>;
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
          <div className="flex items-center gap-2">
            <Button
              onClick={() => { handleOpenNewTipo(); setIsTiposOpen(true); }}
              variant="outline"
              className="rounded-xl px-5 h-11 border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center gap-2 font-semibold text-sm"
            >
              <Tags className="w-4 h-4" />
              Gerenciar Tipos
            </Button>
            <Button
              onClick={handleOpenNew}
              className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-5 h-11 transition-all flex items-center gap-2 font-semibold text-sm shadow-xl shadow-black/5"
            >
              <Plus className="w-4 h-4" />
              Adicionar Credenciado
            </Button>
          </div>
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
                  filteredMedicos.map((item, idx) => {
                    const groupItems = sortedMedicos.filter(m => m.categoria === item.categoria);
                    const posInGroup = groupItems.findIndex(m => m.id === item.id);
                    const isFirstOfGroup = idx === 0 || filteredMedicos[idx - 1].categoria !== item.categoria;
                    const tipoAtual = tipos.find(t => t.slug === item.categoria);

                    return (
                    <Fragment key={item.id}>
                      {isFirstOfGroup && (
                        <tr className="bg-gray-50/60">
                          <td colSpan={role === 'viewer' ? 4 : 5} className="px-6 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                            {tipoAtual?.nome || item.categoria}
                            <span className="text-gray-300 font-medium normal-case ml-1.5">
                              · {groupItems.length} {groupItems.length === 1 ? 'registro' : 'registros'}
                            </span>
                          </td>
                        </tr>
                      )}
                      <motion.tr
                        layout
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ opacity: { delay: idx * 0.02 }, x: { delay: idx * 0.02 }, layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
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
                              onClick={() => handleMove(item, 'up')}
                              disabled={posInGroup === 0}
                              title="Mover para cima no grupo"
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all disabled:opacity-20 disabled:pointer-events-none"
                            >
                              <ChevronUp className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleMove(item, 'down')}
                              disabled={posInGroup === groupItems.length - 1}
                              title="Mover para baixo no grupo"
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all disabled:opacity-20 disabled:pointer-events-none"
                            >
                              <ChevronDown className="w-4 h-4" />
                            </button>
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
                    </Fragment>
                    );
                  })
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
                {isMedicoCategoria(categoria) ? <Stethoscope className="w-5 h-5 text-white" /> : <Building2 className="w-5 h-5 text-white" />}
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
                  {tipos.length === 0 ? (
                    <option value="">Nenhum tipo cadastrado</option>
                  ) : (
                    tipos.map(t => <option key={t.id} value={t.slug}>{t.nome}</option>)
                  )}
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

              {!isMedicoCategoria(categoria) && (
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

              {isMedicoCategoria(categoria) && (
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

      {/* Tipos Management Dialog */}
      <Dialog open={isTiposOpen} onOpenChange={(open) => { setIsTiposOpen(open); if (!open) handleOpenNewTipo(); }}>
        <DialogContent hideCloseButton className="max-w-xl bg-white rounded-3xl p-0 overflow-hidden border border-gray-100 shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-black/10">
                <Tags className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">Gerenciar Tipos</DialogTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  Rede PrevSaúde <ChevronRight className="w-3 h-3" /> Tipos de Cadastro
                </div>
              </div>
            </div>
            <button onClick={() => setIsTiposOpen(false)} className="p-2 rounded-lg hover:bg-gray-50 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8 space-y-6 bg-[#FBFBFC] max-h-[70vh] overflow-y-auto">
            <form onSubmit={handleSaveTipo} className="space-y-4 pb-6 border-b border-gray-100">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Nome do Tipo</label>
                  <Input
                    required
                    value={tipoNome}
                    onChange={e => setTipoNome(e.target.value)}
                    placeholder="Ex: Odontologia"
                    className="h-11 border-gray-100 bg-white rounded-xl text-sm font-medium shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Cor do Badge</label>
                  <div className="flex gap-2 h-11 items-center">
                    {COLOR_OPTIONS.map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setTipoCor(c)}
                        aria-label={c}
                        className={`w-7 h-7 rounded-full ${SWATCH_MAP[c]} transition-all ${tipoCor === c ? 'ring-2 ring-offset-2 ring-gray-900' : 'opacity-60 hover:opacity-100'}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Ordem</label>
                  <Input
                    type="number"
                    value={tipoOrdem}
                    onChange={e => setTipoOrdem(Number(e.target.value))}
                    className="h-11 border-gray-100 bg-white rounded-xl text-sm font-medium shadow-sm"
                  />
                </div>
                <div className="col-span-2 flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="eh_medico"
                    checked={tipoEhMedico}
                    onChange={e => setTipoEhMedico(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <label htmlFor="eh_medico" className="text-xs text-gray-500 font-medium">
                    Representa profissionais individuais (aparece na aba "Especialidades" do site)
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                {editingTipoId && (
                  <button
                    type="button"
                    onClick={handleOpenNewTipo}
                    className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    Cancelar edição
                  </button>
                )}
                <button
                  type="submit"
                  disabled={savingTipo}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all text-xs font-bold shadow-lg shadow-black/5 disabled:opacity-50"
                >
                  {editingTipoId ? 'Salvar Alterações' : 'Criar Tipo'}
                </button>
              </div>
            </form>

            <div className="space-y-2">
              {tipos.length === 0 ? (
                <p className="text-xs text-gray-400 italic text-center py-4">Nenhum tipo cadastrado.</p>
              ) : (
                tipos.map(t => (
                  <div key={t.id} className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full shrink-0 ${SWATCH_MAP[t.cor] || SWATCH_MAP.gray}`} />
                      <div>
                        <p className="text-sm font-bold text-gray-800">{t.nome}</p>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">
                          {t.slug} · {t.eh_medico ? 'Profissional' : 'Clínica'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => handleEditTipo(t)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteTipo(t.id, t.slug)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-all">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}


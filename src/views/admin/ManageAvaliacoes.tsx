'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/AuthContext';
import { useSearchParams } from 'next/navigation';
import { 
  Plus, Edit, Trash2, MessageSquare, Search, 
  ChevronRight, X, Star, Calendar, Briefcase, 
  CheckCircle, AlertCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";

type Avaliacao = {
  id: string;
  nome: string;
  texto: string;
  nota: number;
  cargo: string | null;
  ativo: boolean;
  created_at: string;
};

type Props = {
  initialData?: Avaliacao[];
};

export default function ManageAvaliacoes({ initialData = [] }: Props) {
  const { role } = useAuth();
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(initialData);
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
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [texto, setTexto] = useState('');
  const [nota, setNota] = useState(5);
  const [ativo, setAtivo] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAvaliacoes();
  }, []);

  async function fetchAvaliacoes() {
    setLoading(true);
    const { data, error } = await supabase
      .from('funsa_avaliacoes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: 'Erro ao buscar avaliações',
        description: error.message,
        variant: 'destructive',
      });
    } else if (data) {
      setAvaliacoes(data);
    }
    setLoading(false);
  }

  function handleOpenNew() {
    setNome('');
    setCargo('');
    setTexto('');
    setNota(5);
    setAtivo(true);
    setEditingId(null);
    setIsOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja apagar esta avaliação?')) {
      const { error } = await supabase.from('funsa_avaliacoes').delete().eq('id', id);
      if (error) {
        toast({ 
          title: 'Erro ao remover avaliação', 
          description: error.message, 
          variant: 'destructive' 
        });
      } else {
        toast({ title: 'Avaliação removida com sucesso' });
        fetchAvaliacoes();
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { 
      nome, 
      cargo: cargo || null, 
      texto, 
      nota, 
      ativo 
    };

    if (editingId) {
      const { error } = await supabase.from('funsa_avaliacoes').update(payload).eq('id', editingId);
      if (error) {
        toast({ title: 'Erro ao atualizar avaliação', description: error.message, variant: 'destructive' });
      } else { 
        toast({ title: 'Avaliação atualizada com sucesso' }); 
        setIsOpen(false); 
        fetchAvaliacoes(); 
      }
    } else {
      const { error } = await supabase.from('funsa_avaliacoes').insert([payload]);
      if (error) {
        toast({ title: 'Erro ao criar avaliação', description: error.message, variant: 'destructive' });
      } else { 
        toast({ title: 'Avaliação publicada com sucesso' }); 
        setIsOpen(false); 
        fetchAvaliacoes(); 
      }
    }
  }

  const filteredAvaliacoes = avaliacoes.filter(a => 
    a.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.texto.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.cargo && a.cargo.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <MessageSquare className="w-5 h-5 text-gray-400" />
            Depoimentos & Avaliações
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">
            Gestão de depoimentos exibidos na página inicial do site.
          </p>
        </div>
        {role !== 'viewer' && (
          <Button 
            onClick={handleOpenNew} 
            className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-5 h-11 transition-all flex items-center gap-2 font-semibold text-sm"
          >
            <Plus className="w-4 h-4" />
            Nova Avaliação
          </Button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Pesquisar por nome, texto..."
            className="admin-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {filteredAvaliacoes.length} Depoimentos no total
        </p>
      </div>

      {/* Table Area */}
      <div className="admin-card overflow-hidden border border-gray-100 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="admin-table-header">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Autor</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Depoimento</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Nota</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data</th>
                {role !== 'viewer' && (
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {loading ? (
                  <tr>
                    <td colSpan={role === 'viewer' ? 5 : 6} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2 opacity-40">
                        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-semibold text-gray-500">Buscando dados...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredAvaliacoes.length === 0 ? (
                  <tr>
                    <td colSpan={role === 'viewer' ? 5 : 6} className="px-6 py-12 text-center text-gray-400 italic text-xs">
                      Nenhuma avaliação cadastrada ou encontrada.
                    </td>
                  </tr>
                ) : (
                  filteredAvaliacoes.map((item, idx) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-800 text-[13px]">{item.nome}</span>
                          {item.cargo && (
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mt-0.5">
                              <Briefcase className="w-2.5 h-2.5 text-gray-300" /> {item.cargo}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 max-w-md">
                        <p className="text-gray-500 text-xs font-medium line-clamp-2 italic">
                          "{item.texto}"
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star 
                              key={j} 
                              className={`w-3.5 h-3.5 ${
                                j < item.nota 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-gray-200'
                              }`} 
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {item.ativo ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-700 border border-green-200">
                            <CheckCircle className="w-3 h-3" />
                            Ativo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-50 text-gray-400 border border-gray-200">
                            <AlertCircle className="w-3 h-3" />
                            Inativo
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs font-medium whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-300" />
                          {new Date(item.created_at).toLocaleDateString('pt-BR')}
                        </div>
                      </td>
                      {role !== 'viewer' && (
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                            <button 
                              onClick={() => {
                                setNome(item.nome);
                                setCargo(item.cargo || '');
                                setTexto(item.texto);
                                setNota(item.nota);
                                setAtivo(item.ativo);
                                setEditingId(item.id);
                                setIsOpen(true);
                              }} 
                              className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleDelete(item.id)} 
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-white rounded-lg shadow-sm border border-transparent hover:border-gray-100 transition-all"
                            >
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

      {/* Form Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent hideCloseButton className="max-w-xl bg-white rounded-3xl p-0 overflow-hidden border border-gray-100 shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-black/10">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {editingId ? 'Editar Depoimento' : 'Novo Depoimento'}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  Avaliações <ChevronRight className="w-3 h-3" /> Gerenciamento
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-50 text-gray-400">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6 bg-[#FBFBFC]">
            <div className="grid gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Nome do Autor</label>
                <Input 
                  required 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  placeholder="Ex: Maria S. de Souza" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Cargo / Empresa (Opcional)</label>
                <Input 
                  value={cargo} 
                  onChange={e => setCargo(e.target.value)} 
                  placeholder="Ex: Associado FUNSA / Familiar" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Nota (Estrelas)</label>
                <div className="flex gap-2 items-center bg-white border border-gray-100 px-4 py-3 rounded-xl shadow-sm">
                  {Array.from({ length: 5 }).map((_, j) => {
                    const ratingValue = j + 1;
                    return (
                      <button
                        type="button"
                        key={j}
                        onClick={() => setNota(ratingValue)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-6 h-6 ${
                            ratingValue <= nota 
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-gray-200'
                          }`} 
                        />
                      </button>
                    );
                  })}
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-3">
                    {nota} {nota === 1 ? 'estrela' : 'estrelas'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Texto do Depoimento</label>
                <Textarea 
                  required 
                  value={texto} 
                  onChange={e => setTexto(e.target.value)} 
                  placeholder="Escreva a avaliação..." 
                  rows={4}
                  className="border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm resize-none" 
                />
              </div>

              <div className="flex items-center justify-between bg-white border border-gray-100 px-5 py-4 rounded-2xl shadow-sm">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-gray-800">Mostrar no Site</span>
                  <span className="text-[10px] font-medium text-gray-400 mt-0.5">Controla se o depoimento aparece na Home.</span>
                </div>
                <Switch 
                  checked={ativo} 
                  onCheckedChange={setAtivo} 
                />
              </div>
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
                {editingId ? 'Salvar Alterações' : 'Criar Depoimento'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

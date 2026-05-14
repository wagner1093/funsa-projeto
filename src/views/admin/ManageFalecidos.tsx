'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Edit, Trash2, Cross, Calendar, MapPin, 
  Clock, Search, ChevronRight, X, User, Camera,
  MoreHorizontal
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

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
  const [searchTerm, setSearchTerm] = useState('');
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
    const { data } = await supabase.from('funsa_falecidos').select('*').order('created_at', { ascending: false });
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
      const { error } = await supabase.from('funsa_falecidos').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Obituário removido com sucesso' });
        fetchFalecidos();
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload = { nome, data, local, velorio, sepultamento, imagem, contato_medico: contatoMedico };

    if (editingId) {
      const { error } = await supabase.from('funsa_falecidos').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Registro atualizado' }); setIsOpen(false); fetchFalecidos(); }
    } else {
      const { error } = await supabase.from('funsa_falecidos').insert([payload]);
      if (error) toast({ title: 'Erro ao criar', variant: 'destructive' });
      else { toast({ title: 'Registro publicado' }); setIsOpen(false); fetchFalecidos(); }
    }
  }

  const filteredFalecidos = falecidos.filter(f => 
    f.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <Cross className="w-5 h-5 text-gray-400" />
            Falecimentos e Homenagens
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">Gestão de comunicados de obituário e informações de cerimônia.</p>
        </div>
        <Button 
          onClick={handleOpenNew} 
          className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-5 h-11 transition-all flex items-center gap-2 font-semibold text-sm"
        >
          <Plus className="w-4 h-4" />
          Novo Registro
        </Button>
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Pesquisar por nome..."
            className="admin-search"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-px h-6 bg-gray-200 mx-2" />
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          {filteredFalecidos.length} Registros ativos
        </p>
      </div>

      {/* Table Area */}
      <div className="admin-card overflow-hidden border border-gray-100 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="admin-table-header">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Informações Pessoais</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Data</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Cerimônia e Local</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              <AnimatePresence>
                {loading ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2 opacity-40">
                      <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-semibold text-gray-500">Buscando dados...</span>
                    </div>
                  </td></tr>
                ) : filteredFalecidos.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-12 text-center text-gray-400 italic text-xs">
                    Nenhum registro de obituário encontrado.
                  </td></tr>
                ) : (
                  filteredFalecidos.map((item, idx) => (
                    <motion.tr 
                      key={item.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0 border border-white shadow-sm overflow-hidden group-hover:scale-105 transition-transform">
                            {item.imagem ? (
                              <img src={item.imagem} className="w-full h-full object-cover" />
                            ) : (
                              <User className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-gray-800 text-[13px]">{item.nome}</span>
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                               <MapPin className="w-2.5 h-2.5 text-gray-300" /> {item.local || 'Local não informado'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs font-medium">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-gray-300" />
                          {item.data}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                              <Clock className="w-3 h-3 text-gray-300" />
                              <span className="text-[9px] font-bold text-gray-400 uppercase">Velório:</span> {item.velorio}
                            </div>
                            <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                              <MapPin className="w-3 h-3 text-gray-300" />
                              <span className="text-[9px] font-bold text-gray-400 uppercase">Sepult.:</span> {item.sepultamento}
                            </div>
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                          <button 
                            onClick={() => {
                              setNome(item.nome); setData(item.data); setLocal(item.local); 
                              setVelorio(item.velorio); setSepultamento(item.sepultamento); 
                              setImagem(item.imagem || ''); setContatoMedico(item.contato_medico || '');
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
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Clean Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border border-gray-100 shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-black/10">
                <Cross className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {editingId ? 'Editar Homenagem' : 'Novo Obituário'}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  Registros Funerários <ChevronRight className="w-3 h-3" /> Homenagens
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
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Nome Completo</label>
                <Input 
                  required 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  placeholder="Nome do falecido(a)..." 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Data do Falecimento</label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <Input 
                    required 
                    value={data} 
                    onChange={e => setData(e.target.value)} 
                    placeholder="Ex: 15/05/2026" 
                    className="h-12 pl-10 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Local do Velório (Sala)</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <Input 
                    required 
                    value={local} 
                    onChange={e => setLocal(e.target.value)} 
                    placeholder="Ex: Sala Memorial 02" 
                    className="h-12 pl-10 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                  />
                </div>
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Informações de Cerimônia (Horário/Local)</label>
                <Input 
                  required 
                  value={velorio} 
                  onChange={e => setVelorio(e.target.value)} 
                  placeholder="Ex: Hoje às 15:00 na Capela Municipal" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>
              
              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">Informações de Sepultamento</label>
                <Input 
                  required 
                  value={sepultamento} 
                  onChange={e => setSepultamento(e.target.value)} 
                  placeholder="Ex: Amanhã às 10:00 no Cemitério de Avaré" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] px-1">URL da Imagem / Foto</label>
                <div className="relative">
                  <Camera className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <Input 
                    value={imagem} 
                    onChange={e => setImagem(e.target.value)} 
                    placeholder="Cole o link da foto..." 
                    className="h-12 pl-10 border-gray-100 bg-white rounded-xl text-sm font-medium focus-visible:ring-gray-200 shadow-sm" 
                  />
                </div>
                {imagem && (
                  <div className="mt-2 rounded-xl overflow-hidden h-24 w-24 border-2 border-white shadow-md mx-auto">
                    <img src={imagem} className="w-full h-full object-cover" />
                  </div>
                )}
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
                {editingId ? 'Salvar Alterações' : 'Publicar Agora'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


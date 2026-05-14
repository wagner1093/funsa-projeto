'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Trash2, Code2, Power, Edit3, Settings, Save, X, 
  Terminal, ChevronRight, Activity, Cpu, MoreHorizontal,
  ExternalLink, Zap
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

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
    const { data } = await supabase.from('funsa_site_integracoes').select('*').order('created_at', { ascending: false });
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
      const { error } = await supabase.from('funsa_site_integracoes').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Script removido com sucesso' });
        fetchIntegracoes();
      }
    }
  }

  async function toggleStatus(id: string, currentStatus: boolean) {
    const { error } = await supabase.from('funsa_site_integracoes').update({ status: !currentStatus }).eq('id', id);
    if (!error) {
      toast({ title: !currentStatus ? 'Integração ativada' : 'Integração pausada' });
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
      const { error } = await supabase.from('funsa_site_integracoes').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Integração atualizada' }); setIsOpen(false); fetchIntegracoes(); }
    } else {
      const { error } = await supabase.from('funsa_site_integracoes').insert([payload]);
      if (error) toast({ title: 'Erro ao cadastrar', variant: 'destructive' });
      else { toast({ title: 'Script conectado' }); setIsOpen(false); fetchIntegracoes(); }
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <Cpu className="w-5 h-5 text-gray-400" />
            Pixels & Scripts Externos
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">Gerencie códigos de rastreio, Google Analytics e ferramentas de marketing.</p>
        </div>
        <Button 
          onClick={handleOpenNew} 
          className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-5 h-11 transition-all flex items-center gap-2 font-semibold text-sm shadow-xl shadow-black/5"
        >
          <Plus className="w-4 h-4" />
          Conectar Novo Script
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
             <div className="flex flex-col items-center justify-center p-20 opacity-40">
               <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
               <span className="text-xs font-semibold text-gray-500 mt-3">Mapeando integrações...</span>
             </div>
        ) : integracoes.length === 0 ? (
             <div className="bg-white rounded-3xl border border-dashed border-gray-200 p-16 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                  <Terminal className="w-8 h-8 text-gray-200" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-bold">Nenhum script ativo</h3>
                  <p className="text-gray-400 text-xs mt-1 max-w-xs mx-auto font-medium">Conecte o seu site com ferramentas de marketing e análise de dados para coletar métricas valiosas.</p>
                </div>
                <Button variant="outline" onClick={handleOpenNew} className="rounded-xl border-gray-100 font-bold text-[10px] uppercase tracking-widest text-gray-400 hover:text-gray-600">
                  Começar agora
                </Button>
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
            {integracoes.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.04 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden flex flex-col"
              >
                <div className="p-6 space-y-5 flex-1">
                  <div className="flex justify-between items-start">
                     <div className={`p-2.5 rounded-xl transition-all duration-500 ${item.status ? 'bg-gray-900 text-white shadow-lg shadow-black/10' : 'bg-gray-50 text-gray-300'}`}>
                        <Code2 className="w-5 h-5" />
                     </div>
                     <div className="flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button 
                           onClick={() => {
                              setNome(item.nome); setHeadCode(item.head_code || ''); setBodyCode(item.body_code || ''); 
                              setStatus(item.status); setEditingId(item.id); setIsOpen(true);
                           }} 
                           className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
                        >
                           <Edit3 className="w-4 h-4" />
                        </button>
                        <button 
                           onClick={() => handleDelete(item.id)}
                           className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                        >
                           <Trash2 className="w-4 h-4" />
                        </button>
                     </div>
                  </div>

                  <div>
                     <h3 className="font-bold text-gray-800 text-sm line-clamp-1 group-hover:text-gray-900 transition-colors">{item.nome}</h3>
                     <div className="flex items-center gap-2 mt-1.5">
                         <div className={`w-1.5 h-1.5 rounded-full ${item.status ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-300'}`} />
                         <span className={`text-[9px] font-bold uppercase tracking-[0.1em] ${item.status ? 'text-emerald-600' : 'text-gray-400'}`}>
                            {item.status ? 'Monitoramento Ativo' : 'Conexão Pausada'}
                         </span>
                     </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      <Zap className={`w-3 h-3 ${item.status ? 'text-amber-400' : 'text-gray-200'}`} />
                      Via CMS Core
                   </div>
                   <button 
                      onClick={() => toggleStatus(item.id, item.status)}
                      className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all ${
                         item.status 
                         ? 'bg-gray-100 text-gray-500 hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200' 
                         : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100'
                      }`}
                   >
                      <Power className="w-3 h-3" />
                      {item.status ? 'Pausar' : 'Ativar'}
                   </button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Modern Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl bg-white rounded-3xl p-0 overflow-hidden border border-gray-100 shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg shadow-black/10">
                <Terminal className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {editingId ? 'Configurar Script' : 'Nova Integração'}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  Console de Injeção <ChevronRight className="w-3 h-3" /> Head/Body Scripts
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg hover:bg-gray-50 text-gray-400">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6 bg-[#FBFBFC]">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Nome da Identificação Interna</label>
              <Input 
                required 
                value={nome} 
                onChange={e => setNome(e.target.value)} 
                placeholder="Ex: Google Analytics G4, Meta Pixel..." 
                className="h-12 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-bold text-gray-800 focus-visible:ring-gray-200" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Injeção no &lt;HEAD&gt;</label>
                     <span className="text-[9px] text-gray-300 font-bold uppercase bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">Cabeçalho</span>
                  </div>
                  <div className="relative bg-[#0F1117] rounded-2xl p-5 overflow-hidden border border-white/5 group shadow-xl">
                    <textarea 
                      value={headCode} 
                      onChange={e => setHeadCode(e.target.value)} 
                      className="w-full h-56 bg-transparent text-emerald-400 font-mono text-[11px] outline-none scrollbar-hide resize-none leading-relaxed relative z-10"
                      placeholder="<!-- Insira o código do cabeçalho aqui -->"
                    />
                    <div className="absolute bottom-4 right-4 text-white/5 pointer-events-none uppercase font-black text-3xl select-none group-hover:opacity-10 transition-opacity">HEAD</div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Injeção no &lt;BODY&gt;</label>
                     <span className="text-[9px] text-gray-300 font-bold uppercase bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">Corpo</span>
                  </div>
                  <div className="relative bg-[#0F1117] rounded-2xl p-5 overflow-hidden border border-white/5 group shadow-xl">
                    <textarea 
                      value={bodyCode} 
                      onChange={e => setBodyCode(e.target.value)} 
                      className="w-full h-56 bg-transparent text-amber-400 font-mono text-[11px] outline-none scrollbar-hide resize-none leading-relaxed relative z-10"
                      placeholder="<!-- Insira o código do corpo aqui -->"
                    />
                    <div className="absolute bottom-4 right-4 text-white/5 pointer-events-none uppercase font-black text-3xl select-none group-hover:opacity-10 transition-opacity">BODY</div>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors shadow-sm ${status ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 text-gray-300'}`}>
                   <Power className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <h4 className="text-xs font-bold text-gray-800">Estado de Publicação</h4>
                   <p className="text-[10px] text-gray-400 font-medium">Define se este script será injetado no site agora.</p>
                </div>
                <button 
                   type="button"
                   onClick={() => setStatus(!status)}
                   className={`relative w-14 h-7 rounded-full transition-all duration-500 outline-none p-1 ${status ? 'bg-emerald-500' : 'bg-gray-200'}`}
                >
                   <div className={`w-5 h-5 bg-white rounded-full transition-all duration-500 shadow-md transform ${status ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="px-6 py-2.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Descartar
              </button>
              <button 
                type="submit" 
                className="px-8 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all text-xs font-bold shadow-xl shadow-black/5 flex items-center gap-2"
              >
                <Save className="w-3.5 h-3.5" />
                {editingId ? 'Salvar Alterações' : 'Conectar Script'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


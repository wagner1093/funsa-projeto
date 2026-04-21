import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2, Code2, Power, Edit3, Settings, Save, X, Terminal, ChevronRight, Activity } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
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
      toast({ title: !currentStatus ? 'Integração Ativada' : 'Integração Pausada' });
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
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Code2 className="w-6 h-6 text-purple-600" />
             </div>
             Pixels & Integrações
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie scripts externos, Google Analytics e Pixels de conversão.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-navy hover:bg-black text-white rounded-xl px-6 py-5 shadow-lg transition-all flex items-center gap-2 font-bold">
          <Plus className="w-5 h-5" />
          Conectar Script
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
             <div className="p-20 text-center text-gray-400 font-medium">Carregando integrações...</div>
        ) : integracoes.length === 0 ? (
             <div className="admin-card p-12 text-center">
                <Terminal className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-navy font-bold">Nenhuma integração ativa</h3>
                <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto">Conecte o seu site com ferramentas de marketing e análise de dados agora mesmo.</p>
             </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
            {integracoes.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="admin-card group relative overflow-hidden flex flex-col pt-6"
              >
                <div className={`absolute top-0 left-0 w-full h-1 ${item.status ? 'bg-emerald-400' : 'bg-gray-200'}`} />
                
                <div className="px-6 flex justify-between items-start mb-4">
                   <div className="p-2 rounded-xl bg-gray-50 text-navy group-hover:bg-navy group-hover:text-white transition-all duration-500">
                      <Code2 className="w-5 h-5" />
                   </div>
                   <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                         onClick={() => {
                            setNome(item.nome); setHeadCode(item.head_code || ''); setBodyCode(item.body_code || ''); 
                            setStatus(item.status); setEditingId(item.id); setIsOpen(true);
                         }} 
                         className="p-1.5 text-azure hover:bg-azure/10 rounded-lg transition-colors"
                      >
                         <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                         onClick={() => handleDelete(item.id)}
                         className="p-1.5 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                         <Trash2 className="w-4 h-4" />
                      </button>
                   </div>
                </div>

                <div className="px-6 pb-6 flex-1">
                   <h3 className="font-bold text-navy mb-2 line-clamp-1 group-hover:text-azure transition-colors">{item.nome}</h3>
                   <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${item.status ? 'bg-emerald-500 animate-pulse' : 'bg-gray-300'}`} />
                       <span className={`text-[10px] font-bold uppercase tracking-widest ${item.status ? 'text-emerald-600' : 'text-gray-400'}`}>
                          {item.status ? 'Ativo e Rodando' : 'Pausado'}
                       </span>
                   </div>
                </div>

                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                   <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                      <Activity className="w-3 h-3 text-azure" />
                      Instalado via CMS
                   </div>
                   <button 
                      onClick={() => toggleStatus(item.id, item.status)}
                      className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full transition-all ${
                         item.status 
                         ? 'bg-gray-200 text-gray-500 hover:bg-gray-300' 
                         : 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                      }`}
                   >
                      <Power className="w-3 h-3" />
                      {item.status ? 'Desativar' : 'Ativar'}
                   </button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl bg-[#f8f9fc] rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-navy p-8 flex items-center justify-between text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-navy to-black opacity-50" />
            <div className="relative z-10 flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                 <Terminal className="w-6 h-6" />
               </div>
               <div>
                  <DialogTitle className="text-xl font-bold">
                    {editingId ? 'Configurar Integração' : 'Conectar Nova Ferramenta'}
                  </DialogTitle>
                  <p className="text-white/40 text-xs mt-1 uppercase tracking-widest font-semibold flex items-center gap-2">
                    Console de Código <ChevronRight className="w-3 h-3" /> External Scripts
                  </p>
               </div>
            </div>
            <div className="flex gap-3 relative z-10">
               <button type="button" onClick={() => setIsOpen(false)} className="px-5 py-2.5 rounded-xl border border-white/20 text-sm font-bold hover:bg-white/10 transition-colors">Fechar</button>
               <button onClick={handleSave} className="px-6 py-2.5 rounded-xl bg-azure text-white text-sm font-bold shadow-xl shadow-azure/20 hover:scale-105 transition-all flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  Salvar
               </button>
            </div>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="admin-card p-6 border-none shadow-sm space-y-4">
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 px-1">Nome de Identificação (Ex: Pixel Facebook, Google Ads)</label>
              <Input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Digite o nome desta integração..." className="h-12 border-gray-200 rounded-xl text-navy font-bold focus-visible:ring-azure" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bloco &lt;HEAD&gt;</label>
                     <span className="text-[10px] text-azure font-medium">Recomendado p/ Pixels</span>
                  </div>
                  <div className="relative bg-gray-900 rounded-2xl p-4 overflow-hidden border border-gray-800">
                    <textarea 
                      value={headCode} 
                      onChange={e => setHeadCode(e.target.value)} 
                      className="w-full h-48 bg-transparent text-emerald-400 font-mono text-xs outline-none scrollbar-hide resize-none leading-relaxed"
                      placeholder="<!-- Insira o código que deve ir no cabeçalho -->"
                    />
                    <div className="absolute top-4 right-4 text-white/5 pointer-events-none uppercase font-black text-4xl select-none">HEAD</div>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Bloco &lt;BODY&gt;</label>
                     <span className="text-[10px] text-azure font-medium">Recomendado p/ Widgets</span>
                  </div>
                  <div className="relative bg-gray-900 rounded-2xl p-4 overflow-hidden border border-gray-800">
                    <textarea 
                      value={bodyCode} 
                      onChange={e => setBodyCode(e.target.value)} 
                      className="w-full h-48 bg-transparent text-emerald-400 font-mono text-xs outline-none scrollbar-hide resize-none leading-relaxed"
                      placeholder="<!-- Insira o código que deve ir no corpo da página -->"
                    />
                    <div className="absolute top-4 right-4 text-white/5 pointer-events-none uppercase font-black text-4xl select-none">BODY</div>
                  </div>
               </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
                <div className={`p-3 rounded-xl transition-colors ${status ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                   <Power className="w-5 h-5" />
                </div>
                <div className="flex-1">
                   <h4 className="text-sm font-bold text-navy">Estado da Integração</h4>
                   <p className="text-xs text-gray-400">Ative ou pause a execução deste código no site.</p>
                </div>
                <button 
                   type="button"
                   onClick={() => setStatus(!status)}
                   className={`relative w-14 h-7 rounded-full transition-colors duration-300 outline-none ${status ? 'bg-azure' : 'bg-gray-200'}`}
                >
                   <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform duration-300 shadow-sm ${status ? 'translate-x-7' : 'translate-x-0'}`} />
                </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

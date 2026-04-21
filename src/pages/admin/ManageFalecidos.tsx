import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, Cross, Calendar, MapPin, Clock, Search, ExternalLink } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

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
        toast({ title: 'Obituário removido' });
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
      else { toast({ title: 'Registro criado' }); setIsOpen(false); fetchFalecidos(); }
    }
  }

  const filteredFalecidos = falecidos.filter(f => 
    f.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
              <Cross className="w-6 h-6 text-navy" />
            </div>
            Registros de Obituário
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gestão de comunicados de falecimento e homenagens.</p>
        </div>
        <Button onClick={handleOpenNew} className="bg-navy hover:bg-black text-white rounded-xl px-6 py-5 shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Novo Registro
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar por nome..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:border-navy focus:ring-1 focus:ring-navy outline-none transition-all text-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="admin-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-navy">
            <thead className="admin-table-header">
              <tr>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Falecido(a)</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Data</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500">Informações de Cerimônia</th>
                <th className="px-6 py-4 font-bold uppercase tracking-wider text-[11px] text-gray-500 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400 font-medium">Sincronizando registros...</td></tr>
              ) : filteredFalecidos.length === 0 ? (
                <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400">Nenhum registro encontrado.</td></tr>
              ) : (
                filteredFalecidos.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100 overflow-hidden ring-2 ring-transparent group-hover:ring-navy/5 transition-all">
                          {item.imagem ? <img src={item.imagem} className="w-full h-full object-cover" /> : <Cross className="w-4 h-4 text-gray-300" />}
                        </div>
                        <span className="font-bold text-navy">{item.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-navy/40" />
                        {item.data}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Clock className="w-3 h-3 text-navy/30" />
                            <span className="font-medium">Velório:</span> {item.velorio}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin className="w-3 h-3 text-navy/30" />
                            <span className="font-medium">Sultamento:</span> {item.sepultamento}
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => {
                            setNome(item.nome); setData(item.data); setLocal(item.local); 
                            setVelorio(item.velorio); setSepultamento(item.sepultamento); 
                            setImagem(item.imagem || ''); setContatoMedico(item.contato_medico || '');
                            setEditingId(item.id); setIsOpen(true);
                          }} 
                          className="p-2 text-azure hover:bg-azure/10 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)} 
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border-none shadow-2xl">
          <div className="bg-navy h-24 p-8 flex items-center justify-between relative overflow-hidden text-white leading-none">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
            <DialogTitle className="text-xl font-bold flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Cross className="w-5 h-5 text-white" />
               </div>
               {editingId ? 'Editar Registro' : 'Novo Obituário'}
            </DialogTitle>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Nome Completo do Falecido(a)</label>
                <Input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Ex: João da Silva" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-navy" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Data do Falecimento</label>
                <Input required value={data} onChange={e => setData(e.target.value)} placeholder="Ex: 15/02/2026" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-navy" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Local/Sala do Velório</label>
                <Input required value={local} onChange={e => setLocal(e.target.value)} placeholder="Ex: Sala Memorial 01" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-navy" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Horário e Local do Velório</label>
                <Input required value={velorio} onChange={e => setVelorio(e.target.value)} placeholder="Ex: Hoje às 14:00 no Velório Municipal" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-navy" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Informações de Sepultamento</label>
                <Input required value={sepultamento} onChange={e => setSepultamento(e.target.value)} placeholder="Ex: Amanhã às 09:00 no Cemitério de Avaré" className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-navy" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">URL da Foto (URL Pública)</label>
                <Input value={imagem} onChange={e => setImagem(e.target.value)} placeholder="https://..." className="h-12 border-gray-200 rounded-xl text-sm focus-visible:ring-navy" />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-4">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="px-6 py-3 border border-gray-200 text-gray-400 rounded-xl hover:bg-gray-50 transition-colors text-sm font-bold"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 bg-navy text-white rounded-xl hover:bg-black transition-all text-sm font-bold shadow-lg shadow-navy/20"
              >
                {editingId ? 'Salvar Alterações' : 'Publicar Registro'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

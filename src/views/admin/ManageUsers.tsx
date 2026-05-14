'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Edit, Trash2, Search, Users, Shield, 
  Calendar, Mail, Key, UserPlus, X, Save,
  Fingerprint, ChevronRight, Lock
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  role: string;
  created_at: string;
};

export default function ManageUsers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [role, setRole] = useState('admin');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    setLoading(true);
    const { data } = await supabase.from('funsa_usuarios').select('id, nome, email, role, created_at').order('created_at', { ascending: false });
    if (data) setUsuarios(data);
    setLoading(false);
  }

  function handleOpenNew() {
    setNome(''); setEmail(''); setSenha(''); setRole('admin');
    setEditingId(null);
    setIsOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja remover o acesso deste usuário?')) {
      const { error } = await supabase.from('funsa_usuarios').delete().eq('id', id);
      if (!error) {
        toast({ title: 'Acesso revogado com sucesso' });
        fetchUsuarios();
      } else {
        toast({ title: 'Erro ao remover', variant: 'destructive' });
      }
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const payload: any = { nome, email, role };
    if (senha) payload.senha = senha;

    if (editingId) {
      const { error } = await supabase.from('funsa_usuarios').update(payload).eq('id', editingId);
      if (error) toast({ title: 'Erro ao atualizar', variant: 'destructive' });
      else { toast({ title: 'Usuário atualizado' }); setIsOpen(false); fetchUsuarios(); }
    } else {
      if (!senha) {
        toast({ title: 'A senha é obrigatória', variant: 'destructive' });
        return;
      }
      const { error } = await supabase.from('funsa_usuarios').insert([payload]);
      if (error) toast({ title: 'Erro ao criar', variant: 'destructive' });
      else { toast({ title: 'Acesso concedido com sucesso' }); setIsOpen(false); fetchUsuarios(); }
    }
  }

  const filteredUsuarios = usuarios.filter(u => 
    u.nome.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <Users className="w-5 h-5 text-gray-400" />
            Gestão de Equipe
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">Controle de acessos e permissões do painel administrativo.</p>
        </div>
        <Button 
          onClick={handleOpenNew} 
          className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-5 h-11 transition-all flex items-center gap-2 font-semibold text-sm shadow-xl shadow-black/5"
        >
          <UserPlus className="w-4 h-4" />
          Novo Colaborador
        </Button>
      </div>

      {/* Search */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-gray-900 transition-colors" />
        <input 
          type="text" 
          placeholder="Pesquisar por nome, cargo ou e-mail..."
          className="w-full h-12 pl-11 pr-4 rounded-2xl border border-gray-100 bg-white focus:border-gray-200 focus:ring-4 focus:ring-gray-50 outline-none transition-all text-sm font-medium placeholder:text-gray-300 shadow-sm"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/30">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Colaborador</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Acesso</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Nível</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Desde</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] font-bold uppercase tracking-widest mt-3 text-gray-500">Sincronizando...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsuarios.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Nenhum registro encontrado</p>
                  </td>
                </tr>
              ) : (
                <AnimatePresence mode="popLayout">
                {filteredUsuarios.map(user => (
                  <motion.tr 
                    layout
                    key={user.id} 
                    className="hover:bg-gray-50/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-lg shadow-black/10">
                          {user.nome.charAt(0)}
                        </div>
                        <span className="font-bold text-gray-800 text-sm">{user.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium lowercase">
                         <Mail className="w-3.5 h-3.5 text-gray-300" />
                         {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                         user.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-gray-50 text-gray-500 border border-gray-100'
                       }`}>
                          <Shield className="w-3 h-3" />
                          {user.role}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase">
                        <Calendar className="w-3 h-3" />
                        {new Date(user.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-1 justify-end opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button onClick={() => {
                           setNome(user.nome); setEmail(user.email); setRole(user.role); setSenha(''); setEditingId(user.id); setIsOpen(true);
                        }} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(user.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-xl bg-white rounded-[2rem] p-0 overflow-hidden border border-gray-100 shadow-2xl">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-white">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-gray-900 flex items-center justify-center shadow-xl shadow-black/10">
                <Fingerprint className="w-5 h-5 text-white" />
              </div>
              <div>
                <DialogTitle className="text-lg font-bold text-gray-900">
                  {editingId ? 'Editar Colaborador' : 'Novo Colaborador'}
                </DialogTitle>
                <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">
                  Segurança <ChevronRight className="w-3 h-3" /> Credenciais de Acesso
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-gray-50 text-gray-400 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSave} className="p-8 space-y-6 bg-[#FBFBFC]">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nome Completo</label>
                <Input 
                  required 
                  value={nome} 
                  onChange={e => setNome(e.target.value)} 
                  placeholder="Nome do colaborador" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-bold text-gray-800 focus-visible:ring-gray-200" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">E-mail de Login</label>
                <Input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="email@empresa.com.br" 
                  className="h-12 border-gray-100 bg-white rounded-xl text-sm font-bold text-gray-800 focus-visible:ring-gray-200" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5" /> 
                    {editingId ? 'Nova Senha' : 'Senha'}
                  </label>
                  <Input 
                    type="password" 
                    required={!editingId} 
                    value={senha} 
                    onChange={e => setSenha(e.target.value)} 
                    placeholder="••••••••" 
                    className="h-12 border-gray-100 bg-white rounded-xl text-sm font-bold text-gray-800 focus-visible:ring-gray-200" 
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Nível de Acesso</label>
                  <select 
                    className="w-full h-12 rounded-xl text-sm font-bold text-gray-800 border border-gray-100 bg-white px-4 py-2 focus:ring-4 focus:ring-gray-50 outline-none transition-all shadow-sm" 
                    value={role} 
                    onChange={e => setRole(e.target.value)}
                  >
                    <option value="admin">Administrador</option>
                    <option value="editor">Editor de Conteúdo</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-50">
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
                <Save className="w-3.5 h-3.5" />
                {editingId ? 'Atualizar Dados' : 'Conceder Acesso'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}


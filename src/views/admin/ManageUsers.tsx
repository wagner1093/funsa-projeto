'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Edit, Trash2, Search, Users, Shield, 
  Calendar, Mail, UserPlus, X, Save,
  Fingerprint, ChevronRight, Lock, Eye, EyeOff,
  KeyRound, CheckCircle2
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
  funcao: string;
  status: string;
  last_login: string | null;
  created_at: string;
};

export default function ManageUsers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [funcao, setFuncao] = useState('admin');
  const [status, setStatus] = useState('ativo');
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  async function fetchUsuarios() {
    setLoading(true);
    const { data, error } = await supabase
      .from('funsa_site_users')
      .select('id, nome, email, funcao, status, last_login, created_at')
      .eq('site_id', '18a32bda-97fc-4dc6-b438-8d0988207f84')
      .neq('funcao', 'global_admin')
      .order('created_at', { ascending: false });
    if (data) setUsuarios(data);
    if (error) console.error('Erro ao buscar usuários:', error);
    setLoading(false);
  }

  function handleOpenNew() {
    setNome(''); setEmail(''); setSenha(''); setFuncao('admin'); setStatus('ativo');
    setShowPassword(false);
    setEditingId(null);
    setIsOpen(true);
  }

  function handleOpenEdit(user: Usuario) {
    setNome(user.nome);
    setEmail(user.email);
    setSenha(''); // Senha em branco ao editar (só altera se preencher)
    setFuncao(user.funcao);
    setStatus(user.status);
    setShowPassword(false);
    setEditingId(user.id);
    setIsOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja remover o acesso deste usuário? Esta ação é irreversível.')) {
      // Deletar do banco primeiro
      const { error: dbError } = await supabase.from('funsa_site_users').delete().eq('id', id);
      if (dbError) {
        toast({ title: 'Erro ao remover', description: dbError.message, variant: 'destructive' });
        return;
      }
      toast({ title: 'Acesso revogado com sucesso' });
      fetchUsuarios();
    }
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        // ── EDITAR USUÁRIO EXISTENTE ──
        if (senha && senha.length < 6) {
          toast({ title: 'Senha muito curta', description: 'A senha deve ter pelo menos 6 caracteres.', variant: 'destructive' });
          setSaving(false);
          return;
        }

        const res = await fetch('/api/admin/update-user', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, nome, email, funcao, status, senha: senha || undefined }),
        });

        const result = await res.json();
        if (!res.ok) {
          toast({ title: 'Erro ao atualizar', description: result.error, variant: 'destructive' });
        } else {
          toast({ title: '✅ Usuário atualizado com sucesso!' });
          setIsOpen(false);
          fetchUsuarios();
        }
      } else {
        // ── CRIAR NOVO USUÁRIO ──
        if (!senha) {
          toast({ title: 'Senha obrigatória', description: 'Defina uma senha para o novo colaborador.', variant: 'destructive' });
          setSaving(false);
          return;
        }
        if (senha.length < 6) {
          toast({ title: 'Senha muito curta', description: 'A senha deve ter pelo menos 6 caracteres.', variant: 'destructive' });
          setSaving(false);
          return;
        }

        const res = await fetch('/api/admin/create-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, senha, funcao, status }),
        });

        const result = await res.json();
        if (!res.ok) {
          toast({ title: 'Erro ao criar usuário', description: result.error, variant: 'destructive' });
        } else {
          toast({ 
            title: '✅ Acesso criado com sucesso!',
            description: `${nome} já pode acessar o painel com o e-mail e senha definidos.`
          });
          setIsOpen(false);
          fetchUsuarios();
        }
      }
    } catch (err: any) {
      toast({ title: 'Erro inesperado', description: err?.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  const filteredUsuarios = usuarios.filter(u => 
    u.nome?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const senhaStrength = (s: string) => {
    if (!s) return null;
    if (s.length < 6) return { label: 'Muito fraca', color: 'bg-red-400', width: '20%' };
    if (s.length < 8) return { label: 'Fraca', color: 'bg-orange-400', width: '40%' };
    if (s.length < 10) return { label: 'Média', color: 'bg-yellow-400', width: '60%' };
    if (s.length < 13) return { label: 'Forte', color: 'bg-emerald-400', width: '80%' };
    return { label: 'Muito forte', color: 'bg-emerald-500', width: '100%' };
  };

  const strength = senhaStrength(senha);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <Users className="w-5 h-5 text-gray-400" />
            Gestão de Equipe
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">Controle de acessos, senhas e permissões do painel administrativo.</p>
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
          placeholder="Pesquisar por nome ou e-mail..."
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
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">E-mail de Acesso</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Função</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em]">Cadastrado em</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center opacity-40">
                      <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                      <span className="text-[10px] font-bold uppercase tracking-widest mt-3 text-gray-500">Sincronizando...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsuarios.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center gap-3 opacity-40">
                      <Users className="w-8 h-8 text-gray-300" />
                      <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Nenhum colaborador cadastrado</p>
                    </div>
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
                          {user.nome?.charAt(0)?.toUpperCase() ?? '?'}
                        </div>
                        <span className="font-bold text-gray-800 text-sm">{user.nome}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                         <Mail className="w-3.5 h-3.5 text-gray-300" />
                         {user.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-medium uppercase tracking-wider ${
                         user.funcao === 'global_admin'
                           ? 'bg-purple-50 text-purple-700 border border-purple-100'
                           : user.funcao === 'admin' 
                           ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' 
                           : user.funcao === 'editor'
                           ? 'bg-blue-50 text-blue-600 border border-blue-100'
                           : 'bg-gray-50 text-gray-500 border border-gray-100'
                       }`}>
                          <Shield className="w-3 h-3" />
                          {user.funcao === 'global_admin' ? 'Global Admin' : user.funcao}
                       </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${
                        user.status === 'ativo' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-500 border border-red-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'ativo' ? 'bg-emerald-500' : 'bg-red-400'}`} />
                        {user.status}
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
                        <button 
                          onClick={() => handleOpenEdit(user)} 
                          className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100"
                          title="Editar colaborador"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)} 
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all border border-transparent hover:border-red-100"
                          title="Remover acesso"
                        >
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

      {/* Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent hideCloseButton className="max-w-xl bg-white rounded-[2rem] p-0 overflow-hidden border border-gray-100 shadow-2xl">
          {/* Header */}
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
          
          <form onSubmit={handleSave} className="p-8 space-y-5 bg-[#FBFBFC]">
            {/* Nome */}
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

            {/* E-mail */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">E-mail de Login</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <Input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="email@empresa.com.br" 
                  className="h-12 pl-10 border-gray-100 bg-white rounded-xl text-sm font-bold text-gray-800 focus-visible:ring-gray-200" 
                />
              </div>
            </div>

            {/* Senha */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                <KeyRound className="w-3.5 h-3.5" />
                {editingId ? 'Nova Senha (deixe em branco para manter)' : 'Senha de Acesso *'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  required={!editingId}
                  value={senha} 
                  onChange={e => setSenha(e.target.value)} 
                  placeholder={editingId ? 'Deixe em branco para não alterar' : 'Mínimo 6 caracteres'}
                  className="h-12 pl-10 pr-12 border-gray-100 bg-white rounded-xl text-sm font-bold text-gray-800 focus-visible:ring-gray-200" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Barra de força da senha */}
              {senha && strength && (
                <div className="space-y-1 px-1">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${strength.color}`} 
                      style={{ width: strength.width }}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{strength.label}</span>
                    {senha.length >= 8 && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                  </div>
                </div>
              )}

              {!editingId && (
                <p className="text-[10px] text-gray-400 font-medium px-1">
                  💡 A senha será salva de forma segura no sistema de autenticação.
                </p>
              )}
            </div>

            {/* Função e Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Função</label>
                <select 
                  className="w-full h-12 rounded-xl text-sm font-bold text-gray-800 border border-gray-100 bg-white px-4 py-2 focus:ring-4 focus:ring-gray-50 outline-none transition-all shadow-sm" 
                  value={funcao} 
                  onChange={e => setFuncao(e.target.value)}
                >
                  <option value="admin">Administrador</option>
                  <option value="editor">Editor de Conteúdo</option>
                  <option value="viewer">Visualizador</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Status</label>
                <select 
                  className="w-full h-12 rounded-xl text-sm font-bold text-gray-800 border border-gray-100 bg-white px-4 py-2 focus:ring-4 focus:ring-gray-50 outline-none transition-all shadow-sm" 
                  value={status} 
                  onChange={e => setStatus(e.target.value)}
                >
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-50">
              <button 
                type="button" 
                onClick={() => setIsOpen(false)} 
                className="px-6 py-2.5 text-xs font-bold text-gray-400 hover:text-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                disabled={saving}
                className="px-8 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-all text-xs font-bold shadow-xl shadow-black/5 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    {editingId ? 'Salvar Alterações' : 'Criar Acesso'}
                  </>
                )}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

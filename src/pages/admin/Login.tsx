import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Home, ShieldCheck, Lock, Mail, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        title: 'Erro de autenticação',
        description: 'Credenciais inválidas. Verifique seus dados e tente novamente.',
        variant: 'destructive',
      });
      setLoading(false);
    } else {
      toast({
        title: 'Acesso autorizado',
        description: 'Bem-vindo ao painel administrativo.',
      });
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#001D3D] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Elementos Decorativos de Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-azure/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-azure/10 rounded-full blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] relative z-10"
      >
        <div className="text-center mb-10">
           <motion.div 
             initial={{ scale: 0.8 }}
             animate={{ scale: 1 }}
             className="w-20 h-20 bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-2xl"
           >
              <ShieldCheck className="w-10 h-10 text-azure" />
           </motion.div>
           <h1 className="text-white text-3xl font-black tracking-tight mb-2">FUNSA<span className="text-azure">ADMIN</span></h1>
           <p className="text-white/40 text-sm font-medium uppercase tracking-[0.2em]">Sistema de Gestão Interna</p>
        </div>

        <div className="bg-white/5 backdrop-blur-3xl p-8 rounded-[2.5rem] border border-white/10 shadow-2xl shadow-black/50">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">E-mail de Acesso</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-azure transition-colors" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus-visible:ring-azure focus-visible:border-azure transition-all"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest px-1">Senha de Segurança</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20 group-focus-within:text-azure transition-colors" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 h-14 bg-white/5 border-white/10 rounded-2xl text-white placeholder:text-white/20 focus-visible:ring-azure focus-visible:border-azure transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-azure hover:bg-white hover:text-navy text-white rounded-2xl font-bold text-base shadow-xl shadow-azure/20 transition-all flex items-center justify-center gap-2 group"
              >
                {loading ? 'Validando Acesso...' : (
                  <>
                    Acessar Painel 
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <Link to="/" className="text-white/30 hover:text-white text-sm font-medium transition-colors flex items-center justify-center gap-2">
            <Home className="w-4 h-4" /> Voltar ao site institucional
          </Link>
        </motion.div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 left-0 w-full text-center">
         <p className="text-white/10 text-[10px] font-bold uppercase tracking-[0.3em]">Rede Funsa © 2026 - Avaré/SP</p>
      </div>
    </div>
  );
}

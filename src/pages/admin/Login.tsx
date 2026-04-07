import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Home } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        description: error.message,
        variant: 'destructive',
      });
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f0f1] flex flex-col items-center pt-24 font-sans">
      
      <div className="w-[320px] text-center mb-6">
        {/* Logo/Icon text just like WP */}
        <h1 className="text-[#3c434a] text-3xl font-medium tracking-tight">FUNSA Admin</h1>
      </div>

      <div className="w-[320px]">
        <div className="bg-white p-6 shadow-sm border border-[#c3c4c7] rounded-sm">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[14px] text-[#3c434a] mb-1">Nome de usuário ou endereço de e-mail</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-xl px-3 py-2 border-[#8c8f94] rounded-sm focus-visible:ring-[#2271b1] focus-visible:border-[#2271b1] h-[40px] bg-[#f9f9f9]"
                placeholder=""
              />
            </div>
            <div>
              <label className="block text-[14px] text-[#3c434a] mb-1">Senha</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-xl px-3 py-2 border-[#8c8f94] rounded-sm focus-visible:ring-[#2271b1] focus-visible:border-[#2271b1] h-[40px] bg-[#f9f9f9]"
                placeholder=""
              />
            </div>
            
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-auto py-1.5 px-4 bg-[#2271b1] hover:bg-[#135e96] text-white rounded-sm font-medium text-[13px] border border-[#2271b1]"
              >
                {loading ? 'Acessando...' : 'Acessar'}
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-[#2271b1] hover:text-[#135e96] text-[13px] flex items-center justify-center gap-1">
            <Home className="w-3 h-3" /> Voltar ao site
          </Link>
        </div>
      </div>

    </div>
  );
}

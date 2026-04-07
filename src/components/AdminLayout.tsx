import { Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, FileText, Cross, HeartPulse, Plug, Settings, LogOut, Menu, Home } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function AdminLayout() {
  const { user } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const menuItems = [
    { name: 'Painel', icon: LayoutDashboard, path: '/admin' },
    { name: 'Posts', icon: FileText, path: '/admin/blog' },
    { name: 'Falecimentos', icon: Cross, path: '/admin/falecidos' },
    { name: 'Rede Médica', icon: HeartPulse, path: '/admin/medicos' },
    { name: 'Integrações', icon: Plug, path: '/admin/integracoes' },
    { name: 'Configurações', icon: Settings, path: '/admin/configuracoes' },
  ];

  return (
    <div className="min-h-screen bg-[#f0f0f1] font-sans text-[#3c434a]">
      {/* Topbar (Admin Bar) */}
      <div className="fixed top-0 left-0 right-0 h-8 bg-[#1d2327] text-[#f0f0f1] z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-4 text-[13px]">
          <Link to="/" className="flex items-center gap-2 hover:text-[#72aee6] transition-colors">
            <Home className="w-4 h-4" />
            <span className="max-sm:hidden">FUNSA Site</span>
          </Link>
        </div>
        <div className="flex items-center gap-4 text-[13px]">
          <span className="flex items-center gap-2">
            Olá, {user?.email}
          </span>
          <button onClick={handleLogout} className="hover:text-[#72aee6] transition-colors flex items-center gap-1">
            <LogOut className="w-3.5 h-3.5" /> Sair
          </button>
        </div>
      </div>

      <div className="flex pt-8 min-h-screen">
        {/* Sidebar */}
        <aside className="w-48 bg-[#1d2327] text-white fixed h-[calc(100vh-2rem)] shadow-none z-20">
          <nav className="py-3">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-[15px] transition-colors relative ${
                    isActive 
                      ? 'bg-[#2271b1] text-white font-medium before:absolute before:left-0 before:top-0 before:h-full before:w-1' 
                      : 'text-[#a7aaad] hover:text-[#72aee6] hover:bg-[#2c3338]'
                  }`}
                >
                  <item.icon className="w-5 h-5 opacity-80" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 ml-48 p-5 md:p-8">
          <div className="max-w-[1200px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

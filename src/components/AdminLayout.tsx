import { Outlet, Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LayoutDashboard, FileText, Cross, HeartPulse, Plug, Settings, LogOut, Home, ChevronRight } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

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
    <div className="min-h-screen bg-background font-sans text-foreground flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 admin-glass text-white hidden lg:flex flex-col h-screen fixed left-0 top-0 z-30 shadow-2xl">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-azure flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-azure/20">
              <Home className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight block">FUNSA</span>
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold flex items-center gap-1">
                 Painel Admin <ChevronRight className="w-2 h-2" />
              </span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 mt-4">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all duration-300 group relative ${
                  isActive 
                    ? 'bg-azure text-white font-semibold shadow-lg shadow-azure/20' 
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-white/40'}`} />
                <span className="text-[14px]">{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-azure rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-white/10">
          <div className="flex items-center gap-3 mb-6 p-3 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-azure to-navy flex items-center justify-center text-xs font-bold ring-2 ring-white/10">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user?.email?.split('@')[0]}</p>
              <p className="text-[10px] text-white/30 truncate uppercase tracking-tighter">Administrador</p>
            </div>
          </div>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-destructive hover:text-white hover:border-destructive transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" /> 
            Sair do Painel
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 h-screen overflow-y-auto bg-[#f8f9fc] relative">
        {/* Dynamic Background Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-azure/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-navy/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-[1200px] mx-auto p-4 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

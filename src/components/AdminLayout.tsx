'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  LayoutDashboard, FileText, Cross, HeartPulse, Plug,
  Settings, LogOut, Home, Users, Search, Bell, ChevronDown,
  Globe, Menu, X, Cpu, Code2, ShieldCheck, UserCircle, ChevronRight,
  ExternalLink, MessageSquare, Heart, Mail, Sparkles
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const menuGroups = [
  {
    label: 'Overview',
    items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    ],
  },
  {
    label: 'Gerenciamento',
    items: [
      { name: 'Usuários', icon: Users, path: '/admin/usuarios' },
      { name: 'Blog & Conteúdo', icon: FileText, path: '/admin/blog' },
      { name: 'Falecimentos', icon: Cross, path: '/admin/falecidos' },
      { name: 'Rede PrevSaúde', icon: HeartPulse, path: '/admin/medicos' },
      { name: 'Avaliações', icon: MessageSquare, path: '/admin/avaliacoes' },
    ],
  },
  {
    label: 'Técnico',
    items: [
      { name: 'Integrações', icon: Cpu, path: '/admin/integracoes' },
      { name: 'Configurações', icon: Settings, path: '/admin/configuracoes' },
    ],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, role, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);



  // Notifications states
  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Notifications fetcher
  const fetchNotifications = async () => {
    try {
      const [homenagensRes, leadsRes, newsletterRes] = await Promise.all([
        supabase.from('funsa_falecidos_homenagens').select('id, nome, mensagem, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('funsa_leads').select('id, nome, mensagem, created_at').order('created_at', { ascending: false }).limit(5),
        supabase.from('funsa_newsletter_leads').select('id, nome, email, created_at').order('created_at', { ascending: false }).limit(5)
      ]);

      const list: any[] = [];

      if (homenagensRes.data) {
        homenagensRes.data.forEach((item: any) => {
          list.push({
            id: item.id,
            type: 'homenagem',
            title: 'Nova Homenagem',
            desc: `${item.nome}: "${item.mensagem.substring(0, 45)}${item.mensagem.length > 45 ? '...' : ''}"`,
            time: new Date(item.created_at).getTime(),
            dateStr: new Date(item.created_at).toLocaleString('pt-BR'),
            link: '/admin/falecidos?tab=homenagens'
          });
        });
      }

      if (leadsRes.data) {
        leadsRes.data.forEach((item: any) => {
          list.push({
            id: item.id,
            type: 'lead',
            title: 'Novo Contato',
            desc: `${item.nome} enviou uma mensagem de contato`,
            time: new Date(item.created_at).getTime(),
            dateStr: new Date(item.created_at).toLocaleString('pt-BR'),
            link: '/admin/integracoes'
          });
        });
      }

      if (newsletterRes.data) {
        newsletterRes.data.forEach((item: any) => {
          list.push({
            id: item.id,
            type: 'newsletter',
            title: 'Inscrição na Newsletter',
            desc: `${item.email} se inscreveu na newsletter`,
            time: new Date(item.created_at).getTime(),
            dateStr: new Date(item.created_at).toLocaleString('pt-BR'),
            link: '/admin/configuracoes'
          });
        });
      }

      list.sort((a, b) => b.time - a.time);
      const topNotifications = list.slice(0, 6);
      setNotifications(topNotifications);
      
      const lastViewed = localStorage.getItem('funsa_notifications_last_viewed') || '0';
      const unread = topNotifications.filter(n => n.time > parseInt(lastViewed)).length;
      setUnreadCount(unread);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 45000);
    return () => clearInterval(interval);
  }, []);


  // Redirect to login if not authenticated, or protect admin-only pages
  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/admin/login');
      } else {
        const adminOnlyPaths = ['/admin/usuarios', '/admin/integracoes', '/admin/configuracoes'];
        const isRestrictedPath = adminOnlyPaths.some(path => pathname.startsWith(path));
        // null = owner without DB record, 'admin' = admin, 'global_admin' = super admin
        const hasFullAccess = role === null || role === 'admin' || role === 'global_admin';
        if (!hasFullAccess && isRestrictedPath) {
          router.push('/admin');
        }
      }
    }
  }, [user, role, loading, router, pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const adminOnlyPaths = ['/admin/usuarios', '/admin/integracoes', '/admin/configuracoes'];
  const isRestrictedPath = adminOnlyPaths.some(path => pathname.startsWith(path));

  if (loading || !user) {
    return (
      <div className="min-h-screen flex bg-[#FAFAFA]">
        <aside className="w-64 shrink-0 hidden lg:block fixed left-0 top-0 bottom-0 z-30 bg-white border-r border-gray-100" />
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // null = owner sem registro no DB, 'admin' = administrador, 'global_admin' = super admin
  const hasFullAccess = role === null || role === 'admin' || role === 'global_admin';

  if (!hasFullAccess && isRestrictedPath) return null;

  const filteredMenuGroups = menuGroups.map((group) => {
    const items = group.items.filter((item) => {
      if (hasFullAccess) return true;
      const allowedPaths = ['/admin', '/admin/blog', '/admin/falecidos', '/admin/medicos', '/admin/avaliacoes'];
      return allowedPaths.includes(item.path);
    });
    return { ...group, items };
  }).filter((group) => group.items.length > 0);

  const isActive = (path: string) =>
    path === '/admin'
      ? pathname === '/admin'
      : pathname.startsWith(path);

  const userInitial = user?.email?.charAt(0).toUpperCase() ?? 'A';
  const userName = user?.email?.split('@')[0] ?? 'Administrador';

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white border-r border-gray-100 shadow-2xl shadow-black/[0.02]">
      {/* Brand Logo Area */}
      <div className="px-8 py-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-[1.25rem] bg-gray-900 flex items-center justify-center shadow-2xl shadow-black/20 group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
          <Globe className="w-6 h-6 text-white relative z-10" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 tracking-tight uppercase leading-none">FUNSA Admin</span>
          <span className="text-[10px] font-normal text-gray-400 uppercase tracking-wider mt-1">Core System</span>
        </div>
        <button
          onClick={() => setSidebarOpen(false)}
          className="ml-auto p-2 rounded-xl hover:bg-gray-50 lg:hidden text-gray-400 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-4 py-2 space-y-8 overflow-y-auto admin-scroll">
        {filteredMenuGroups.map((group) => (
          <div key={group.label} className="space-y-2">
            <p className="text-[9px] font-medium text-gray-300 uppercase tracking-[0.2em] px-4 mb-3">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-2xl text-[13px] font-normal transition-all duration-300 select-none group ${
                      active
                        ? 'bg-gray-900 text-white shadow-xl shadow-black/10'
                        : 'text-gray-400 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className={`w-[18px] h-[18px] shrink-0 transition-colors ${active ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-600'}`} strokeWidth={2} />
                    <span className="truncate">{item.name}</span>
                    {active && (
                      <motion.div
                        layoutId="adminActiveNav"
                        className="absolute right-3 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_6px_rgba(59,130,246,0.5)]"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Session Footer */}
      <div className="p-6 border-t border-gray-50 mt-auto">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-medium text-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all mb-4 group"
        >
          <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
          <span>Visualizar Site</span>
        </Link>
        
        <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-[1.5rem] border border-gray-100">
          <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white text-sm font-bold shadow-lg">
            {userInitial}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-medium text-gray-700 truncate leading-none">{userName}</p>
            <p className="text-[9px] text-gray-400 truncate mt-1 font-normal">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2.5 rounded-xl hover:bg-red-50 text-gray-300 hover:text-red-500 transition-all"
            title="Sair"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen flex bg-background text-foreground font-sans admin-panel"
    >
      {/* Side Navigation (Desktop) */}
      <aside className="w-64 shrink-0 hidden lg:block fixed left-0 top-0 bottom-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-md"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              className="fixed left-0 top-0 bottom-0 w-64 z-50 lg:hidden shadow-2xl"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Global Header / Topbar */}
        <header
          className={`sticky top-0 z-20 flex items-center gap-4 px-6 h-20 transition-all duration-300 ${
            scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm' : 'bg-transparent'
          }`}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-colors lg:hidden"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-normal uppercase tracking-[0.15em] text-gray-300">
            <span className="text-gray-900">FUNSA</span>
            <ChevronRight className="w-3 h-3" strokeWidth={3} />
            <span className="text-gray-400">ADMIN</span>
            <ChevronRight className="w-3 h-3" strokeWidth={3} />
            <span className="text-blue-500">
              {pathname === '/admin' ? 'Dashboard' : pathname.split('/').pop()}
            </span>
          </div>

          <div className="ml-auto flex items-center gap-4">

            {/* Notification Center */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  if (!notificationsOpen) {
                    localStorage.setItem('funsa_notifications_last_viewed', Date.now().toString());
                    setUnreadCount(0);
                  }
                }}
                className="relative p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:bg-gray-50 transition-all group"
              >
                <Bell className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" />
                {unreadCount > 0 && (
                  <div className="absolute top-3 right-3 w-2 h-2 bg-blue-500 rounded-full border-2 border-white shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-3 w-80 bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-2"
                  >
                    <div className="p-4 border-b border-gray-50 flex items-center justify-between bg-white">
                      <span className="text-xs font-bold text-gray-900">Notificações Recentes</span>
                      <button 
                        onClick={() => {
                          localStorage.setItem('funsa_notifications_last_viewed', Date.now().toString());
                          setUnreadCount(0);
                          setNotificationsOpen(false);
                        }}
                        className="text-[9px] font-bold text-blue-500 hover:text-blue-600 uppercase tracking-wider"
                      >
                        Limpar
                      </button>
                    </div>
                    <div className="py-1 max-h-[300px] overflow-y-auto admin-scroll">
                      {notifications.length === 0 ? (
                        <p className="text-center text-[10px] text-gray-400 italic py-6">Nenhuma notificação recente.</p>
                      ) : (
                        notifications.map((n) => {
                          const Icon = n.type === 'homenagem' ? Heart : n.type === 'lead' ? Mail : Sparkles;
                          return (
                            <button
                              key={n.id + n.type}
                              onClick={() => {
                                router.push(n.link);
                                setNotificationsOpen(false);
                              }}
                              className="w-full flex gap-3 p-3 rounded-2xl hover:bg-gray-50 transition-colors text-left"
                            >
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                                n.type === 'homenagem' ? 'bg-red-50 text-red-500' : n.type === 'lead' ? 'bg-blue-50 text-blue-500' : 'bg-amber-50 text-amber-500'
                              }`}>
                                <Icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-bold text-gray-800 leading-snug">{n.title}</p>
                                <p className="text-[10px] text-gray-400 truncate mt-0.5 leading-snug">{n.desc}</p>
                                <span className="text-[8px] font-bold text-gray-300 uppercase tracking-wider block mt-1">{n.dateStr}</span>
                              </div>
                            </button>
                          );
                        })
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-3 pl-1 pr-3 py-1 bg-white border border-gray-100 rounded-[1.25rem] shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center text-white text-[11px] font-bold">
                  {userInitial}
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-[10px] font-medium text-gray-700 leading-none">{userName}</p>
                </div>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-300 transition-transform duration-300 ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-100 rounded-3xl shadow-2xl shadow-black/10 overflow-hidden z-50 p-2"
                  >
                    <div className="p-4 border-b border-gray-50 text-center space-y-1">
                      <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center text-white text-xl font-bold mx-auto mb-3 shadow-xl">
                        {userInitial}
                      </div>
                      <p className="text-sm font-medium text-gray-800">{userName}</p>
                      <p className="text-[10px] text-gray-400 font-normal">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      {hasFullAccess && (
                        <Link
                          href="/admin/configuracoes"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-gray-400" />
                          Configurações do Painel
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-medium text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Desconectar Sessão
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Viewport */}
        <main className="flex-1 p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
          <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </main>

      </div>
    </div>
  );
}

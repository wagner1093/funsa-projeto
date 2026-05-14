'use client';

import { 
  FileText, Cross, HeartPulse, ArrowUpRight, Plus, 
  ExternalLink, Users, TrendingUp, Activity, 
  Clock, Calendar, Sparkles, Zap, ChevronRight,
  LayoutDashboard, MessageSquare, ShieldCheck, Globe
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ posts: 0, falecidos: 0, medicos: 0, usuarios: 0 });
  const [loading, setLoading] = useState(true);
  const userName = user?.email?.split('@')[0] ?? 'Administrador';

  const today = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).format(new Date());

  useEffect(() => {
    async function loadStats() {
      try {
        const [postsRes, falecidosRes, medicosRes, usersRes] = await Promise.all([
          supabase.from('funsa_posts').select('*', { count: 'exact', head: true }),
          supabase.from('funsa_falecidos').select('*', { count: 'exact', head: true }),
          supabase.from('funsa_medicos').select('*', { count: 'exact', head: true }),
          supabase.from('funsa_usuarios').select('*', { count: 'exact', head: true }),
        ]);
        setStats({
          posts: postsRes.count ?? 0,
          falecidos: falecidosRes.count ?? 0,
          medicos: medicosRes.count ?? 0,
          usuarios: usersRes.count ?? 0,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    { label: 'Conteúdo Blog', value: stats.posts, icon: FileText, path: '/admin/blog', color: 'blue', trend: '+2 este mês' },
    { label: 'Obituários', value: stats.falecidos, icon: Cross, path: '/admin/falecidos', color: 'orange', trend: 'Atualizado hoje' },
    { label: 'Rede PrevSaúde', value: stats.medicos, icon: HeartPulse, path: '/admin/medicos', color: 'emerald', trend: 'Rede ativa' },
    { label: 'Administradores', value: stats.usuarios, icon: Users, path: '/admin/usuarios', color: 'indigo', trend: 'Acessos ativos' },
  ];

  const quickActions = [
    { label: 'Publicar Artigo', path: '/admin/blog', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Novo Falecimento', path: '/admin/falecidos', icon: Cross, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Cadastrar Médico', path: '/admin/medicos', icon: HeartPulse, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Adicionar Usuário', path: '/admin/usuarios', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden bg-gray-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl shadow-black/10">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 L50,100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-2xl">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 mb-6">
            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[10px] font-black uppercase tracking-[0.2em]">
              Sistema Operacional
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>
          
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">
            Bom dia, <span className="text-blue-400 capitalize">{userName}</span>.
          </motion.h1>
          
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-sm md:text-base font-medium max-w-lg leading-relaxed">
            O painel administrativo está pronto. Gerencie o conteúdo, acompanhe os registros de falecimento e mantenha a rede PrevSaúde atualizada em tempo real.
          </motion.p>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
            <Link href="/admin/blog" className="px-6 py-3 bg-white text-gray-900 rounded-2xl font-bold text-sm hover:scale-105 transition-all shadow-xl shadow-white/5">
              Criar Conteúdo
            </Link>
            <Link href="/admin/configuracoes" className="px-6 py-3 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl font-bold text-sm hover:bg-white/10 transition-all">
              Configurações do Site
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {statCards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }}>
              <Link href={card.path} className="group block bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500 ${
                    card.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                    card.color === 'orange' ? 'bg-orange-50 text-orange-600' :
                    card.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    <card.icon className="w-7 h-7" strokeWidth={2.5} />
                  </div>
                  <div className="p-2 rounded-xl bg-gray-50 text-gray-300 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" strokeWidth={3} />
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    {loading ? (
                      <div className="w-16 h-8 bg-gray-50 animate-pulse rounded-lg" />
                    ) : (
                      <span className="text-4xl font-black text-gray-900 tracking-tighter">{card.value}</span>
                    )}
                  </div>
                  <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">{card.label}</h3>
                  <div className="flex items-center gap-1 mt-3">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span className="text-[10px] font-bold text-gray-400">{card.trend}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions Panel */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-400" />
                Atalhos Rápidos
              </h2>
              <p className="text-xs text-gray-400 font-medium mt-1">Acesse as principais ferramentas com um clique.</p>
            </div>
            <button className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition-colors">Ver todos</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, i) => (
              <Link 
                key={i} 
                href={action.path}
                className="flex items-center gap-4 p-5 rounded-3xl border border-gray-50 bg-[#FBFBFC] hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-black/5 transition-all group"
              >
                <div className={`w-12 h-12 ${action.bg} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <action.icon className={`w-5 h-5 ${action.color}`} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-bold text-gray-800 block">{action.label}</span>
                  <span className="text-[10px] text-gray-400 font-medium">Lançar novo registro</span>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-200 group-hover:text-gray-900 transition-colors" />
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Activity Feed / System Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
          {/* Calendar / Date Card */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100">
              <Calendar className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">{today.split(',')[0]}</h3>
            <p className="text-4xl font-black text-gray-900 my-1 tracking-tighter">{new Date().getDate()}</p>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">{new Date().toLocaleString('pt-BR', { month: 'long' })}</p>
          </div>

          {/* External Links */}
          <div className="bg-gray-900 rounded-[2.5rem] p-8 shadow-2xl shadow-black/10">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <ExternalLink className="w-4 h-4 text-blue-400" />
              Links Externos
            </h3>
            <div className="space-y-3">
              <a href="https://funsa.com.br" target="_blank" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white block">Site Institucional</span>
                    <span className="text-[9px] text-gray-500 font-medium">funsa.com.br</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
              
              <a href="https://apps.mssistemas.com.br/areacliente.php/?codigo=136" target="_blank" className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-white block">Área do Cliente (MS)</span>
                    <span className="text-[9px] text-gray-500 font-medium">mssistemas.com.br</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}


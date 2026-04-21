import { LayoutDashboard, FileText, Cross, HeartPulse, ArrowUpRight, Plus, ExternalLink, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    falecidos: 0,
    medicos: 0
  });

  useEffect(() => {
    async function loadStats() {
      const [{ count: postsCount }, { count: falecidosCount }, { count: medicosCount }] = await Promise.all([
        supabase.from('funsa_posts').select('*', { count: 'exact', head: true }),
        supabase.from('funsa_falecidos').select('*', { count: 'exact', head: true }),
        supabase.from('funsa_medicos').select('*', { count: 'exact', head: true })
      ]);

      setStats({
        posts: postsCount || 0,
        falecidos: falecidosCount || 0,
        medicos: medicosCount || 0,
      });
    }
    loadStats();
  }, []);

  const cards = [
    { 
      title: "Artigos no Blog", 
      value: stats.posts, 
      icon: FileText, 
      path: "/admin/blog",
      color: "bg-blue-500",
      description: "Conteúdo educativo e informativo."
    },
    { 
      title: "Registros de Obituário", 
      value: stats.falecidos, 
      icon: Cross, 
      path: "/admin/falecidos",
      color: "bg-amber-500",
      description: "Homenagens e informativos de luto."
    },
    { 
      title: "Médicos Conveniados", 
      value: stats.medicos, 
      icon: HeartPulse, 
      path: "/admin/medicos",
      color: "bg-emerald-500",
      description: "Rede credenciada PrevSaúde."
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header with Welcome and Date */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Olá, Administrador</h1>
          <p className="text-gray-500 mt-1">Bem-vindo de volta ao portal de gestão FUNSA.</p>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm text-sm text-gray-600">
          <CalendarIcon className="w-4 h-4 text-azure" />
          {new Intl.DateTimeFormat('pt-BR', { dateStyle: 'full' }).format(new Date())}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={c.path} className="admin-card p-6 block group">
              <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl ${c.color} bg-opacity-10 flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  <c.icon className={`w-7 h-7 ${c.color.replace('bg-', 'text-')}`} />
                </div>
                <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-azure transition-colors" />
              </div>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{c.title}</p>
              <h3 className="text-4xl font-bold text-navy mt-1 tracking-tight">{c.value}</h3>
              <p className="text-xs text-gray-400 mt-4 leading-relaxed">{c.description}</p>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Quick Actions & Info */}
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="admin-card p-8 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <LayoutDashboard className="w-32 h-32 text-navy" />
          </div>
          
          <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
            Acesso Rápido
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Utilize o menu lateral para gerenciar os conteúdos do site. Quaisquer alterações realizadas no blog, tabela de falecimentos ou no catálogo de médicos serão refletidas instantaneamente no site principal.
          </p>
          
          <div className="grid grid-cols-2 gap-3">
            <Link to="/admin/blog" className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-azure/5 hover:text-azure transition-all text-sm font-medium border border-transparent hover:border-azure/20 group">
              <Plus className="w-4 h-4" /> Novo Post
            </Link>
            <Link to="/admin/falecidos" className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-azure/5 hover:text-azure transition-all text-sm font-medium border border-transparent hover:border-azure/20">
              <Plus className="w-4 h-4" /> Novo Obituário
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-navy text-white p-8 rounded-2xl shadow-xl shadow-navy/20 relative overflow-hidden group"
        >
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-azure/20 rounded-full blur-[80px]" />
          
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            Links Externos
          </h3>
          <div className="space-y-4 relative z-10">
            <a href="https://funsa.com.br" target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-sm">Ver Site Principal</span>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>
            <a href="https://apps.mssistemas.com.br/areacliente.php/?codigo=136" target="_blank" className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <span className="text-sm">Área do Cliente (MS Sistemas)</span>
              <ExternalLink className="w-4 h-4 opacity-50" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

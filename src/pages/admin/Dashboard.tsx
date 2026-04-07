import { LayoutDashboard, FileText, Cross, HeartPulse } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Dashboard() {
  const [stats, setStats] = useState({
    posts: 0,
    falecidos: 0,
    medicos: 0
  });

  useEffect(() => {
    async function loadStats() {
      const [{ count: postsCount }, { count: falecidosCount }, { count: medicosCount }] = await Promise.all([
        supabase.from('posts').select('*', { count: 'exact', head: true }),
        supabase.from('falecidos').select('*', { count: 'exact', head: true }),
        supabase.from('medicos').select('*', { count: 'exact', head: true })
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
    { title: "Artigos no Blog", value: stats.posts, icon: FileText, color: "text-[#2271b1]" },
    { title: "Registros de Obituário", value: stats.falecidos, icon: Cross, color: "text-[#1d2327]" },
    { title: "Médicos Conveniados", value: stats.medicos, icon: HeartPulse, color: "text-[#2271b1]" },
  ];

  return (
    <div>
      <h1 className="text-[23px] font-normal text-[#1d2327] mb-4">Painel</h1>

      <div className="grid md:grid-cols-3 gap-5">
        {cards.map((c, i) => (
          <div key={i} className="bg-white p-5 border border-[#c3c4c7] flex items-center gap-4 hover:border-[#8c8f94] transition-colors" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className={`w-12 h-12 flex items-center justify-center ${c.color}`}>
              <c.icon className="w-8 h-8" />
            </div>
            <div>
              <p className="text-[14px] font-medium text-[#3c434a]">{c.title}</p>
              <h3 className="text-2xl font-semibold text-[#1d2327] mt-1">{c.value}</h3>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-white p-5 border border-[#c3c4c7]">
        <h3 className="text-[14px] font-semibold text-[#1d2327] mb-2">Acesso Rápido</h3>
        <p className="text-[13px] text-[#3c434a] leading-relaxed">
          Utilize o menu lateral para gerenciar os conteúdos do site. Quaisquer alterações realizadas no blog, tabela de falecimentos ou no catálogo de médicos serão refletidas instantaneamente no site principal.
        </p>
      </div>
    </div>
  );
}

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function GlobalScripts() {
  useEffect(() => {
    async function loadScripts() {
      const { data, error } = await supabase
        .from('funsa_site_integracoes')
        .select('head_code, body_code')
        .eq('status', true);
      
      if (error || !data || data.length === 0) return;

      data.forEach(integracao => {
        // Injetar no Head
        if (integracao.head_code && integracao.head_code.trim() !== '') {
          try {
            const headFragment = document.createRange().createContextualFragment(integracao.head_code);
            document.head.appendChild(headFragment);
          } catch (e) {
            console.error("Erro ao injetar scripts no Head:", e);
          }
        }

        // Injetar no Body
        if (integracao.body_code && integracao.body_code.trim() !== '') {
          try {
            const bodyFragment = document.createRange().createContextualFragment(integracao.body_code);
            document.body.appendChild(bodyFragment);
          } catch (e) {
            console.error("Erro ao injetar scripts no Body:", e);
          }
        }
      });
    }

    loadScripts();
  }, []);

  // Um componente invisível
  return null;
}

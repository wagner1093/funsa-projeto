import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface SiteConfig {
  favicon_url: string;
  logo_url?: string;
  cor_primaria?: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  email: string;
  instagram_url: string;
  facebook_url: string;
  site_name?: string;
  site_description?: string;
}

interface SiteContextType {
  config: SiteConfig | null;
  loading: boolean;
}

const SiteContext = createContext<SiteContextType>({ config: null, loading: true });

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        console.log('Iniciando carregamento das configurações do site...');
        const { data, error } = await supabase
          .from('funsa_site_config')
          .select('*')
          .limit(1)
          .single();

        if (error) {
          console.error('Erro na consulta Supabase:', error);
          throw error;
        }
        
        console.log('Configurações carregadas com sucesso:', data);
        setConfig(data);
        
        // Aplica o favicon globalmente
        if (data?.favicon_url) {
          const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
          if (link) {
            link.href = data.favicon_url;
          } else {
            const newLink = document.createElement('link');
            newLink.rel = 'icon';
            newLink.href = data.favicon_url;
            document.head.appendChild(newLink);
          }
        }

      } catch (err) {
        console.error('Erro ao carregar configurações do site:', err);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  return (
    <SiteContext.Provider value={{ config, loading }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}

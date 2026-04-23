import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type SiteConfig = {
  site_name: string;
  site_description: string;
  favicon_url: string;
  telefone: string;
  whatsapp: string;
  endereco: string;
  email: string;
  instagram_url: string;
  facebook_url: string;
};

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const { data, error } = await supabase
          .from('funsa_site_config')
          .select('*')
          .eq('id', 1)
          .single();

        if (data && !error) {
          setConfig({
            site_name: data.site_name || '',
            site_description: data.site_description || '',
            favicon_url: data.favicon_url || '',
            telefone: data.telefone || '',
            whatsapp: data.whatsapp || '',
            endereco: data.endereco || '',
            email: data.email || '',
            instagram_url: data.instagram_url || '',
            facebook_url: data.facebook_url || '',
          });
        }
      } catch (err) {
        console.error('Error loading site config:', err);
      } finally {
        setLoading(false);
      }
    }

    loadConfig();
  }, []);

  return { config, loading };
}

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export function SeoProvider() {
  useEffect(() => {
    async function loadSeo() {
      const { data, error } = await supabase
        .from('site_config')
        .select('site_name, site_description, favicon_url')
        .eq('id', 1)
        .single();
      
      if (error || !data) return;

      // Update Title
      if (data.site_name) {
        document.title = data.site_name;
      }

      // Update Meta Description
      if (data.site_description) {
        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
          metaDescription = document.createElement('meta');
          metaDescription.setAttribute('name', 'description');
          document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', data.site_description);
      }

      // Update Favicon
      if (data.favicon_url) {
        let linkIcon = document.querySelector('link[rel="icon"]') || document.querySelector('link[rel="shortcut icon"]');
        if (!linkIcon) {
          linkIcon = document.createElement('link');
          linkIcon.setAttribute('rel', 'icon');
          document.head.appendChild(linkIcon);
        }
        linkIcon.setAttribute('href', data.favicon_url);
      }
    }

    loadSeo();
  }, []);

  return null;
}

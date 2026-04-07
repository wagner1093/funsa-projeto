import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const [siteName, setSiteName] = useState('');
  const [siteDescription, setSiteDescription] = useState('');
  const [faviconUrl, setFaviconUrl] = useState('');
  const [uploadingFavicon, setUploadingFavicon] = useState(false);

  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [endereco, setEndereco] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [facebook, setFacebook] = useState('');

  async function handleFaviconUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    setUploadingFavicon(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `favicon-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage.from('site-assets').upload(fileName, file);

    if (uploadError) {
      toast({ title: 'Erro ao fazer upload da imagem', variant: 'destructive' });
      setUploadingFavicon(false);
      return;
    }

    const { data } = supabase.storage.from('site-assets').getPublicUrl(fileName);
    setFaviconUrl(data.publicUrl);
    setUploadingFavicon(false);
    toast({ title: 'Upload concluído. Clique em Salvar Alterações.' });
  }

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('site_config').select('*').eq('id', 1).single();
      if (data) {
        setSiteName(data.site_name || '');
        setSiteDescription(data.site_description || '');
        setFaviconUrl(data.favicon_url || '');

        setTelefone(data.telefone);
        setWhatsapp(data.whatsapp);
        setEndereco(data.endereco);
        setEmail(data.email || '');
        setInstagram(data.instagram_url || '');
        setFacebook(data.facebook_url || '');
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from('site_config').update({
      site_name: siteName,
      site_description: siteDescription,
      favicon_url: faviconUrl,
      telefone, whatsapp, endereco, email, instagram_url: instagram, facebook_url: facebook
    }).eq('id', 1);

    if (error) toast({ title: 'Erro ao salvar configurações', variant: 'destructive' });
    else toast({ title: 'Configurações salvas' });
    
    setLoading(false);
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-[23px] font-normal text-[#1d2327]">Configurações Gerais</h1>
      </div>

      <form onSubmit={handleSave}>
        
        {/* Bloco de SEO e Identidade */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 mb-6">
          <h2 className="text-[16px] font-semibold text-[#1d2327] mb-4 border-b border-[#f0f0f1] pb-2">Identidade Visual e SEO</h2>
          {loading ? <p className="text-[#3c434a]">Carregando...</p> : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Nome do Site (Título da Aba)</label>
                  <p className="text-[12px] text-[#8c8f94] mb-2">Aparece na aba do navegador e no título do Google.</p>
                  <Input value={siteName} onChange={e => setSiteName(e.target.value)} placeholder="Ex: Funsa - Funerária em Avaré" className="h-8 w-full border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
                
                <div>
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Favicon (Ícone Menor do Site)</label>
                  <p className="text-[12px] text-[#8c8f94] mb-2">Envie uma imagem PNG ou JPG pequena e quadrada (ex: 512x512).</p>
                  
                  <div className="flex items-center gap-4">
                    {faviconUrl && (
                      <div className="w-10 h-10 border border-[#c3c4c7] rounded-sm flex-shrink-0 overflow-hidden bg-[#f0f0f1] flex items-center justify-center">
                        <img src={faviconUrl} alt="Favicon" className="w-full h-full object-cover" />
                      </div>
                    )}
                    <label className="cursor-pointer relative overflow-hidden px-4 py-1.5 border border-[#2271b1] text-[#2271b1] text-[13px] font-medium rounded-sm hover:bg-[#f6f7f7] transition-colors flex-1 text-center">
                      {uploadingFavicon ? 'Enviando...' : 'Fazer Upload do Ícone'}
                      <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/x-icon" 
                        onChange={handleFaviconUpload}
                        disabled={uploadingFavicon}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Descrição do Site (Meta Description)</label>
                  <p className="text-[12px] text-[#8c8f94] mb-2">Resumo de 1 a 2 frases para aparecer abaixo do link no Google.</p>
                  <textarea 
                    value={siteDescription} 
                    onChange={e => setSiteDescription(e.target.value)}
                    className="w-full h-20 p-2 text-[13px] text-gray-800 bg-white border border-[#8c8f94] rounded-sm focus:ring-1 focus:ring-[#2271b1] outline-none"
                    placeholder="Sua melhor escolha em atendimento funerário e preventivo em toda região de Avaré."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bloco de Contatos */}
        <div className="bg-white border border-[#c3c4c7] rounded-sm p-6 mb-6">
          <h2 className="text-[16px] font-semibold text-[#1d2327] mb-4 border-b border-[#f0f0f1] pb-2">Contatos e Redes Sociais</h2>
          {loading ? <p className="text-[#3c434a]">Carregando...</p> : (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                <div>
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Telefone Fixo</label>
                  <Input required value={telefone} onChange={e => setTelefone(e.target.value)} className="h-8 w-full max-w-sm border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">WhatsApp</label>
                  <Input required value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="h-8 w-full max-w-sm border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Endereço Completo</label>
                  <Input required value={endereco} onChange={e => setEndereco(e.target.value)} className="h-8 w-full border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Email de Contato</label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} className="h-8 w-full max-w-sm border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Link do Instagram</label>
                  <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://instagram.com/..." className="h-8 w-full border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
                <div>
                  <label className="block text-[14px] font-semibold text-[#1d2327] mb-1">Link do Facebook</label>
                  <Input value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://facebook.com/..." className="h-8 w-full border-[#8c8f94] rounded-sm text-[13px] focus-visible:ring-[#2271b1]" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-start">
            <button type="submit" disabled={loading} className="px-4 py-1.5 bg-[#2271b1] text-white font-medium rounded-sm hover:bg-[#135e96] focus:ring-2 focus:ring-[#2271b1] focus:ring-offset-1 flex items-center text-[13px]">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </button>
        </div>
      </form>
    </div>
  );
}

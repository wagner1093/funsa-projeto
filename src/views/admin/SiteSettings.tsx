'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Save, Shield, Globe, MessageSquare, MapPin, Instagram, 
  Facebook, Mail, Phone, UploadCloud, CheckCircle2, Settings,
  ChevronRight, X, Info, ExternalLink, RefreshCw
} from 'lucide-react';
import { motion } from "framer-motion";

export default function SiteSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
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
    toast({ title: 'Ícone enviado com sucesso!', description: 'Não esqueça de salvar as alterações.' });
  }

  useEffect(() => {
    async function load() {
      try {
        const { data, error } = await supabase.from('funsa_site_config').select('*').eq('id', 1).single();
        if (error) throw error;
        if (data) {
          setSiteName(data.site_name || '');
          setSiteDescription(data.site_description || '');
          setFaviconUrl(data.favicon_url || '');
          setTelefone(data.telefone || '');
          setEndereco(data.endereco || '');
          setInstagram(data.instagram_url || data.instagram || '');
          setFacebook(data.facebook_url || data.facebook || '');
          setWhatsapp(data.whatsapp || '');
          setEmail(data.email || '');
        }
      } catch (err) {
        console.error("Erro ao carregar configuracoes", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSave() {
    setSaving(true);
    try {
      const { error } = await supabase.from('funsa_site_config').upsert({
        id: 1,
        site_name: siteName,
        site_description: siteDescription,
        favicon_url: faviconUrl,
        telefone, 
        endereco,
        instagram_url: instagram,
        facebook_url: facebook,
        whatsapp,
        email
      });

      if (error) throw error;
      toast({ title: 'Configurações atualizadas!', description: 'As mudanças já estão no ar.' });
    } catch(err: any) {
      toast({ title: 'Erro ao salvar configurações', description: err?.message, variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
     return (
       <div className="flex flex-col items-center justify-center p-20 opacity-40">
         <div className="w-8 h-8 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
         <span className="text-xs font-semibold text-gray-500 mt-3">Sincronizando ambiente...</span>
       </div>
     );
  }

  return (
    <div className="max-w-6xl space-y-8 pb-20">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="admin-page-title flex items-center gap-2.5">
            <Settings className="w-5 h-5 text-gray-400" />
            Configurações Institucionais
          </h1>
          <p className="text-xs text-gray-400 font-medium mt-0.5 ml-7.5">Gerencie a identidade visual e informações de contato global.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            className="rounded-xl px-4 h-11 transition-all flex items-center gap-2 font-bold text-xs text-gray-400 hover:text-gray-600"
            onClick={() => window.location.reload()}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Recarregar
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={saving}
            className="bg-gray-900 hover:bg-gray-700 text-white rounded-xl px-6 h-11 shadow-xl shadow-black/5 transition-all flex items-center gap-2 font-bold text-xs"
          >
            {saving ? (
              <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Salvando...</>
            ) : (
              <><Save className="w-3.5 h-3.5" /> Salvar Alterações</>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-8">
          {/* Identity Card */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">Identidade & SEO</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Como o site aparece nos buscadores</p>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Título do Website</label>
                <Input 
                  value={siteName} 
                  onChange={e => setSiteName(e.target.value)} 
                  placeholder="Ex: Rede Funsa - Planos de Assistência Familiar" 
                  className="h-12 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-medium focus-visible:ring-gray-200" 
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Descrição para Google (SEO)</label>
                <textarea 
                  value={siteDescription} 
                  onChange={e => setSiteDescription(e.target.value)}
                  className="w-full min-h-[120px] p-4 text-sm text-gray-600 bg-gray-50/50 border border-gray-100 rounded-2xl focus:ring-1 focus:ring-gray-200 outline-none transition-all leading-relaxed font-medium"
                  placeholder="Escreva um resumo para os motores de busca..."
                />
              </div>
            </div>
          </section>

          {/* Contact & Social Card */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8">
            <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
              <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-800">Canais de Atendimento</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Informações de contato e redes sociais</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Telefone Principal</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input value={telefone} onChange={e => setTelefone(e.target.value)} placeholder="(00) 0000-0000" className="h-12 pl-10 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-medium focus-visible:ring-gray-200" />
                  </div>
               </div>

               <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">WhatsApp Oficial</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="(00) 00000-0000" className="h-12 pl-10 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-medium focus-visible:ring-gray-200" />
                  </div>
               </div>

               <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">E-mail Corporativo</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="contato@redefunsa.com.br" className="h-12 pl-10 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-medium focus-visible:ring-gray-200" />
                  </div>
               </div>

               <div className="md:col-span-2 space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Endereço da Sede</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    <Input value={endereco} onChange={e => setEndereco(e.target.value)} placeholder="Rua exemplo, 123 - Centro, Cidade/UF" className="h-12 pl-10 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-medium focus-visible:ring-gray-200" />
                  </div>
               </div>

               <div className="md:col-span-2 pt-4 flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Instagram className="w-3 h-3 text-pink-400" /> Instagram
                     </label>
                     <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="Username..." className="h-12 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-medium focus-visible:ring-gray-200" />
                  </div>
                  <div className="flex-1 space-y-2">
                     <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2">
                        <Facebook className="w-3 h-3 text-blue-500" /> Facebook
                     </label>
                     <Input value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="URL da página..." className="h-12 border-gray-100 bg-gray-50/50 rounded-xl text-sm font-medium focus-visible:ring-gray-200" />
                  </div>
               </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-8 sticky top-8">
              <div>
                <h3 className="text-sm font-bold text-gray-800">Assets Visuais</h3>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Logotipos e ícones</p>
              </div>
              
              <div className="flex flex-col items-center">
                 <div className="w-36 h-36 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center mb-6 relative group overflow-hidden transition-all hover:border-gray-200 shadow-inner">
                    {faviconUrl ? (
                      <>
                        <img src={faviconUrl} alt="Favicon" className="w-16 h-16 object-contain" />
                        <div className="absolute inset-0 bg-gray-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[2px] cursor-pointer">
                           <UploadCloud className="text-white w-6 h-6" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-300">
                         <Globe className="w-10 h-10 opacity-20" />
                         <span className="text-[10px] font-bold uppercase tracking-widest">Sem favicon</span>
                      </div>
                    )}
                 </div>

                 <div className="w-full relative">
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-100 bg-gray-50 rounded-xl h-12 text-[10px] font-bold text-gray-600 hover:bg-white hover:border-gray-200 uppercase tracking-widest shadow-sm transition-all"
                    >
                       {uploadingFavicon ? 'Processando...' : 'Alterar Ícone'}
                    </Button>
                    <input 
                       type="file" 
                       accept="image/*" 
                       onChange={handleFaviconUpload}
                       disabled={uploadingFavicon}
                       className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                 </div>
                 
                 <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 flex gap-3 items-start">
                    <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-blue-600 leading-relaxed font-medium">
                      O **Favicon** é o ícone que aparece na aba do navegador. Use formatos PNG ou ICO de 512px.
                    </p>
                 </div>
              </div>

              <div className="pt-8 border-t border-gray-50 space-y-4">
                 <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Status SEO</span>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                       <CheckCircle2 className="w-2.5 h-2.5" /> Otimizado
                    </span>
                 </div>
                 <Button 
                    variant="ghost" 
                    className="w-full justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600"
                    onClick={() => window.open('/', '_blank')}
                  >
                    Ver site público <ExternalLink className="w-3.5 h-3.5" />
                 </Button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}


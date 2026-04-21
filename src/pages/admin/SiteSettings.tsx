import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Save, Shield, Globe, MessageSquare, MapPin, Instagram, Facebook, Mail, Phone, UploadCloud, CheckCircle2, Settings } from 'lucide-react';
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
      const { data } = await supabase.from('funsa_site_config').select('*').eq('id', 1).single();
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
    setSaving(true);
    const { error } = await supabase.from('funsa_site_config').update({
      site_name: siteName,
      site_description: siteDescription,
      favicon_url: faviconUrl,
      telefone, whatsapp, endereco, email, instagram_url: instagram, facebook_url: facebook
    }).eq('id', 1);

    if (error) toast({ title: 'Erro ao salvar configurações', variant: 'destructive' });
    else toast({ title: 'Configurações atualizadas!', description: 'As mudanças já estão no ar.' });
    
    setSaving(false);
  }

  if (loading) {
     return <div className="p-20 text-center text-gray-400 font-medium">Sincronizando configurações...</div>;
  }

  return (
    <div className="max-w-5xl space-y-8 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h1 className="text-2xl font-bold text-navy flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Settings className="w-6 h-6 text-navy" />
             </div>
             Configurações Gerais
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gerencie a identidade visual e informações de contato da Rede FUNSA.</p>
        </motion.div>
        
        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="bg-navy hover:bg-black text-white rounded-xl px-8 py-6 shadow-lg transition-all flex items-center gap-2 font-bold"
        >
          {saving ? 'Salvando...' : <><Save className="w-5 h-5" /> Salvar Alterações</>}
        </Button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-12">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Identidade & SEO</h3>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="admin-card p-8 space-y-6"
          >
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-navy mb-2">
                   <Globe className="w-4 h-4 text-azure" />
                   <span className="text-sm font-bold">Presença Online</span>
                </div>
                
                <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Título do Site (SEO)</label>
                   <Input 
                      value={siteName} 
                      onChange={e => setSiteName(e.target.value)} 
                      placeholder="Ex: Funsa - Atendimento Humanizado" 
                      className="h-12 border-gray-200 rounded-xl text-navy font-medium mt-2 focus-visible:ring-azure" 
                   />
                </div>

                <div>
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Descrição para o Google</label>
                   <textarea 
                      value={siteDescription} 
                      onChange={e => setSiteDescription(e.target.value)}
                      className="w-full min-h-[120px] p-4 text-sm text-navy bg-white border border-gray-200 rounded-xl focus:ring-1 focus:ring-azure outline-none transition-all mt-2 leading-relaxed"
                      placeholder="Descreva a Funsa para os buscadores..."
                   />
                </div>
            </div>
          </motion.div>

          <div className="lg:col-span-12 pt-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Contatos e Presença Local</h3>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="admin-card p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
             <div className="md:col-span-2 flex items-center gap-2 text-navy mb-2">
                <Shield className="w-4 h-4 text-azure" />
                <span className="text-sm font-bold">Informações Institucionais</span>
             </div>

             <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Telefone Fixo</label>
                <div className="relative mt-2">
                   <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                   <Input value={telefone} onChange={e => setTelefone(e.target.value)} className="h-12 pl-12 border-gray-200 rounded-xl text-navy focus-visible:ring-azure" />
                </div>
             </div>

             <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">WhatsApp de Atendimento</label>
                <div className="relative mt-2">
                   <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                   <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="h-12 pl-12 border-gray-200 rounded-xl text-navy focus-visible:ring-azure" />
                </div>
             </div>

             <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">E-mail Corporativo</label>
                <div className="relative mt-2">
                   <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                   <Input value={email} onChange={e => setEmail(e.target.value)} className="h-12 pl-12 border-gray-200 rounded-xl text-navy focus-visible:ring-azure" />
                </div>
             </div>

             <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Endereço da Sede</label>
                <div className="relative mt-2">
                   <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                   <Input value={endereco} onChange={e => setEndereco(e.target.value)} className="h-12 pl-12 border-gray-200 rounded-xl text-navy focus-visible:ring-azure" />
                </div>
             </div>

             <div className="md:col-span-2 pt-4 border-t border-gray-50 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2 mb-2">
                      <Instagram className="w-3 h-3" /> Instagram
                   </label>
                   <Input value={instagram} onChange={e => setInstagram(e.target.value)} placeholder="https://..." className="h-12 border-gray-200 rounded-xl text-navy focus-visible:ring-azure" />
                </div>
                <div className="flex-1">
                   <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 flex items-center gap-2 mb-2">
                      <Facebook className="w-3 h-3" /> Facebook
                   </label>
                   <Input value={facebook} onChange={e => setFacebook(e.target.value)} placeholder="https://..." className="h-12 border-gray-200 rounded-xl text-navy focus-visible:ring-azure" />
                </div>
             </div>
          </motion.div>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <motion.div 
             initial={{ opacity: 0, x: 20 }} 
             animate={{ opacity: 1, x: 0 }}
             className="admin-card p-8 space-y-6"
           >
              <h3 className="text-sm font-bold text-navy">Ícone do Navegador</h3>
              
              <div className="flex flex-col items-center">
                 <div className="w-32 h-32 rounded-3xl bg-gray-50 border-2 border-dashed border-gray-100 flex items-center justify-center mb-6 relative group overflow-hidden">
                    {faviconUrl ? (
                      <>
                        <img src={faviconUrl} alt="Favicon" className="w-16 h-16 object-contain" />
                        <div className="absolute inset-0 bg-navy/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm cursor-pointer">
                           <UploadCloud className="text-white w-6 h-6" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-gray-300">
                         <Globe className="w-10 h-10" />
                         <span className="text-[10px] font-bold uppercase tracking-tighter">Sem ícone</span>
                      </div>
                    )}
                 </div>

                 <Button 
                   variant="outline" 
                   className="w-full relative overflow-hidden border-gray-200 rounded-xl h-12 text-xs font-bold text-navy hover:bg-gray-50 uppercase tracking-widest"
                 >
                    {uploadingFavicon ? 'Processando...' : 'Alterar Favicon'}
                    <input 
                       type="file" 
                       accept="image/*" 
                       onChange={handleFaviconUpload}
                       disabled={uploadingFavicon}
                       className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                 </Button>
                 
                 <p className="text-[10px] text-gray-400 text-center mt-4 leading-relaxed font-medium">Recomendado: 512x512px<br/>Formato PNG ou ICO para melhor compatibilidade.</p>
              </div>

              <div className="pt-6 border-t border-gray-50">
                 <div className="bg-emerald-50 rounded-2xl p-4 flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                       <h4 className="text-xs font-bold text-emerald-800">SEO Ativo</h4>
                       <p className="text-[10px] text-emerald-600 mt-0.5 leading-relaxed">Suas metatags estão sendo indexadas corretamente pelos motores de busca.</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      </form>
    </div>
  );
}

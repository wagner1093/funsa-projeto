'use client';

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const galleryImages = [
  {
    src: "/assets/galeria/galeria-01.webp",
    alt: "Infraestrutura acolhedora do Cemitério e Crematório FUNSA",
    title: "Nosso Espaço",
    description: "Ambiente sereno e acolhedor."
  },
  {
    src: "/assets/galeria/galeria-02.webp",
    alt: "Fachada moderna do Grupo FUNSA",
    title: "Nossa Estrutura",
    description: "Atendimento presencial 24 horas."
  },
  {
    src: "/assets/galeria/galeria-03.webp",
    alt: "Recepção e atendimento FUNSA",
    title: "Recepção",
    description: "Espaço humanizado para acolher sua família."
  },
  {
    src: "/assets/galeria/galeria-04.webp",
    alt: "Sala de tanatopraxia",
    title: "Laboratório Próprio",
    description: "Preparação humanizada e profissional."
  },
  {
    src: "/assets/galeria/galeria-05.webp",
    alt: "Frota de veículos fúnebres novos e executivos FUNSA",
    title: "Frota Executiva",
    description: "Veículos modernos para maior segurança e conforto."
  },
  {
    src: "/assets/galeria/galeria-06.webp",
    alt: "Escritório de atendimento e planos funerários",
    title: "Atendimento",
    description: "Nossa equipe está pronta para orientar você."
  },
  {
    src: "/assets/galeria/galeria-07.webp",
    alt: "Showroom de urnas funerárias de alto padrão",
    title: "Showroom",
    description: "Diversas opções para uma última homenagem digna."
  }
];

export default function GallerySection() {
  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
            <span className="text-sm font-semibold text-azure uppercase tracking-widest">Nossa Estrutura</span>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Conheça nossas instalações e serviços
            </h2>
            <p className="mt-4 text-muted-foreground text-base leading-relaxed">
              Ambientes preparados com todo o cuidado e respeito para acolher sua família nos momentos em que você mais precisa.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 grid-flow-dense">
          {galleryImages.map((img, i) => {
            // Imagens 0 e 4 são mais largas e ocuparão 2 colunas em telas maiores
            const isWide = i === 0 || i === 4;
            const spanClass = isWide ? "md:col-span-2" : "col-span-1";
            
            return (
              <ScrollReveal 
                key={i} 
                delay={i * 0.1}
                className={`${spanClass} h-64 md:h-72 lg:h-80 rounded-2xl overflow-hidden group relative`}
              >
                <div className="w-full h-full relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={img.src} 
                    alt={img.alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                    <p className="text-white font-medium text-sm md:text-base translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {img.alt}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

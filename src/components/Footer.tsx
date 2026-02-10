import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary py-12">
      <div className="section-container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <span className="text-xl font-serif font-bold text-primary-foreground">FUNSA</span>
            <p className="mt-2 text-sm text-primary-foreground/60 leading-relaxed">
              Funerária Nossa Senhora Aparecida. Desde 1943 cuidando de quem você ama.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3">Contato</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> (14) 3732-0202</div>
              <div className="flex items-center gap-2"><Phone className="w-4 h-4" /> (14) 99779-2932</div>
              <div className="flex items-center gap-2"><Mail className="w-4 h-4" /> contato@funsaavare.com.br</div>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3">Endereço</h4>
            <div className="flex items-start gap-2 text-sm text-primary-foreground/60">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Rua Piauí, 1.467 – Centro, Avaré/SP</span>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} FUNSA – Funerária Nossa Senhora Aparecida. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}

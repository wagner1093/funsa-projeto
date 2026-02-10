import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/5514997792932"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: "spring" }}
      aria-label="Fale conosco pelo WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  );
}

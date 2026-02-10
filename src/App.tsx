import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Servicos from "./pages/Servicos";
import Beneficios from "./pages/Beneficios";
import Plano from "./pages/Plano";
import Aplicativo from "./pages/Aplicativo";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/quem-somos" element={<Layout><QuemSomos /></Layout>} />
          <Route path="/servicos" element={<Layout><Servicos /></Layout>} />
          <Route path="/beneficios" element={<Layout><Beneficios /></Layout>} />
          <Route path="/plano" element={<Layout><Plano /></Layout>} />
          <Route path="/aplicativo" element={<Layout><Aplicativo /></Layout>} />
          <Route path="/contato" element={<Layout><Contato /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

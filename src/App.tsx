import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/AuthContext";
import PrivateRoute from "@/components/PrivateRoute";
import Layout from "@/components/Layout";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Servicos from "./pages/Servicos";
import Beneficios from "./pages/Beneficios";
import Plano from "./pages/Plano";
import Funeraria from "./pages/Funeraria";
import Falecidos from "./pages/Falecidos";
import PrevSaude from "./pages/PrevSaude";
import ClubeFunsa from "./pages/ClubeFunsa";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Aplicativo from "./pages/Aplicativo";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

import Login from "./pages/admin/Login";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ManagePosts from "./pages/admin/ManagePosts";
import ManageFalecidos from "./pages/admin/ManageFalecidos";
import ManageMedicos from "./pages/admin/ManageMedicos";
import ManageIntegrations from "./pages/admin/ManageIntegrations";
import SiteSettings from "./pages/admin/SiteSettings";
import { GlobalScripts } from "./components/GlobalScripts";
import { SeoProvider } from "./components/SeoProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <SeoProvider />
        <GlobalScripts />
        <BrowserRouter>
          <Routes>
            {/* Rotas Públicas */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/quem-somos" element={<Layout><QuemSomos /></Layout>} />
            <Route path="/servicos" element={<Layout><Servicos /></Layout>} />
            <Route path="/beneficios" element={<Layout><Beneficios /></Layout>} />
            <Route path="/plano" element={<Layout><Plano /></Layout>} />
            <Route path="/funeraria" element={<Layout><Funeraria /></Layout>} />
            <Route path="/falecidos" element={<Layout><Falecidos /></Layout>} />
            <Route path="/prevsaude" element={<Layout><PrevSaude /></Layout>} />
            <Route path="/clube" element={<Layout><ClubeFunsa /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:id" element={<Layout><BlogPost /></Layout>} />
            <Route path="/aplicativo" element={<Layout><Aplicativo /></Layout>} />
            <Route path="/contato" element={<Layout><Contato /></Layout>} />
            <Route path="*" element={<NotFound />} />

            {/* Rotas de Autenticação */}
            <Route path="/admin/login" element={<Login />} />

            {/* Rotas Privadas (Admin) */}
            <Route path="/admin" element={<PrivateRoute />}>
              <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="blog" element={<ManagePosts />} />
                <Route path="falecidos" element={<ManageFalecidos />} />
                <Route path="medicos" element={<ManageMedicos />} />
                <Route path="integracoes" element={<ManageIntegrations />} />
                <Route path="configuracoes" element={<SiteSettings />} />
              </Route>
            </Route>

          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

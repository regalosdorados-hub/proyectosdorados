
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BacheroPage from "./pages/BacheroPage";
import TelaPage from "./pages/TelaPage";
import PeluqueriaPage from "./pages/PeluqueriaPage";
import VeterinariaPage from "./pages/VeterinariaPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/delantales-bachero" element={<BacheroPage />} />
          <Route path="/delantales-tela" element={<TelaPage />} />
          <Route path="/delantales-peluqueria" element={<PeluqueriaPage />} />
          <Route path="/delantales-veterinaria" element={<VeterinariaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GastronomicoPage from "./pages/GastronomicoPage";
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
          <Route path="/delantales-gastronomico" element={<GastronomicoPage />} />
          <Route path="/delantales-peluqueria" element={<PeluqueriaPage />} />
          <Route path="/delantales-veterinaria" element={<VeterinariaPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

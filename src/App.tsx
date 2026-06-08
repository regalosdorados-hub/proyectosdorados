import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AuthRecovery from "./pages/AuthRecovery";
import AdminProducts from "./pages/admin/ProductList";
import ProductForm from "./pages/admin/ProductForm";
import OrderList from "./pages/admin/OrderList";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import AdminGuard from "./components/AdminGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/auth/recovery" element={<AuthRecovery />} />
          
          {/* Rutas protegidas de administración */}
          <Route path="/admin/products" element={<AdminGuard><AdminProducts /></AdminGuard>} />
          <Route path="/admin/products/new" element={<AdminGuard><ProductForm /></AdminGuard>} />
          <Route path="/admin/products/:id/edit" element={<AdminGuard><ProductForm /></AdminGuard>} />
          <Route path="/admin/orders" element={<AdminGuard><OrderList /></AdminGuard>} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
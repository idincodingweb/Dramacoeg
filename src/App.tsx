import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// --- CONTEXT & AUTH ---
import { AuthProvider } from "@/context/AuthContext";

// --- KOMPONEN BARU (MESIN IKLAN) ---
import AdInjector from "@/components/AdInjector"; // <--- INI DIA

// --- HALAMAN UTAMA ---
import Index from "./pages/Index";
import DramaDetail from "./pages/DramaDetail";
import Watch from "./pages/Watch";
import Watchlist from "./pages/Watchlist";
import Trending from "./pages/Trending";
import Search from "./pages/Search";
import About from "./pages/About";
import Category from "./pages/Category";
import Info from "./pages/Info";

// --- HALAMAN BARU (FITUR VIP & INBOX) ---
import Login from "./pages/Login";
import VipOffer from "./pages/VipOffer";
import PaymentReport from "./pages/PaymentReport";
import Inbox from "./pages/Inbox";

// import InstallPrompt from "./components/InstallPrompt"; 

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
      <AuthProvider>
        <BrowserRouter>
          {/* <InstallPrompt /> */}
          
          {/* --- PASANG MESIN IKLAN DISINI --- */}
          {/* Dia akan stand by menyuntikkan iklan ke semua halaman */}
          <AdInjector /> 
          {/* --------------------------------- */}

          <Routes>
            {/* Route Utama */}
            <Route path="/" element={<Index />} />
            
            {/* Route Fitur VIP & Login */}
            <Route path="/login" element={<Login />} />
            <Route path="/vip-offer" element={<VipOffer />} />
            <Route path="/payment-report" element={<PaymentReport />} />
            
            {/* Route Inbox */}
            <Route path="/inbox" element={<Inbox />} />

            {/* Route Detail & Nonton */}
            <Route path="/detail/:bookId" element={<DramaDetail />} />
            <Route path="/watch/:bookId/:episodeNum" element={<Watch />} />
            
            {/* Route Lainnya */}
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/category/:tagName" element={<Category />} />
            <Route path="/info" element={<Info />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
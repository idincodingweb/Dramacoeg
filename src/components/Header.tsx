import { Link } from "react-router-dom";
import { Search, Heart, User, LogIn, Menu } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // Pastikan path ini sesuai project lo

export const Header = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* 1. LOGO (Kiri) */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
              <span className="font-bold text-white text-lg">D</span>
            </div>
            <span className="font-bold text-xl tracking-tight text-white group-hover:text-pink-500 transition-colors">
              Drama<span className="text-pink-500">ID</span>
            </span>
          </Link>
        </div>

        {/* 2. MENU TENGAH (Desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/search" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Cari Drama
          </Link>
          <Link to="/info" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Tutorial
          </Link>
        </nav>

        {/* 3. BAGIAN KANAN (Search, Donate, Profile) */}
        <div className="flex items-center gap-3">
          
          {/* Tombol Search Mobile/Desktop */}
          <Link to="/search">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
              <Search className="w-5 h-5" />
            </Button>
          </Link>

          {/* --- TOMBOL DONATE (GANTINYA VIP) --- */}
          {/* Nanti ganti href-nya ke link Saweria/Trakteer lo */}
          <a href="https://saweria.co/username_lo" target="_blank" rel="noopener noreferrer">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-9 px-4 rounded-full shadow-lg shadow-yellow-500/20 flex items-center gap-2 transition-all hover:scale-105">
              <Heart className="w-4 h-4 fill-black" />
              <span className="hidden sm:inline">DONATE</span>
            </Button>
          </a>

          {/* Profile / Login */}
          {user ? (
            <Link to="/dashboard">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
                   {/* Avatar Placeholder */}
                   <User className="w-4 h-4 text-gray-300" />
                </div>
              </div>
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                <LogIn className="w-4 h-4 mr-2" />
                Masuk
              </Button>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
};

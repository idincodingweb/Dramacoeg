import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, User, LogIn, Bookmark, X } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // State buat Search Bar & Mobile Menu
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic Cari Drama
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false); // Tutup search bar abis cari
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/90 backdrop-blur-md border-b border-white/5 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
          
          {/* 1. LOGO */}
          <div className="flex items-center gap-2 z-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-600 rounded-lg flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <span className="font-bold text-white text-lg">D</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-pink-500 transition-colors hidden sm:block">
                Drama<span className="text-pink-500">ID</span>
              </span>
            </Link>
          </div>

          {/* 2. MENU TENGAH (Desktop) - Watchlist Ada Disini */}
          <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-white hover:text-pink-400 transition-colors">
              Home
            </Link>
            {/* Watchlist Gw Balikin */}
            <Link to="/watchlist" className="text-sm font-medium text-gray-300 hover:text-white hover:text-pink-400 transition-colors flex items-center gap-1">
              <Bookmark className="w-4 h-4" /> Watchlist
            </Link>
            <Link to="/info" className="text-sm font-medium text-gray-300 hover:text-white hover:text-pink-400 transition-colors">
              Tutorial
            </Link>
          </nav>

          {/* 3. BAGIAN KANAN (Search, Donate, Profile) */}
          <div className="flex items-center gap-2 sm:gap-3 z-20">
            
            {/* SEARCH ICON TOGGLE */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`text-gray-300 hover:text-white hover:bg-white/10 ${isSearchOpen ? "bg-white/10 text-pink-500" : ""}`}
            >
              {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>

            {/* WATCHLIST ICON (Mobile Only) */}
            <Link to="/watchlist" className="md:hidden">
              <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white hover:bg-white/10">
                <Bookmark className="w-5 h-5" />
              </Button>
            </Link>

            {/* TOMBOL DONATE */}
            <a href="https://saweria.co/dramaid_official" target="_blank" rel="noopener noreferrer">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold h-8 sm:h-9 px-3 sm:px-4 rounded-full shadow-lg shadow-yellow-500/20 flex items-center gap-2 transition-all hover:scale-105">
                <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-black" />
                <span className="hidden sm:inline text-xs sm:text-sm">DONATE</span>
              </Button>
            </a>

            {/* PROFILE / LOGIN */}
            {user ? (
              <Link to="/dashboard">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 p-[2px] cursor-pointer hover:shadow-purple-500/50 hover:shadow-md transition-all">
                  <div className="w-full h-full rounded-full bg-[#0a0a0c] flex items-center justify-center overflow-hidden">
                     <User className="w-4 h-4 text-gray-300" />
                  </div>
                </div>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white px-2 sm:px-4">
                  <LogIn className="w-4 h-4 sm:mr-2" />
                  <span className="hidden sm:inline">Masuk</span>
                </Button>
              </Link>
            )}

          </div>
        </div>
      </header>

      {/* --- SEARCH BAR OVERLAY (MUNCUL PAS KLIK) --- */}
      <div 
        className={`fixed top-16 left-0 right-0 bg-[#0a0a0c] border-b border-white/10 shadow-2xl z-40 transition-all duration-300 origin-top ${
          isSearchOpen ? "scale-y-100 opacity-100 visible" : "scale-y-0 opacity-0 invisible"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari judul drama, film, atau artis..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen}
              className="w-full bg-[#16161a] border border-white/10 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 placeholder-gray-600 transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
               <span className="text-[10px] text-gray-500 border border-white/5 px-1.5 py-0.5 rounded hidden sm:block">ESC to close</span>
               <span className="text-[10px] text-gray-500 border border-white/5 px-1.5 py-0.5 rounded hidden sm:block">ENTER to search</span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

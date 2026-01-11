import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, Bookmark, Home, TrendingUp, Info, Crown, LogOut, Bell, Megaphone, Smartphone } from "lucide-react"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext"; 

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); 

  // --- GANTI LINK INI DENGAN LINK SFILE LO ---
  const APP_DOWNLOAD_LINK = "https://sfile.mobi/......"; 
  // ------------------------------------------

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
    }
  };

  const navLinks = [
    { to: "/", label: "Beranda", icon: Home },
    { to: "/trending", label: "Trending", icon: TrendingUp },
    { to: "/watchlist", label: "Watchlist", icon: Bookmark },
    { to: "/info", label: "Info", icon: Megaphone }, 
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5">
      <div className="container flex items-center justify-between h-16 gap-4">
        
        {/* --- LOGO AREA --- */}
        <Link to="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-[#16161a] border border-white/10 shadow-2xl transition-transform group-hover:scale-110 active:scale-95">
            <img 
              src="/icon-192x192.png" 
              className="w-full h-full object-contain p-1.5" 
              alt="D" 
            />
          </div>
          <span className="font-display font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 group-hover:from-pink-500 group-hover:to-rose-500 transition-all hidden sm:block">
            DramaID
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search & Menu & VIP ACTION */}
        <div className="flex items-center gap-2">

          {/* --- TOMBOL DOWNLOAD APP (SFILE) - DESKTOP --- */}
          <a href={APP_DOWNLOAD_LINK} target="_blank" rel="noreferrer" className="hidden lg:block">
            <Button variant="outline" className="border-pink-500/30 hover:bg-pink-500/10 text-pink-500 font-bold h-9 px-4 rounded-xl gap-2 mr-1">
              <Smartphone className="w-4 h-4" /> 
              App
            </Button>
          </a>
          {/* --------------------------------------------- */}

          <Link to="/inbox">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5 relative">
                <Bell className="w-5 h-5" />
            </Button>
          </Link>

          {!user?.isVip ? (
            <Link to="/login" className="hidden md:block">
                <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-black font-bold h-9 px-4 rounded-xl gap-2 shadow-lg shadow-yellow-500/20 mr-2 transition-all hover:scale-105">
                    <Crown className="w-4 h-4" /> 
                    Redeem VIP
                </Button>
            </Link>
          ) : (
            <Button 
                onClick={logout}
                variant="ghost" 
                className="hidden md:flex text-red-500 hover:text-red-400 hover:bg-red-500/10 gap-2 h-9 px-3 rounded-xl mr-2"
                title="Keluar dari Akun VIP"
            >
                <LogOut className="w-4 h-4" /> 
            </Button>
          )}

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari drama..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 h-10 bg-white/5 border-white/5 focus:border-pink-500/50 transition-all rounded-xl"
              />
            </div>
          </form>

          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-pink-500"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
          </Button>

          {/* Mobile Menu Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-gray-400">
                <Menu className="w-7 h-7" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-[#0a0a0c] border-white/5 p-0">
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#16161a] border border-white/10">
                      <img src="/icon-192x192.png" className="w-full h-full object-contain p-1.5" alt="D" />
                   </div>
                   <span className="font-bold text-xl tracking-tight">DramaID</span>
                </div>

                <div className="px-4 pt-6 pb-2">
                    {!user?.isVip ? (
                         <Link to="/login">
                             <Button className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold rounded-xl gap-2 h-12 shadow-lg shadow-yellow-500/10">
                                 <Crown className="w-5 h-5" /> REEDEM KODE VIP
                             </Button>
                         </Link>
                    ) : (
                         <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl flex items-center gap-3">
                             <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-black shadow-lg shadow-yellow-500/50">
                                 <Crown size={20} />
                             </div>
                             <div>
                                 <p className="text-xs text-yellow-500 font-bold tracking-widest">STATUS VIP</p>
                                 <p className="text-sm font-bold text-white">Akun Premium Aktif</p>
                             </div>
                         </div>
                    )}
                </div>

                {/* --- TOMBOL DOWNLOAD APP (SFILE) - MOBILE MENU --- */}
                <div className="px-4 mt-2">
                  <a href="https://sfile.mobi/b0XGq7vqMup" target="_blank" rel="noreferrer">
                    <Button className="w-full bg-[#16161a] border border-pink-500/30 text-pink-500 hover:bg-pink-500 hover:text-white font-bold rounded-xl gap-2">
                      <Smartphone className="w-5 h-5" /> UNDUH APLIKASI
                    </Button>
                  </a>
                </div>
                {/* ------------------------------------------------ */}

                <nav className="flex flex-col gap-1 p-4">
                  <Link to="/inbox" className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-bold uppercase text-[10px] tracking-[0.2em]">
                      <Bell className="w-5 h-5 text-pink-500" /> KOTAK MASUK
                  </Link>

                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="flex items-center gap-4 px-4 py-4 rounded-2xl text-gray-400 hover:text-white hover:bg-white/5 transition-all font-bold uppercase text-[10px] tracking-[0.2em]"
                    >
                      <link.icon className="w-5 h-5 text-pink-500" />
                      {link.label}
                    </Link>
                  ))}

                  {user?.isVip && (
                      <button 
                        onClick={() => { logout(); }}
                        className="flex items-center gap-4 px-4 py-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all font-bold uppercase text-[10px] tracking-[0.2em] w-full text-left mt-2 border border-red-500/10"
                      >
                          <LogOut className="w-5 h-5" />
                          KELUAR VIP
                      </button>
                  )}
                </nav>

                <div className="mt-auto p-6 border-t border-white/5 text-center">
                   <p className="text-[10px] text-gray-600 font-bold uppercase tracking-widest">Powered by Idin Code</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {showSearch && (
        <div className="md:hidden border-t border-white/5 p-4 bg-[#0a0a0c]/95 backdrop-blur-xl animate-in slide-in-from-top-2">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Mau nonton apa hari ini?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 bg-white/5 border-white/10 rounded-2xl focus:border-pink-500"
                autoFocus
              />
            </div>
          </form>
        </div>
      )}
    </header>
  );
}

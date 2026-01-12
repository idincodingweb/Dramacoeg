import React from "react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Download, Heart, Zap, Sparkles, CheckCircle2, HelpCircle } from "lucide-react";

const Info = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <main className="pt-24 pb-12 container max-w-4xl mx-auto px-4">
        
        {/* HERO SECTION */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-500/20 animate-pulse">
            <Download className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Pusat Bantuan
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Panduan download video dan informasi fitur DramaID.
          </p>
        </div>

        {/* --- BAGIAN 1: TUTORIAL DOWNLOAD (PRIORITAS UTAMA) --- */}
        <div className="space-y-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">Cara Download Video</h2>
          </div>
          <p className="text-gray-400 mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
            <HelpCircle className="w-4 h-4 inline mr-2 text-green-400" />
            Ingin menyimpan video ke Galeri? Ikuti 3 langkah mudah ini:
          </p>

          {/* STEP 1 */}
          <div className="bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden group hover:border-white/10 transition-colors">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2 text-green-400">
                <span className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-green-500/20">1</span>
                Klik Titik Tiga (⋮)
              </h3>
              <p className="text-gray-400 text-sm mt-1 ml-10">
                Pada pemutar video, cari dan klik tombol titik tiga (⋮) yang ada di pojok kanan bawah.
              </p>
            </div>
            <div className="bg-black/40 p-4 flex justify-center">
              <img 
                src="/tutor1.png" 
                alt="Langkah 1" 
                className="rounded-xl shadow-2xl border border-white/10 max-h-64 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden group hover:border-white/10 transition-colors">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2 text-green-400">
                <span className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-green-500/20">2</span>
                Pilih Menu "Download"
              </h3>
              <p className="text-gray-400 text-sm mt-1 ml-10">
                Akan muncul menu pilihan. Langsung saja klik tombol bertuliskan <strong>"Download"</strong>.
              </p>
            </div>
            <div className="bg-black/40 p-4 flex justify-center">
              <img 
                src="/tutor2.png" 
                alt="Langkah 2" 
                className="rounded-xl shadow-2xl border border-white/10 max-h-64 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden group hover:border-white/10 transition-colors">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2 text-green-400">
                <span className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-green-500/20">3</span>
                Selesai!
              </h3>
              <p className="text-gray-400 text-sm mt-1 ml-10">
                Video akan otomatis tersimpan di galeri HP kamu. Selamat menonton offline!
              </p>
            </div>
            <div className="bg-black/40 p-4 flex justify-center">
              <img 
                src="/tutor3.png" 
                alt="Langkah 3" 
                className="rounded-xl shadow-2xl border border-white/10 max-h-64 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>

        {/* --- BAGIAN 2: KEUNGGULAN WEB (SELLING POINTS) --- */}
        <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 md:p-8 mb-10 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 blur-[80px] rounded-full pointer-events-none" />

          <h2 className="text-xl font-bold mb-6 flex items-center gap-2 relative z-10">
            <Sparkles className="text-yellow-400" /> Kenapa DramaID Spesial?
          </h2>

          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            {/* Kartu 1 - GRATIS */}
            <div className="bg-black/40 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all hover:-translate-y-1">
              <CheckCircle2 className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold text-lg mb-1 text-white">100% Gratis</h3>
              <p className="text-sm text-gray-400">
                Nonton ribuan judul drama sepuasnya tanpa biaya langganan bulanan.
              </p>
            </div>

            {/* Kartu 2 - DOWNLOAD */}
            <div className="bg-black/40 p-5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all hover:-translate-y-1">
              <Download className="w-8 h-8 text-blue-400 mb-3" />
              <h3 className="font-bold text-lg mb-1 text-white">Bisa Download</h3>
              <p className="text-sm text-gray-400">
                Hemat kuota dengan fitur download. Simpan video ke HP kamu.
              </p>
            </div>

            {/* Kartu 3 - FAST */}
            <div className="bg-black/40 p-5 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all hover:-translate-y-1">
              <Zap className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold text-lg mb-1 text-white">Server Kilat</h3>
              <p className="text-sm text-gray-400">
                Server streaming stabil dan minim buffering.
              </p>
            </div>
          </div>

          {/* CTA VIP (SOFT SELLING) */}
          <div className="mt-8 text-center bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/20">
            <p className="text-sm text-yellow-200 mb-3">
              Ingin pengalaman lebih nyaman tanpa gangguan iklan?
            </p>
            <Link to="/vip-offer">
              <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 rounded-lg shadow-lg shadow-yellow-500/20 flex items-center gap-2 mx-auto">
                <Crown className="w-4 h-4" /> Gabung VIP (Support Admin)
              </Button>
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Info;

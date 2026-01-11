import React from "react";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, Download, Ban, Smartphone, Megaphone, CheckCircle2 } from "lucide-react";

const Info = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <main className="pt-24 pb-12 container max-w-4xl mx-auto px-4">
        
        {/* HERO SECTION */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-pink-500/20">
            <Megaphone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Pusat Informasi DramaID</h1>
          <p className="text-gray-400">Keuntungan member VIP dan panduan penggunaan aplikasi.</p>
        </div>

        {/* --- BAGIAN 1: KEUNTUNGAN VIP --- */}
        <div className="bg-[#16161a] border border-white/5 rounded-3xl p-6 md:p-8 mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Crown className="text-yellow-500" /> Kenapa Harus VIP?
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Kartu 1 */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 hover:border-yellow-500/30 transition-all">
              <Ban className="w-8 h-8 text-red-400 mb-3" />
              <h3 className="font-bold text-lg mb-1">Bebas Iklan</h3>
              <p className="text-sm text-gray-400">Nonton drama favorit tanpa gangguan iklan pop-up atau banner yang menyebalkan.</p>
            </div>

            {/* Kartu 2 */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 hover:border-green-500/30 transition-all">
              <Download className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-bold text-lg mb-1">Download Video</h3>
              <p className="text-sm text-gray-400">Simpan drama ke galeri HP kamu. Nonton offline hemat kuota kapan saja.</p>
            </div>

            {/* Kartu 3 */}
            <div className="bg-black/20 p-5 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all">
              <Smartphone className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-bold text-lg mb-1">Akses Prioritas</h3>
              <p className="text-sm text-gray-400">Akses server lebih cepat dan dukungan prioritas jika ada masalah.</p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link to="/vip-offer">
              <Button className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold px-8 rounded-xl shadow-lg shadow-yellow-500/20">
                GABUNG VIP SEKARANG
              </Button>
            </Link>
          </div>
        </div>

        {/* --- BAGIAN 2: TUTORIAL DOWNLOAD --- */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-green-500 rounded-full"></div>
            <h2 className="text-2xl font-bold">Cara Download Video</h2>
          </div>
          <p className="text-gray-400 mb-6">Pastikan kamu sudah menjadi member VIP sebelum mengikuti langkah ini.</p>

          {/* STEP 1 */}
          <div className="bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2 text-green-400">
                <span className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-green-500/20">1</span>
                Klik Titik Tiga
              </h3>
              <p className="text-gray-400 text-sm mt-1 ml-10">
                Pada pemutar video, cari tombol titik tiga (⋮) di pojok kanan bawah player.
              </p>
            </div>
            <div className="bg-black/40 p-4 flex justify-center">
              {/* GAMBAR 1 */}
              <img 
                src="/tutor1.png" 
                alt="Langkah 1" 
                className="rounded-xl shadow-2xl border border-white/10 max-h-64 object-contain"
              />
            </div>
          </div>

          {/* STEP 2 */}
          <div className="bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2 text-green-400">
                <span className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-green-500/20">2</span>
                Pilih Menu Download
              </h3>
              <p className="text-gray-400 text-sm mt-1 ml-10">
                Akan muncul menu pilihan. Klik tombol <strong>"Download"</strong>.
              </p>
            </div>
            <div className="bg-black/40 p-4 flex justify-center">
              {/* GAMBAR 2 */}
              <img 
                src="/tutor2.png" 
                alt="Langkah 2" 
                className="rounded-xl shadow-2xl border border-white/10 max-h-64 object-contain"
              />
            </div>
          </div>

          {/* STEP 3 */}
          <div className="bg-[#16161a] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <h3 className="font-bold text-lg flex items-center gap-2 text-green-400">
                <span className="bg-green-500/10 w-8 h-8 rounded-full flex items-center justify-center text-sm border border-green-500/20">3</span>
                Video Tersimpan!
              </h3>
              <p className="text-gray-400 text-sm mt-1 ml-10">
                Video akan otomatis terdownload ke galeri/penyimpanan HP kamu. Selamat menonton offline!
              </p>
            </div>
            <div className="bg-black/40 p-4 flex justify-center">
              {/* GAMBAR 3 */}
              <img 
                src="/tutor3.png" 
                alt="Langkah 3" 
                className="rounded-xl shadow-2xl border border-white/10 max-h-64 object-contain"
              />
            </div>
          </div>

        </div>

        {/* FOOTER NOTE */}
        <div className="mt-12 text-center p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10">
          <CheckCircle2 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="text-sm text-blue-300">
            Mengalami kendala saat download? Hubungi admin via menu Inbox.
          </p>
        </div>

      </main>
    </div>
  );
};

export default Info;
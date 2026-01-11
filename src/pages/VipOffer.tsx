import { Link } from "react-router-dom";
import { Check, Star, Shield, Smartphone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";

const benefits = [
  { icon: Smartphone, text: "Download Video (Nonton Offline)" },
  { icon: Shield, text: "Bebas Iklan Mengganggu" },
  { icon: Star, text: "Prioritas Request Drama" },
  { icon: Check, text: "Dukung Server Tetap Hidup" },
];

const VipOffer = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />
      
      <main className="pt-24 pb-12 container max-w-lg mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-2">
            UNLOCK VIP ACCESS
          </h1>
          <p className="text-gray-400 text-sm">
            Nikmati pengalaman nonton terbaik tanpa batas.
          </p>
        </div>

        {/* --- KARTU HARGA & FITUR --- */}
        <div className="bg-[#16161a] border border-yellow-500/30 rounded-3xl p-6 relative overflow-hidden mb-8">
          {/* Efek Kilau Background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 blur-[50px] rounded-full pointer-events-none" />
          
          <div className="flex justify-between items-end mb-6 border-b border-white/5 pb-6">
            <div>
              <p className="text-sm text-yellow-500 font-bold tracking-widest mb-1">HARGA SPESIAL</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-black">Rp 15.000</span>
                <span className="text-gray-500 text-sm">/ bulan</span>
              </div>
            </div>
            <div className="bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {benefits.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="p-1.5 bg-green-500/10 rounded-full text-green-500">
                  <item.icon size={16} />
                </div>
                <span className="text-sm font-medium text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* --- AREA QR CODE --- */}
          <div className="bg-white p-4 rounded-xl mb-6 text-center">
            <p className="text-black text-xs font-bold mb-2 uppercase tracking-wide">Scan QR Dana Bisnis</p>
            <div className="aspect-square w-full max-w-[200px] mx-auto bg-gray-200 rounded-lg overflow-hidden">
                {/* Pastikan file Pembayaran.jpg ada di folder public */}
                <img 
                    src="/Pembayaran.jpg" 
                    alt="QRIS Pembayaran" 
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="text-black/60 text-[10px] mt-2">DANA / GOPAY / OVO / SHOPEEPAY</p>
          </div>

          {/* TOMBOL LANJUT */}
          <Link to="/payment-report">
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold h-12 text-lg shadow-lg shadow-yellow-500/20">
              Saya Sudah Bayar <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          
          <p className="text-center text-[10px] text-gray-500 mt-4">
            Klik tombol di atas setelah melakukan transfer untuk konfirmasi ke Admin.
          </p>
        </div>
      </main>
    </div>
  );
};

export default VipOffer;

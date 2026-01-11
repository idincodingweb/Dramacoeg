import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, ArrowLeft } from "lucide-react";

const PaymentReport = () => {
  const navigate = useNavigate();
  // --- GANTI NOMOR WA MU DISINI (Format 628...) ---
  const NOMOR_WA_ADMIN = "6283853779661"; 
  // ------------------------------------------------

  const [formData, setFormData] = useState({
    username: "",
    nominal: "15000",
    metode: "DANA/QRIS",
    catatan: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKirimWA = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Susun Pesan WA
    const pesan = `
*KONFIRMASI PEMBAYARAN VIP DRAMAID* 🚀
---------------------------
👤 Username: ${formData.username}
💰 Nominal: Rp ${formData.nominal}
💳 Via: ${formData.metode}
📝 Catatan: ${formData.catatan || "-"}
---------------------------
Halo Admin, saya sudah transfer. Mohon akun saya segera diaktifkan jadi VIP ya! Terima kasih.
    `.trim();

    // 2. Encode agar bisa jadi Link URL
    const urlWa = `https://wa.me/${NOMOR_WA_ADMIN}?text=${encodeURIComponent(pesan)}`;

    // 3. Buka WhatsApp
    window.open(urlWa, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <main className="pt-24 container max-w-md mx-auto px-4">
        <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm"
        >
            <ArrowLeft size={16} /> Kembali
        </button>

        <div className="bg-[#16161a] border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-1">Konfirmasi Pembayaran</h2>
          <p className="text-gray-400 text-xs mb-6">
            Isi form ini agar Admin bisa langsung mengaktifkan akun VIP kamu.
          </p>

          <form onSubmit={handleKirimWA} className="space-y-4">
            
            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-gray-500">Username Akun Kamu</Label>
              <Input 
                name="username"
                placeholder="Misal:udin_sedunia" 
                required
                className="bg-black/40 border-white/10 text-white focus:border-pink-500"
                value={formData.username}
                onChange={handleChange}
              />
              <p className="text-[10px] text-gray-500">Username yang akan dijadikan VIP.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-gray-500">Nominal</Label>
                  <Input 
                    name="nominal"
                    value={formData.nominal}
                    onChange={handleChange}
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase text-gray-500">Via</Label>
                  <Input 
                    name="metode"
                    value={formData.metode}
                    onChange={handleChange}
                    className="bg-black/40 border-white/10 text-white"
                  />
                </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold uppercase text-gray-500">Catatan (Opsional)</Label>
              <Input 
                name="catatan"
                placeholder="Nama pengirim di DANA..." 
                className="bg-black/40 border-white/10 text-white"
                value={formData.catatan}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold h-11 mt-4">
              <Send className="mr-2 w-4 h-4" /> Kirim ke WhatsApp Admin
            </Button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default PaymentReport;

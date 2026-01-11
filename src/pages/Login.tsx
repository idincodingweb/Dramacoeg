import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User, Loader2, ArrowRight } from "lucide-react";

const Login = () => {
  const [code, setCode] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State untuk loading tombol
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi input kosong
    if (!code || !username) {
      alert("Harap isi Username dan Kode VIP!");
      return;
    }

    setIsSubmitting(true);

    // Panggil fungsi login dari AuthContext (Terhubung ke Firebase)
    const success = await login(code, username);

    if (success) {
      navigate("/"); // Redirect ke Home jika sukses
    }
    
    // Jika gagal, loading berhenti (error message muncul dari AuthContext)
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0c] text-white p-4">
      {/* Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 blur-[100px] rounded-full opacity-20" />
      </div>

      <div className="w-full max-w-md p-8 border border-white/10 rounded-3xl bg-[#16161a]/80 backdrop-blur-md shadow-2xl relative z-10">
        
        {/* Header Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl shadow-lg shadow-pink-600/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        <h2 className="text-2xl font-black text-center mb-2 tracking-tight">VIP ACCESS</h2>
        <p className="text-center text-gray-400 text-sm mb-8">
          Masukkan Username & Kode Redeem untuk mengaktifkan fitur Premium.
        </p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* Input Username */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-gray-500 ml-1">Username Kamu</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                type="text" 
                placeholder="Buat username unik..." 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 h-11 focus:border-pink-500 transition-all rounded-xl"
              />
            </div>
          </div>

          {/* Input Kode VIP */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase text-gray-500 ml-1">Kode Redeem</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input 
                type="text" // Text biasa biar user gampang liat kodenya (opsional bisa password)
                placeholder="Contoh: DRAMA-X7Z9..." 
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="pl-10 bg-black/40 border-white/10 h-11 focus:border-pink-500 transition-all rounded-xl font-mono tracking-widest uppercase"
              />
            </div>
          </div>

          {/* Tombol Submit */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold h-12 rounded-xl shadow-lg shadow-pink-600/20 transition-all mt-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                Verifikasi...
              </>
            ) : (
              "Aktifkan VIP Sekarang"
            )}
          </Button>
        </form>
        
        {/* Upselling Link */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-500 mb-3">Belum punya kode VIP?</p>
          <Link to="/vip-offer">
            <Button variant="outline" className="w-full border-yellow-500/20 text-yellow-500 hover:bg-yellow-500/10 hover:text-yellow-400 h-10 rounded-xl text-xs font-bold uppercase tracking-widest">
              Beli Kode VIP (Rp 15.000) <ArrowRight className="ml-2 w-3 h-3" />
            </Button>
          </Link>
          
          <button onClick={() => navigate("/")} className="mt-4 text-[10px] text-gray-600 hover:text-white transition-colors">
            Kembali ke Beranda (Mode Tamu)
          </button>
        </div>

      </div>
    </div>
  );
};

export default Login;
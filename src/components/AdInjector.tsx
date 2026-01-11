import React, { useEffect, useRef } from 'react';
import { useAds } from '@/hooks/useAds';
import { useAuth } from '@/context/AuthContext'; // 1. Import Data User

const AdInjector: React.FC = () => {
  const { socialBarScript } = useAds();
  const { user } = useAuth(); // 2. Ambil status user
  const injectedRef = useRef(false);

  useEffect(() => {
    // --- LOGIKA PEMBLOKIRAN IKLAN ---
    
    // Cek 1: Apakah user VIP?
    if (user?.isVip) {
      console.log("👑 User VIP Terdeteksi: Iklan Social Bar DIBLOKIR demi kenyamanan Sultan.");
      return; // Langsung kabur, jangan pasang apa-apa
    }

    // Cek 2: Apakah script kosong atau udah pernah dipasang?
    if (!socialBarScript || injectedRef.current) return;

    // --- PROSES SUNTIK (Hanya untuk User Gratisan) ---
    try {
      const range = document.createRange();
      const fragment = range.createContextualFragment(socialBarScript);
      document.body.appendChild(fragment);
      
      injectedRef.current = true;
      console.log("✅ User Gratisan: Iklan Adsterra Disuntik!");
    } catch (error) {
      console.error("❌ Gagal pasang iklan:", error);
    }

  }, [socialBarScript, user]); // Jalankan cek ulang kalau user login/logout

  return null;
};

export default AdInjector;
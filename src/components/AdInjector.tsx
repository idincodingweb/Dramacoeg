import React, { useEffect, useRef } from 'react';
import { useAds } from '@/hooks/useAds';
import { useAuth } from '@/context/AuthContext';

const AdInjector: React.FC = () => {
  const { socialBarScript, popunderScript } = useAds(); // Ambil 2 script
  const { user } = useAuth();
  
  // Kita butuh 2 ref biar ga double inject
  const socialInjectedRef = useRef(false);
  const popunderInjectedRef = useRef(false);

  useEffect(() => {
    // 1. CEK VIP (Kalau Sultan, blokir semua iklan)
    if (user?.isVip) {
      console.log("👑 VIP: Semua script iklan diblokir.");
      return;
    }

    // --- LOGIC 1: SOCIAL BAR ---
    if (socialBarScript && !socialInjectedRef.current) {
      try {
        const range = document.createRange();
        // Social Bar biasanya aman ditaruh di Body
        const fragment = range.createContextualFragment(socialBarScript);
        document.body.appendChild(fragment);
        socialInjectedRef.current = true;
        console.log("✅ Social Bar Injected");
      } catch (e) { console.error("Social Bar Error", e); }
    }

    // --- LOGIC 2: POPUNDER (NEW) ---
    if (popunderScript && !popunderInjectedRef.current) {
      try {
        const range = document.createRange();
        // Popunder juga oke di body atau head, kita taruh body aja biar gampang
        const fragment = range.createContextualFragment(popunderScript);
        document.body.appendChild(fragment);
        popunderInjectedRef.current = true;
        console.log("✅ Popunder Injected");
      } catch (e) { console.error("Popunder Error", e); }
    }

  }, [socialBarScript, popunderScript, user]);

  return null;
};

export default AdInjector;

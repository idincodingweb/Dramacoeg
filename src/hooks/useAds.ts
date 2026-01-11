import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const useAds = () => {
  const [ads, setAds] = useState({
    directLink: '',       // Link buat tombol Download
    socialBarScript: ''   // Script buat iklan melayang
  });

  useEffect(() => {
    // Kita pasang "penyadap" (listener) realtime ke dokumen ads_config
    const unsub = onSnapshot(doc(db, "settings", "ads_config"), (doc) => {
      if (doc.exists()) {
        setAds(doc.data() as any);
      }
    });

    return () => unsub();
  }, []);

  return ads;
};
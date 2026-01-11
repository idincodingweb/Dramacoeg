import { useState, useEffect } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface AdsConfig {
  directLink: string;
  socialBarScript: string;
  popunderScript: string; // <--- TAMBAHAN BARU
}

export function useAds() {
  const [ads, setAds] = useState<AdsConfig>({
    directLink: "",
    socialBarScript: "",
    popunderScript: "", // <--- DEFAULT KOSONG
  });

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "settings", "ads_config"), (doc) => {
      if (doc.exists()) {
        setAds(doc.data() as AdsConfig);
      }
    });
    return () => unsub();
  }, []);

  return ads;
}

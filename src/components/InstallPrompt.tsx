import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    });
  }, []);

  const handleInstall = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User nerima tawaran install cuan!");
        }
        setDeferredPrompt(null);
        setShowButton(false);
      });
    }
  };

  if (!showButton) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 bg-pink-600 p-4 rounded-2xl shadow-2xl flex items-center justify-between animate-bounce">
      <div className="text-white">
        <p className="text-sm font-bold">Instal Aplikasi DramaID</p>
        <p className="text-[10px] opacity-80">Nonton lebih kenceng & Full Screen!</p>
      </div>
      <Button onClick={handleInstall} variant="secondary" size="sm" className="font-bold">
        <Download className="w-4 h-4 mr-1" /> Pasang
      </Button>
    </div>
  );
};
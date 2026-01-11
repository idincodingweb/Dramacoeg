import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Sparkles, TrendingUp, Clock, Mic, History, Tag } from "lucide-react";
import { Header } from "@/components/Header";
import { DramaGrid } from "@/components/DramaGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { LoadingGrid } from "@/components/LoadingGrid";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { fetchForYou, fetchTrending, fetchLatest, fetchDubIndo } from "@/lib/api";

// --- DAFTAR KATEGORI POPULER (OTAK BISNIS: PANCINGAN USER) ---
const CATEGORIES = [
  "CEO", "Balas Dendam", "Romantis", "Keluarga", 
  "Modern", "Pria Dominan", "Perselingkuhan", "Kekuatan Khusus",
  "Action", "Komedi", "Misteri", "Sekolah"
];

const Index = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("dramaid_history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const { data: forYouDramas, isLoading: forYouLoading } = useQuery({ queryKey: ["forYou"], queryFn: fetchForYou });
  const { data: trendingDramas, isLoading: trendingLoading } = useQuery({ queryKey: ["trending"], queryFn: fetchTrending });
  const { data: latestDramas, isLoading: latestLoading } = useQuery({ queryKey: ["latest"], queryFn: fetchLatest });
  const { data: dubIndoDramas, isLoading: dubIndoLoading } = useQuery({ queryKey: ["dubIndo"], queryFn: fetchDubIndo });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 pb-12">
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse, hsl(336 91% 63% / 0.4) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* --- SECTION LANJUT NONTON --- */}
          {history.length > 0 && (
            <section className="relative container py-6 px-4 mx-auto">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-pink-500/10 rounded-lg"><History className="w-5 h-5 text-pink-500" /></div>
                <div><h2 className="text-xl font-bold">Lanjut Nonton</h2><p className="text-xs text-muted-foreground">Kembali ke cerita terakhirmu</p></div>
              </div>
              <ScrollArea className="w-full whitespace-nowrap pb-4">
                <div className="flex w-max space-x-4">
                  {history.map((item) => (
                    <Link key={item.id} to={`/watch/${item.id}/${item.lastEpisode}`} className="group relative w-[160px] sm:w-[180px]">
                      <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-slate-800 shadow-md transition-transform group-hover:scale-[1.03]">
                        <img 
                          src={item.poster} 
                          alt={item.title} 
                          className="w-full h-full object-cover" 
                          onError={(e) => { 
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x600/1e293b/white?text=DramaID"; 
                          }} 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/95 via-black/40 to-transparent">
                          <p className="text-[11px] font-bold text-white truncate leading-tight mb-1">{item.title}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] bg-pink-600 text-white px-2 py-0.5 rounded-full font-bold">EP {item.lastEpisode}</span>
                            <span className="text-[9px] text-gray-400">{new Date(item.updatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1.5" />
              </ScrollArea>
            </section>
          )}

          {/* --- FITUR KATEGORI (HORIZONTAL SCROLL BAR) --- */}
          <section className="relative container py-4 px-4 mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-pink-500" />
              <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Pilih Genre</h2>
            </div>
            <ScrollArea className="w-full whitespace-nowrap">
              <div className="flex space-x-3 pb-2">
                {CATEGORIES.map((cat) => (
                  <Link 
                    key={cat} 
                    to={`/category/${encodeURIComponent(cat)}`}
                    className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-slate-900/50 border border-white/5 text-xs font-bold transition-all hover:bg-pink-600 hover:border-pink-500 hover:text-white"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="hidden" />
            </ScrollArea>
          </section>

          <section className="container py-8 px-4 mx-auto">
            <SectionHeader title="Untuk Kamu" subtitle="Pilihan spesial buat pebisnis" icon={Sparkles} />
            {forYouLoading ? <LoadingGrid count={6} /> : <DramaGrid dramas={forYouDramas?.slice(0, 12) || []} />}
          </section>
        </div>

        <section className="container py-8 px-4 mx-auto">
          <SectionHeader title="Trending" icon={TrendingUp} href="/trending" />
          {trendingLoading ? <LoadingGrid count={6} /> : <DramaGrid dramas={trendingDramas?.slice(0, 12) || []} />}
        </section>

        <section className="container py-8 px-4 mx-auto">
          <SectionHeader title="Dub Indo" icon={Mic} />
          {dubIndoLoading ? <LoadingGrid count={6} /> : <DramaGrid dramas={dubIndoDramas?.slice(0, 12) || []} />}
        </section>

        <section className="container py-8 px-4 mx-auto">
          <SectionHeader title="Terbaru" icon={Clock} />
          {latestLoading ? <LoadingGrid count={6} /> : <DramaGrid dramas={latestDramas?.slice(0, 12) || []} />}
        </section>
      </main>
      <footer className="border-t border-white/5 py-8 text-center text-muted-foreground text-xs">
        <p>© 2026 DramaID. Built by Idin Iskandar.</p>
      </footer>
    </div>
  );
};

export default Index;
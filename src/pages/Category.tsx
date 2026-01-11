import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Tag, LayoutGrid, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { DramaGrid } from "@/components/DramaGrid";
import { LoadingGrid } from "@/components/LoadingGrid";
import { Button } from "@/components/ui/button";
import { fetchByCategory } from "@/lib/api";

const Category = () => {
  const { tagName } = useParams<{ tagName: string }>();

  const { data: rawDramas, isLoading, isError } = useQuery({
    queryKey: ["category", tagName],
    queryFn: () => fetchByCategory(tagName!),
    enabled: !!tagName,
  });

  // --- LOGIKA PEBISNIS: NORMALISASI DATA GAMBAR ---
  // Kita cek satu-satu, mana variabel yang ada isinya, itu yang kita pake
  const dramas = rawDramas?.map((drama: any) => ({
    ...drama,
    coverWap: drama.coverWap || drama.cover || drama.verticalCover || drama.bookCover || "/placeholder.svg"
  }));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-24 pb-12 container max-w-6xl mx-auto px-4">
        {/* Header Navigasi */}
        <div className="flex flex-col gap-6 mb-10">
          <Link 
            to="/" 
            className="w-fit flex items-center gap-2 text-muted-foreground hover:text-pink-500 transition-colors font-medium group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> 
            Kembali ke Beranda
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="p-4 bg-pink-500/10 rounded-2xl text-pink-500 shadow-inner">
              <Tag className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-pink-500 mb-1">Eksplorasi Genre</p>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                {tagName}
              </h1>
            </div>
          </div>
        </div>

        {/* Konten Utama */}
        {isLoading ? (
          <div className="space-y-8">
            <LoadingGrid count={12} />
          </div>
        ) : isError ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-destructive font-bold">Koneksi API Sansekai terputus.</p>
            <Button onClick={() => window.location.reload()} variant="outline">Coba Lagi</Button>
          </div>
        ) : dramas && dramas.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
                  {dramas.length} Film Ditemukan
                </span>
              </div>
            </div>
            
            {/* Tampilkan Grid Film yang sudah di-Normalisasi */}
            <DramaGrid dramas={dramas} />

            {/* Area Iklan Adsterra */}
            <div className="mt-12 p-8 rounded-[2rem] bg-slate-900/50 border border-dashed border-white/10 text-center">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mb-2">Sponsor</p>
              <div className="text-pink-500/50 font-medium italic">
                Iklan Adsterra pasang di sini Bang! Biar HP baru kebeli! 💰
              </div>
            </div>
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center space-y-6 bg-slate-900/20 rounded-[3rem] border border-white/5">
            <h2 className="text-2xl font-bold">Kategori Kosong</h2>
            <Button asChild className="bg-pink-600 rounded-2xl h-12 px-8 font-bold">
              <Link to="/">Cari Genre Lain</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Category;
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronLeft, ChevronRight, AlertCircle, PlayCircle, Download, Lock } from "lucide-react"; 
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { VideoQualitySelector } from "@/components/VideoQualitySelector";
import { fetchDramaDetail, fetchAllEpisodes, getVideoUrl, Episode } from "@/lib/api";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useAds } from "@/hooks/useAds"; 

function getAvailableQualities(episode: Episode | undefined): number[] {
  if (!episode?.cdnList?.length) return [360, 540, 720, 1080];
  const cdn = episode.cdnList.find((c) => c.isDefault === 1) || episode.cdnList[0];
  if (!cdn?.videoPathList?.length) return [360, 540, 720, 1080];
  return cdn.videoPathList.map((v) => v.quality).sort((a, b) => a - b);
}

const Watch = () => {
  const { bookId, episodeNum } = useParams<{ bookId: string; episodeNum: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { directLink } = useAds(); // Ambil link iklan buat tombol Next
  
  const currentEpisode = parseInt(episodeNum || "1", 10);
  const [episodePage, setEpisodePage] = useState(1);
  const [videoError, setVideoError] = useState(false);
  const [videoQuality, setVideoQuality] = useState(() => {
    const saved = localStorage.getItem("dramaid_video_quality");
    return saved ? parseInt(saved, 10) : 720;
  });
  
  const episodesPerPage = 30;

  const { data: drama } = useQuery({
    queryKey: ["drama", bookId],
    queryFn: () => fetchDramaDetail(bookId!),
    enabled: !!bookId,
  });

  const { data: episodes, isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", bookId],
    queryFn: () => fetchAllEpisodes(bookId!),
    enabled: !!bookId,
  });

  const totalEpisodes = drama?.chapterCount || episodes?.length || 0;
  const totalPages = Math.ceil(totalEpisodes / episodesPerPage);

  const currentEpisodeData = episodes?.[currentEpisode - 1];
  const videoUrl = getVideoUrl(currentEpisodeData, videoQuality);
  const availableQualities = getAvailableQualities(currentEpisodeData);

  useEffect(() => {
    if (drama && bookId && currentEpisode) {
      const saved = localStorage.getItem("dramaid_history");
      let history = saved ? JSON.parse(saved) : [];
      const newItem = {
        id: bookId,
        title: drama.bookName,
        poster: drama.coverWap || "/placeholder.svg",
        lastEpisode: currentEpisode,
        updatedAt: Date.now(),
      };
      history = history.filter((h: any) => h.id !== bookId);
      history.unshift(newItem);
      localStorage.setItem("dramaid_history", JSON.stringify(history.slice(0, 20)));
    }
  }, [drama, currentEpisode, bookId]);

  useEffect(() => {
    const pageForEpisode = Math.ceil(currentEpisode / episodesPerPage);
    setEpisodePage(pageForEpisode);
  }, [currentEpisode]);

  const handleQualityChange = (quality: number) => {
    setVideoQuality(quality);
    localStorage.setItem("dramaid_video_quality", quality.toString());
    setVideoError(false);
  };

  // --- LOGIKA PINDAH EPISODE (Next Button Trap) ---
  const goToEpisode = (ep: number) => {
    if (ep >= 1 && ep <= totalEpisodes) {
      
      // LOGIC: Kalau user mau ke episode selanjutnya (Maju) DAN ada iklan DAN user bukan VIP
      // Ini tetap kita biarkan ada iklannya sebagai "Bayaran" nonton gratis
      if (ep > currentEpisode && directLink && !user?.isVip) {
        window.open(directLink, '_blank');
      }

      // Lanjut navigasi
      navigate(`/watch/${bookId}/${ep}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleVideoEnded = () => {
    if (currentEpisode < totalEpisodes) {
      toast.success(`Episode ${currentEpisode} Selesai. Lanjut Episode ${currentEpisode + 1}...`, {
        duration: 3000,
        position: "top-center"
      });
      setTimeout(() => {
        goToEpisode(currentEpisode + 1);
      }, 2000);
    } else {
      toast("Kamu sudah menonton semua episode! 🎉", {
        position: "top-center"
      });
    }
  };

  // --- FUNGSI DOWNLOAD (UPDATED) ---
  const handleDownloadClick = () => {
    if (!user?.isVip) {
      // TIDAK ADA IKLAN DISINI. Murni Edukasi.
      toast.info("Fitur Download Khusus VIP 🔒", {
        description: "Lihat panduan download dan keuntungan VIP di sini.",
        duration: 4000,
      });
      
      // Redirect ke halaman Info
      navigate("/info");
      return;
    }

    toast.success("Akses Download Terbuka! 🔓", {
      description: "Klik titik tiga (⋮) di pojok kanan bawah video, lalu pilih menu 'Download'.",
      duration: 6000,
    });
  };

  const getEpisodesForCurrentPage = () => {
    const start = (episodePage - 1) * episodesPerPage;
    const end = Math.min(start + episodesPerPage, totalEpisodes);
    return Array.from({ length: end - start }, (_, i) => start + i + 1);
  };

  if (!bookId) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />

      <main className="pt-20 pb-12 container max-w-5xl mx-auto px-4">
        <Link to={`/detail/${bookId}`} className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Kembali ke Detail
        </Link>

        {/* --- PLAYER VIDEO --- */}
        <div className="aspect-video mb-4 rounded-[2rem] overflow-hidden bg-black shadow-2xl ring-1 ring-white/10 relative group">
          {episodesLoading ? (
            <Skeleton className="w-full h-full bg-slate-800" />
          ) : videoUrl && !videoError ? (
            <video
              key={`${videoUrl}-${videoQuality}`}
              src={videoUrl}
              controls
              controlsList={user?.isVip ? undefined : "nodownload"}
              onContextMenu={(e) => !user?.isVip && e.preventDefault()} 
              autoPlay
              playsInline
              className="w-full h-full"
              onError={() => setVideoError(true)}
              onEnded={handleVideoEnded}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-900/50">
              <div className="text-center p-6">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-pink-500" />
                <p className="text-sm opacity-70">Video tidak dapat dimuat atau sedang diproses.</p>
              </div>
            </div>
          )}
        </div>

        {/* --- AREA TOMBOL DOWNLOAD & QUALITY SELECTOR --- */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          
          <Button 
            onClick={handleDownloadClick}
            className={`w-full sm:w-auto font-bold transition-all ${
              user?.isVip 
                ? "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-600/20" 
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {user?.isVip ? (
              <>
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 mr-2 text-yellow-400" />
                Download (VIP)
              </>
            )}
          </Button>

          <VideoQualitySelector currentQuality={videoQuality} availableQualities={availableQualities} onQualityChange={handleQualityChange} />
        </div>

        {/* --- INFO JUDUL & NAVIGASI --- */}
        <div className="bg-[#16161a] border border-white/5 rounded-[2rem] p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h1 className="text-xl md:text-2xl font-bold text-pink-500 line-clamp-1">{drama?.bookName || "Loading..."}</h1>
              <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-widest">Episode {currentEpisode}</p>
            </div>
            <div className="flex items-center gap-3 bg-black/30 p-2 rounded-2xl">
              <Button variant="ghost" size="icon" onClick={() => goToEpisode(currentEpisode - 1)} disabled={currentEpisode <= 1}>
                <ChevronLeft />
              </Button>
              <span className="text-sm font-black px-2">{currentEpisode} / {totalEpisodes}</span>
              {/* TOMBOL NEXT: INI YANG ADA IKLANNYA (KALAU GRATISAN) */}
              <Button variant="ghost" size="icon" onClick={() => goToEpisode(currentEpisode + 1)} disabled={currentEpisode >= totalEpisodes}>
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>

        {/* --- DAFTAR EPISODE --- */}
        <div className="bg-[#16161a] border border-white/5 rounded-[2rem] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-pink-500" /> Daftar Episode
            </h2>
            <span className="text-xs font-bold text-gray-500 bg-white/5 px-3 py-1 rounded-full">{totalEpisodes} TOTAL</span>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mb-6 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setEpisodePage(pageNum)}
                  className={`w-10 h-10 rounded-xl text-xs font-bold transition-all border ${
                    pageNum === episodePage 
                      ? "bg-pink-600 border-pink-500 text-white shadow-lg shadow-pink-600/20" 
                      : "bg-black/20 border-white/5 text-gray-400 hover:border-white/20"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}

          <p className="text-center text-[10px] font-bold text-gray-500 mb-4 uppercase tracking-tighter">
            Menampilkan Episode {(episodePage - 1) * episodesPerPage + 1} - {Math.min(episodePage * episodesPerPage, totalEpisodes)}
          </p>

          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
            {getEpisodesForCurrentPage().map((ep) => (
              <button
                key={ep}
                onClick={() => goToEpisode(ep)}
                className={`py-3 rounded-xl text-sm font-black transition-all border ${
                  ep === currentEpisode 
                    ? "bg-pink-600 text-white border-pink-500 scale-105 shadow-md shadow-pink-600/20" 
                    : "bg-[#1c1c21] border-transparent text-gray-400 hover:bg-[#25252b] hover:text-white"
                }`}
              >
                {ep}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Watch;
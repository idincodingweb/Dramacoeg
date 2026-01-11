import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { db } from "@/lib/firebase"; 
import { collection, query, orderBy, getDocs, Timestamp } from "firebase/firestore";
import { Bell, Calendar, Info, Megaphone } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Tipe data pesan
interface Message {
  id: string;
  title: string;
  content: string;
  createdAt: Timestamp;
  type?: "info" | "promo" | "warning"; 
}

const Inbox = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Ambil data dari collection 'inbox_messages' diurutkan dari yang terbaru
        const q = query(collection(db, "inbox_messages"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);
        
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Message[];

        setMessages(data);
      } catch (error) {
        console.error("Gagal ambil pesan:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white">
      <Header />
      
      <main className="pt-24 container max-w-2xl mx-auto px-4 pb-12">
        {/* Judul Halaman */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-gradient-to-r from-pink-900/20 to-transparent rounded-2xl border-l-4 border-pink-500 animate-in slide-in-from-left-2">
           <div className="p-3 bg-pink-600 rounded-xl text-white shadow-lg shadow-pink-600/20">
              <Bell className="w-6 h-6" />
           </div>
           <div>
              <h1 className="text-2xl font-bold">Pusat Informasi</h1>
              <p className="text-gray-400 text-xs">Update resmi dari Admin DramaID</p>
           </div>
        </div>

        {/* List Pesan */}
        <div className="space-y-4">
          {loading ? (
             // Tampilan Loading (Skeleton)
             [1,2,3].map(i => <Skeleton key={i} className="h-32 w-full bg-[#16161a] rounded-2xl" />)
          ) : messages.length === 0 ? (
             // Tampilan Kosong
             <div className="text-center py-16 bg-[#16161a] rounded-2xl border border-white/5">
                <div className="bg-white/5 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Info className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-300">Belum ada pesan</h3>
                <p className="text-gray-500 text-sm">Info penting akan muncul di sini.</p>
             </div>
          ) : (
             // Tampilan Ada Pesan
             messages.map((msg) => (
                <div key={msg.id} className="relative bg-[#16161a] border border-white/5 p-6 rounded-2xl hover:border-pink-500/30 transition-all group overflow-hidden shadow-sm">
                   {/* Hiasan background tipis */}
                   <div className="absolute -right-4 -top-4 text-white/5 rotate-12 group-hover:text-pink-500/5 transition-colors">
                        <Megaphone size={100} />
                   </div>

                   <div className="relative z-10">
                       <div className="flex justify-between items-start mb-3">
                          <h3 className="font-bold text-lg text-white group-hover:text-pink-400 transition-colors line-clamp-1">{msg.title}</h3>
                          <span className="text-[10px] bg-white/5 px-2 py-1 rounded-lg text-gray-400 flex items-center gap-1 border border-white/5 shrink-0 ml-2">
                            <Calendar size={10} />
                            {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString("id-ID", {
                                day: 'numeric', month: 'short', year: 'numeric'
                            }) : "Baru saja"}
                          </span>
                       </div>
                       <div className="w-full h-[1px] bg-white/5 mb-3" />
                       <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line font-light">
                          {msg.content}
                       </p>
                   </div>
                </div>
             ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Inbox;

// Tipe data agar tidak pusing
export interface DramaHistory {
  id: string;
  title: string;
  poster: string;
  lastEpisode: number;
  updatedAt: number;
}

const HISTORY_KEY = "dramaid_history";
const FAVORITE_KEY = "dramaid_favorites";

export const storage = {
  // --- LOGIKA HISTORY ---
  saveHistory: (drama: DramaHistory) => {
    const history = storage.getHistory();
    // Hapus jika sudah ada (biar yang baru ada di posisi paling atas)
    const filtered = history.filter((h) => h.id !== drama.id);
    const newHistory = [drama, ...filtered].slice(0, 10); // Simpan 10 terakhir saja
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
  },
  
  getHistory: (): DramaHistory[] => {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  },

  // --- LOGIKA FAVORIT ---
  toggleFavorite: (drama: any) => {
    const favorites = storage.getFavorites();
    const isExist = favorites.find((f) => f.id === drama.id);
    let newFavorites;
    
    if (isExist) {
      newFavorites = favorites.filter((f) => f.id !== drama.id);
    } else {
      newFavorites = [drama, ...favorites];
    }
    
    localStorage.setItem(FAVORITE_KEY, JSON.stringify(newFavorites));
    return !isExist; // Kembalikan status (true jika ditambah, false jika dihapus)
  },

  getFavorites: (): any[] => {
    const data = localStorage.getItem(FAVORITE_KEY);
    return data ? JSON.parse(data) : [];
  }
};
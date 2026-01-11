import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { db } from "@/lib/firebase"; // Pastikan path ini benar sesuai file Tahap 1
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner"; // Pakai notifikasi biar keren

interface User {
  username: string;
  isVip: boolean;
  expiredAt?: number;
}

interface AuthContextType {
  user: User | null;
  login: (code: string, username: string) => Promise<boolean>; // Kita ubah jadi Promise biar bisa tau sukses/gagal
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- FUNGSI DEVICE ID (SIDIK JARI HP) ---
// Ini akan membuat ID unik untuk browser ini. 
// Kalau user hapus data browser, ID ini hilang (sesuai request lo tadi).
const getDeviceId = () => {
  let deviceId = localStorage.getItem("dramaid_device_id");
  if (!deviceId) {
    deviceId = crypto.randomUUID(); // Bikin ID acak
    localStorage.setItem("dramaid_device_id", deviceId);
  }
  return deviceId;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cek sesi login saat web dibuka
  useEffect(() => {
    const checkSession = () => {
        const storedUser = localStorage.getItem('dramaid_vip_user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Cek sederhana apakah sesi lokal sudah kadaluarsa
            if (parsedUser.expiredAt && Date.now() > parsedUser.expiredAt) {
                logout(); // Tendang kalau expired
                toast.error("Masa aktif VIP sudah habis.");
            } else {
                setUser(parsedUser);
            }
        }
        setIsLoading(false);
    };
    checkSession();
  }, []);

  // --- LOGIKA LOGIN UTAMA (KONEK FIREBASE) ---
  const login = async (code: string, inputUsername: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const currentDeviceId = getDeviceId();
      const codeRef = doc(db, "vip_codes", code); // Cari dokumen dengan ID = KODE
      const snapshot = await getDoc(codeRef);

      if (!snapshot.exists()) {
        toast.error("Kode VIP tidak ditemukan / salah.");
        setIsLoading(false);
        return false;
      }

      const data = snapshot.data();

      // SKENARIO 1: KODE SUDAH DIPAKAI (RE-LOGIN)
      if (data.isUsed) {
        // Cek Device Lock
        if (data.lockedDeviceId !== currentDeviceId) {
             toast.error("GAGAL LOGIN!", {
                description: "Kode ini sudah terkunci di perangkat lain. Tidak bisa berbagi akun." 
             });
             setIsLoading(false);
             return false;
        }

        // Cek Expired Date (Dari Database)
        const expiredDate = data.expiredAt.toDate().getTime(); // Convert Firestore Timestamp ke Milliseconds
        if (Date.now() > expiredDate) {
            toast.error("Kode ini sudah kadaluarsa.");
            setIsLoading(false);
            return false;
        }

        // Kalau lolos semua: Login Sukses
        const userData = { 
            username: data.ownerUsername, 
            isVip: true, 
            expiredAt: expiredDate 
        };
        setUser(userData);
        localStorage.setItem('dramaid_vip_user', JSON.stringify(userData));
        toast.success(`Selamat datang kembali, ${data.ownerUsername}!`);
        setIsLoading(false);
        return true;
      } 

      // SKENARIO 2: KODE BARU (AKTIVASI PERTAMA)
      else {
        // Hitung Tanggal Expired (Default 30 Hari dari SEKARANG)
        const durationDays = data.duration || 30; // Ambil durasi dari DB atau default 30
        const now = new Date();
        const expiredDate = new Date();
        expiredDate.setDate(now.getDate() + durationDays);

        // Update Database: Kunci kode ini ke HP sekarang
        await updateDoc(codeRef, {
            isUsed: true,
            ownerUsername: inputUsername,
            lockedDeviceId: currentDeviceId, // <--- KUNCI DISINI
            activatedAt: Timestamp.fromDate(now),
            expiredAt: Timestamp.fromDate(expiredDate)
        });

        // Simpan ke State Lokal
        const userData = { 
            username: inputUsername, 
            isVip: true, 
            expiredAt: expiredDate.getTime() 
        };
        setUser(userData);
        localStorage.setItem('dramaid_vip_user', JSON.stringify(userData));
        
        toast.success("Aktivasi VIP Berhasil!", {
            description: `Aktif sampai ${expiredDate.toLocaleDateString("id-ID")}`
        });
        setIsLoading(false);
        return true;
      }

    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Terjadi kesalahan koneksi database.");
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dramaid_vip_user');
    // Kita tidak hapus 'dramaid_device_id' supaya dia tetap dikenali sebagai pemilik aslinya
    toast.info("Anda telah logout.");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
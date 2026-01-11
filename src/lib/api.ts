const BASE_URL = "https://dramabox.sansekai.my.id/api/dramabox";

export interface Drama {
  bookId: string;
  bookName: string;
  coverWap: string;
  chapterCount: number;
  introduction: string;
  tags: string[];
  tagV3s: { tagId: number; tagName: string; tagEnName: string }[];
  playCount?: string;
  corner?: { cornerType: number; name: string; color: string };
  rankVo?: { rankType: number; hotCode: string; recCopy: string; sort: number };
  shelfTime?: string;
}

export interface VideoPath {
  quality: number;
  videoPath: string;
  isDefault: number;
}

export interface CdnItem {
  cdnDomain: string;
  isDefault: number;
  videoPathList: VideoPath[];
}

export interface Episode {
  chapterId: string;
  chapterName: string;
  chapterIndex: number;
  cdnList?: CdnItem[];
  chapterImg?: string;
  isCharge?: number;
}

/**
 * Helper untuk mengambil URL video berdasarkan kualitas
 */
export function getVideoUrl(episode: Episode | undefined, preferredQuality: number = 720): string | null {
  if (!episode?.cdnList?.length) return null;

  const cdn = episode.cdnList.find((c) => c.isDefault === 1) || episode.cdnList[0];
  if (!cdn?.videoPathList?.length) return null;

  const videoList = cdn.videoPathList;
  const preferredVideo = videoList.find((v) => v.quality === preferredQuality);
  const defaultVideo = videoList.find((v) => v.isDefault === 1);
  const fallbackVideo = videoList[0];

  const selectedVideo = preferredVideo || defaultVideo || fallbackVideo;
  return selectedVideo?.videoPath || null;
}

export async function fetchForYou(): Promise<Drama[]> {
  const response = await fetch(`${BASE_URL}/foryou`);
  if (!response.ok) throw new Error("Failed to fetch for you dramas");
  return response.json();
}

export async function fetchTrending(): Promise<Drama[]> {
  const response = await fetch(`${BASE_URL}/trending`);
  if (!response.ok) throw new Error("Failed to fetch trending dramas");
  return response.json();
}

export async function fetchLatest(): Promise<Drama[]> {
  const response = await fetch(`${BASE_URL}/latest`);
  if (!response.ok) throw new Error("Failed to fetch latest dramas");
  return response.json();
}

export async function fetchDubIndo(): Promise<Drama[]> {
  const response = await fetch(`${BASE_URL}/dubindo?classify=terpopuler`);
  if (!response.ok) throw new Error("Failed to fetch dub indo dramas");
  return response.json();
}

export async function fetchDramaDetail(bookId: string): Promise<Drama> {
  const response = await fetch(`${BASE_URL}/detail?bookId=${bookId}`);
  if (!response.ok) throw new Error("Failed to fetch drama detail");
  return response.json();
}

export async function fetchAllEpisodes(bookId: string): Promise<Episode[]> {
  try {
    const response = await fetch(`${BASE_URL}/allepisode?bookId=${bookId}`);
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : data.episodes || [];
  } catch {
    return [];
  }
}

export async function searchDramas(query: string): Promise<Drama[]> {
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error("Failed to search dramas");
  return response.json();
}

export async function fetchPopularSearch(): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/populersearch`);
  if (!response.ok) throw new Error("Failed to fetch popular searches");
  return response.json();
}

/**
 * FITUR BARU: Ambil Drama Berdasarkan Kategori/Genre
 * Otak Bisnis: Memudahkan user menemukan konten spesifik
 */
export async function fetchByCategory(category: string): Promise<Drama[]> {
  // API Sansekai menggunakan parameter query untuk filter kategori/tags lewat search
  const response = await fetch(`${BASE_URL}/search?query=${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error("Failed to fetch category");
  return response.json();
}
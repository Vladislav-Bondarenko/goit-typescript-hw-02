import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const BASE_URL = "https://api.unsplash.com/search/photos";

export interface UnsplashImage {
  id: string;
  alt_description: string | null;
  urls: {
    small: string;
    regular: string;
  };
}

export interface UnsplashResponse {
  results: UnsplashImage[];
  total: number;
  total_pages: number;
}

export async function fetchImages(
  query: string,
  page: number = 1
): Promise<UnsplashResponse> {
  const response = await axios.get<UnsplashResponse>(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });

  return response.data;
}

export interface ExtendedUnsplashImage extends UnsplashImage {
  user: {
    name: string;
  };
  likes: number;
}

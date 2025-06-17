import axios from "axios";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;
const BASE_URL = "https://api.unsplash.com/search/photos";

export async function fetchImages(query, page = 1) {
  const response = await axios.get(BASE_URL, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: ACCESS_KEY,
    },
  });

  return response.data; // вернёт { results: [...], total_pages: ... }
}

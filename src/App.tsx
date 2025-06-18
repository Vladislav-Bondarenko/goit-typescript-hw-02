import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Toaster } from "react-hot-toast";
import { fetchImages, ExtendedUnsplashImage } from "./services/api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<ExtendedUnsplashImage[]>([]);
  const [selectedImage, setSelectedImage] =
    useState<ExtendedUnsplashImage | null>(null);

  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    if (!query) return;

    async function getImages() {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchImages(query, page);

        setImages((prevImages) =>
          page === 1 ? data.results : [...prevImages, ...data.results]
        );
        setTotalPages(data.total_pages);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setIsLoading(false);
      }
    }

    getImages();
  }, [query, page]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = (image: ExtendedUnsplashImage) => {
    setSelectedImage(image);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <Toaster position="top-right" />
      <SearchBar onSubmit={handleSearch} />

      {error && <ErrorMessage message={error} />}

      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}

      {isLoading && <Loader />}

      {images.length > 0 && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </>
  );
}

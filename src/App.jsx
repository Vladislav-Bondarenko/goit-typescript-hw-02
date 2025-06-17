import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import { Toaster } from "react-hot-toast";
import { fetchImages } from "./services/api";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import ImageModal from "./components/ImageModal/ImageModal";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

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

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleImageClick = (image) => {
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

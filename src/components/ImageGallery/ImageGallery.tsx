import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { ExtendedUnsplashImage } from "../../services/api";

interface ImageGalleryProps {
  images: ExtendedUnsplashImage[];
  onImageClick: (image: ExtendedUnsplashImage) => void;
}

export default function ImageGallery({
  images,
  onImageClick,
}: ImageGalleryProps) {
  return (
    <ul className={styles.gallery}>
      {images.map((img) => (
        <li key={img.id} className={styles.item}>
          <ImageCard image={img} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
}

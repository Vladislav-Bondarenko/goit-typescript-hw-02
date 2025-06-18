import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";
import { UnsplashImage } from "../../services/api";

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
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

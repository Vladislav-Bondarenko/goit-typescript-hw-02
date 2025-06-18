import styles from "./ImageCard.module.css";
import { ExtendedUnsplashImage } from "../../services/api";

interface ImageCardProps {
  image: ExtendedUnsplashImage;
  onClick: (image: ExtendedUnsplashImage) => void;
}

export default function ImageCard({ image, onClick }: ImageCardProps) {
  return (
    <div className={styles.card} onClick={() => onClick(image)}>
      <img
        className={styles.image}
        src={image.urls.small}
        alt={image.alt_description || "Image"}
      />
    </div>
  );
}

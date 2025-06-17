import styles from "./ImageCard.module.css";

export default function ImageCard({ image, onClick }) {
  return (
    <div className={styles.card} onClick={() => onClick(image)}>
      <img
        className={styles.image}
        src={image.urls.small}
        alt={image.alt_description}
      />
    </div>
  );
}

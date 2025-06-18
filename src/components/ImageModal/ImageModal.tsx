import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

interface ExtendedUnsplashImage {
  urls: {
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
  likes: number;
}

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: ExtendedUnsplashImage | null;
}

export default function ImageModal({
  isOpen,
  onClose,
  image,
}: ImageModalProps) {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Image Modal"
      shouldCloseOnOverlayClick={true}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || "Image"}
        className={styles.image}
      />
      <p>Author: {image.user.name}</p>
      <p>Likes: {image.likes}</p>
      <p>Description: {image.alt_description || "No description"}</p>
      <button className={styles.button} onClick={onClose}>
        Close
      </button>
    </Modal>
  );
}

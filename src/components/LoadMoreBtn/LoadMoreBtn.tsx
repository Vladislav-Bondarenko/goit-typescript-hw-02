import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

export default function LoadMoreBtn({
  onClick,
}: LoadMoreBtnProps): JSX.Element {
  return (
    <button className={styles.button} onClick={onClick}>
      Load more
    </button>
  );
}

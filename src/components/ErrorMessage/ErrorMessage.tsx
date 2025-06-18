import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({
  message,
}: ErrorMessageProps): JSX.Element {
  return <p className={styles.error}>{message}</p>;
}

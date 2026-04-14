import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.texto}>
          © {new Date().getFullYear()} Blog de Tecnologia — Desenvolvido com
          Next.js.
        </p>
      </div>
    </footer>
  );
}

import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          📝 Blog de Tecnologia
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Início
          </Link>
        </nav>
      </div>
    </header>
  );
}

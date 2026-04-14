import Link from "next/link";
import type { Artigo } from "@/types/artigo";
import styles from "./CardArtigo.module.css";

interface CardArtigoProps {
  artigo: Artigo;
}

export default function CardArtigo({ artigo }: CardArtigoProps) {
  const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(artigo.date));

  return (
    <Link href={`/artigos/${artigo.slug}`} className={styles.card}>
      <div className={styles.conteudo}>
        <p className={styles.meta}>
          {artigo.author} ·{" "}
          <time dateTime={artigo.date}>{dataFormatada}</time>
        </p>
        <h2 className={styles.titulo}>{artigo.title}</h2>
        <p className={styles.resumo}>{artigo.excerpt}</p>
      </div>
      <span className={styles.lerMais}>Ler artigo →</span>
    </Link>
  );
}

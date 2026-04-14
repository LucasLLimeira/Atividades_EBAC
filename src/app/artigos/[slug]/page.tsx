import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArtigos, getArtigoBySlug } from "@/lib/api";
import styles from "./page.module.css";

export const dynamic = "force-static";
export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const artigos = await getArtigos();
  return artigos.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo) {
    return { title: "Artigo não encontrado" };
  }

  return {
    title: artigo.title,
    description: artigo.excerpt,
  };
}

export default async function ArtigoPage({ params }: PageProps) {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);

  if (!artigo) {
    notFound();
  }

  const dataFormatada = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(artigo.date));

  const paragrafos = artigo.content
    .split("\n\n")
    .filter((p) => p.trim().length > 0);

  return (
    <div className={styles.pagina}>
      <Link href="/" className={styles.voltar}>
        ← Voltar para o Blog
      </Link>

      <article className={styles.artigo}>
        <header className={styles.cabecalho}>
          <h1 className={styles.titulo}>{artigo.title}</h1>
          <div className={styles.meta}>
            <span className={styles.autor}>por {artigo.author}</span>
            <span className={styles.separador}>·</span>
            <time className={styles.data} dateTime={artigo.date}>
              {dataFormatada}
            </time>
          </div>
          <p className={styles.resumo}>{artigo.excerpt}</p>
        </header>

        <div className={styles.conteudo}>
          {paragrafos.map((paragrafo, i) => (
            <p key={i} className={styles.paragrafo}>
              {paragrafo}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}

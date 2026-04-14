import { getArtigos } from "@/lib/api";
import CardArtigo from "@/components/CardArtigo/CardArtigo";
import styles from "./page.module.css";

export const dynamic = "force-static";

export default async function HomePage() {
  const artigos = await getArtigos();

  return (
    <div className={styles.pagina}>
      <div className={styles.cabecalho}>
        <h1 className={styles.titulo}>Blog de Tecnologia</h1>
        <p className={styles.subtitulo}>
          Artigos sobre desenvolvimento web moderno com Next.js, React e
          TypeScript.
        </p>
      </div>

      {artigos.length === 0 ? (
        <p className={styles.vazio}>
          Nenhum artigo encontrado. Configure o endpoint em{" "}
          <code>.env.local</code> e execute o seed script.
        </p>
      ) : (
        <div className={styles.grid}>
          {artigos.map((artigo) => (
            <CardArtigo key={artigo._id} artigo={artigo} />
          ))}
        </div>
      )}
    </div>
  );
}

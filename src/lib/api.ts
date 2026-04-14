import type { Artigo } from "@/types/artigo";

const endpoint = process.env.CRUDCRUD_ENDPOINT;

export async function getArtigos(): Promise<Artigo[]> {
  if (!endpoint) {
    console.warn(
      "\n⚠  CRUDCRUD_ENDPOINT não configurado. " +
        "Adicione-o ao .env.local e execute o seed script.\n"
    );
    return [];
  }

  try {
    const res = await fetch(endpoint, { cache: "force-cache" });

    if (!res.ok) {
      console.error(
        `⚠  Falha ao buscar artigos (${res.status} ${res.statusText}). ` +
          "Verifique o endpoint em .env.local e certifique-se de ter executado o seed."
      );
      return [];
    }

    return res.json() as Promise<Artigo[]>;
  } catch (err) {
    console.error("⚠  Erro de rede ao buscar artigos:", err);
    return [];
  }
}

export async function getArtigoBySlug(slug: string): Promise<Artigo | null> {
  const artigos = await getArtigos();
  return artigos.find((a) => a.slug === slug) ?? null;
}

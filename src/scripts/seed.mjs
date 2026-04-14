/**
 * Script de seed para popular o crudcrud.com com artigos de exemplo.
 *
 * Uso:
 *   node src/scripts/seed.mjs https://crudcrud.com/api/YOUR_UNIQUE_ID/artigos
 *
 * Nota: slugify é implementado de forma embutida para não precisar de dependências extras.
 */

const endpoint = process.argv[2];

if (!endpoint) {
  console.error("Erro: informe o endpoint como argumento.");
  console.error(
    "  node src/scripts/seed.mjs https://crudcrud.com/api/YOUR_ID/artigos"
  );
  process.exit(1);
}

/**
 * Gera um slug a partir de um texto, removendo acentos e caracteres especiais.
 * Equivalente ao que a biblioteca `slugify` faria para textos em português.
 */
function toSlug(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const artigos = [
  {
    title: "Introdução ao Next.js: App Router e Server Components",
    author: "Ana Lima",
    date: "2025-10-01",
    excerpt:
      "Explore as principais novidades do Next.js e como aproveitar ao máximo o App Router e os Server Components para construir aplicações modernas.",
    content: `O Next.js trouxe diversas melhorias ao App Router introduzido na versão 13. Com os Server Components por padrão, a renderização fica mais eficiente e o JavaScript enviado ao cliente é reduzido drasticamente.

Principais novidades:
- Turbopack estável para builds ultrarrápidos
- Server Actions aprimorados com formulários nativos
- generateStaticParams mais robusto para SSG
- Melhorias no sistema de cache com granularidade por segmento

Para começar, basta criar um projeto com: npx create-next-app@latest meu-projeto

O App Router utiliza uma convenção de arquivos onde qualquer page.tsx é uma página, layout.tsx define layouts persistentes e loading.tsx exibe estados de carregamento automáticos.`,
  },
  {
    title: "SEO Moderno com Next.js: generateMetadata e Open Graph",
    author: "Carlos Mendes",
    date: "2025-10-15",
    excerpt:
      "Aprenda a configurar metadados dinâmicos por página com a função generateMetadata, melhorando o posicionamento e a aparência do seu site nos mecanismos de busca.",
    content: `SEO (Search Engine Optimization) é fundamental para qualquer aplicação web. O Next.js facilita muito essa tarefa com a API de Metadata.

Como usar generateMetadata:

export async function generateMetadata({ params }) {
  const artigo = await getArtigoBySlug(params.slug);
  return {
    title: artigo.title,
    description: artigo.excerpt,
    openGraph: {
      title: artigo.title,
      description: artigo.excerpt,
    },
  };
}

Boas práticas de SEO com Next.js:
- Use títulos únicos e descritivos por página
- Adicione descrições com entre 150 e 160 caracteres
- Configure tags Open Graph para compartilhamento em redes sociais
- Utilize canonical URLs para evitar conteúdo duplicado
- Gere sitemaps com next-sitemap

O metadata gerado é adicionado ao head do HTML durante a renderização no servidor, garantindo que crawlers de buscadores como o Google encontrem as informações corretas.`,
  },
  {
    title: "TypeScript no Frontend: Tipos que Salvam Vidas",
    author: "Beatriz Santos",
    date: "2025-11-01",
    excerpt:
      "Descubra como o TypeScript pode transformar o desenvolvimento frontend, prevenindo erros em tempo de compilação e melhorando a produtividade da equipe.",
    content: `TypeScript se tornou padrão em aplicações React modernas, e por boas razões. A tipagem estática previne uma enorme classe de bugs antes mesmo do código rodar.

Conceitos essenciais para o frontend:

1. Typed Props: Defina interfaces para as props dos seus componentes.

interface CardProps {
  titulo: string;
  descricao: string;
  data: Date;
}

2. Union Types: Expresse que um valor pode ser de diferentes tipos.

type Status = "rascunho" | "publicado" | "arquivado";

3. Generics: Crie funções e componentes reutilizáveis com tipos parametrizados.

async function fetchData<T>(url: string): Promise<T> {
  const res = await fetch(url);
  return res.json();
}

Com o TypeScript, refatorações se tornam mais seguras e o onboarding de novos desenvolvedores fica mais rápido, pois os tipos servem como documentação viva.`,
  },
  {
    title: "React 19: Novas Hooks e o Compilador",
    author: "Diego Ferreira",
    date: "2025-11-20",
    excerpt:
      "O React 19 chegou com mudanças significativas: novo compilador, hooks de formulário e melhorias de performance. Veja o que muda no seu dia a dia.",
    content: `O React 19 representa uma das atualizações mais significativas desde os React Hooks. O novo compilador do React transforma automaticamente o código para otimizar re-renders, eliminando a necessidade de useMemo e useCallback na maioria dos casos.

Principais novidades:

1. React Compiler: Memoização automática sem intervenção manual.

2. useActionState: Gerencia o estado de Server Actions e formulários.

const [error, submitAction, isPending] = useActionState(
  async (prevState, formData) => {
    const result = await createPost(formData);
    if (!result.success) return result.error;
    redirect("/posts");
  },
  null
);

3. use(): Nova primitive para consumir Promises e Context em render.

const data = use(fetchPromise); // suspende automaticamente

4. Server Components estáveis: Integração nativa com Next.js.

O ecossistema React continua evoluindo rapidamente, mas a compatibilidade com versões anteriores é sempre preservada.`,
  },
  {
    title: "Estratégias de Data Fetching no Next.js: SSG, SSR e ISR",
    author: "Ana Lima",
    date: "2025-12-05",
    excerpt:
      "Entenda as diferenças entre Static Site Generation, Server-Side Rendering e Incremental Static Regeneration, e saiba quando usar cada estratégia.",
    content: `Uma das decisões mais importantes ao construir com Next.js é escolher a estratégia de renderização correta para cada página.

Static Site Generation (SSG)
Páginas geradas em build time. Ideal para conteúdo que não muda frequentemente.

export const dynamic = "force-static";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

Server-Side Rendering (SSR)
Página gerada em cada request. Use para conteúdo personalizado.

export const dynamic = "force-dynamic";

Incremental Static Regeneration (ISR)
Combina SSG com atualizações periódicas sem rebuild completo.

fetch(url, { next: { revalidate: 3600 } }); // revalida a cada 1 hora

Quando usar cada estratégia?
- SSG: Blog posts, documentação, páginas de marketing
- SSR: Dashboard com dados em tempo real, páginas de perfil personalizadas
- ISR: E-commerce com catálogo que muda diariamente

A escolha impacta diretamente na performance, custo de infraestrutura e experiência do usuário.`,
  },
];

async function seed() {
  console.log(`Enviando ${artigos.length} artigos para: ${endpoint}\n`);

  for (const artigo of artigos) {
    const slug = toSlug(artigo.title);
    const payload = { ...artigo, slug };

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.error(
        `✗ Falha ao criar "${artigo.title}": ${res.status} ${res.statusText}`
      );
      continue;
    }

    const created = await res.json();
    console.log(
      `✓ Criado: "${artigo.title}" (slug: ${slug}, _id: ${created._id})`
    );
  }

  console.log("\nSeed concluído! Execute 'npm run build' para gerar o site.");
}

seed().catch((err) => {
  console.error("Erro durante o seed:", err);
  process.exit(1);
});

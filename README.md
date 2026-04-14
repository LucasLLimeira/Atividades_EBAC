# Blog de Tecnologia

Blog estático com rotas dinâmicas, dados buscados via API REST (crudcrud.com) e SEO automatizado com Next.js App Router.

## Tecnologias

- **Next.js 16** — App Router, Server Components, SSG
- **TypeScript** — tipagem estática
- **CSS Modules** — estilização por componente
- **crudcrud.com** — API REST gratuita como backend de dados

## Estrutura de rotas

| Rota | Arquivo | Estratégia |
|---|---|---|
| `/` | `src/app/page.tsx` | SSG (`force-static`) |
| `/artigos/[slug]` | `src/app/artigos/[slug]/page.tsx` | SSG (`generateStaticParams`) |

## Configuração e execução

### 1. Instalar dependências

```bash
npm install
```

### 2. Criar endpoint no crudcrud.com

1. Acesse [https://crudcrud.com](https://crudcrud.com)
2. Copie a URL do endpoint gerado (ex: `https://crudcrud.com/api/abc123`)
3. Edite `.env.local` e substitua `YOUR_UNIQUE_ID`:

```env
CRUDCRUD_ENDPOINT=https://crudcrud.com/api/abc123/artigos
```

> **Atenção:** endpoints do crudcrud.com expiram em 24 horas no plano gratuito. Após a expiração, crie um novo endpoint, atualize `.env.local` e faça um novo `npm run build`.

### 3. Popular a API com artigos de exemplo

```bash
node src/scripts/seed.mjs https://crudcrud.com/api/SEU_ID/artigos
```

O script cria 5 artigos com slugs gerados automaticamente a partir dos títulos.

### 4. Executar em desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

### 5. Gerar build de produção (SSG)

```bash
npm run build
npm start
```

O Next.js chama `generateStaticParams` durante o build para pré-renderizar todas as páginas de artigos como HTML estático.

## Deploy no Vercel

1. Faça push do projeto para um repositório GitHub
2. Acesse [https://vercel.com](https://vercel.com) e importe o repositório
3. Em **Environment Variables**, adicione:
   - `CRUDCRUD_ENDPOINT` = `https://crudcrud.com/api/SEU_ID/artigos`
4. Clique em **Deploy**

O Vercel executa `npm run build` automaticamente, que inclui o `generateStaticParams` para gerar todas as páginas de artigos.

## A função `generateMetadata`

Cada página de artigo possui metadados dinâmicos gerados pela função `generateMetadata`:

```typescript
// src/app/artigos/[slug]/page.tsx
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artigo = await getArtigoBySlug(slug);
  return {
    title: artigo.title,          // ex: "SEO Moderno com Next.js"
    description: artigo.excerpt,  // descrição única por artigo
  };
}
```

O `layout.tsx` define o template `"%s | Blog de Tecnologia"`, então o `<title>` final de cada página será: `SEO Moderno com Next.js | Blog de Tecnologia`.

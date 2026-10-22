# Solab Web

Frontend do Solab Sizer, feito com React, TypeScript, Vite, Tailwind CSS, React Hook Form e Zod.

## Requisitos

- Node.js 22.12 ou superior

## Configuração local

```bash
npm ci
cp .env.example .env
npm run dev
```

O frontend abre em `http://localhost:3000`. A API local roda em `http://localhost:3001/api`.

### Variável de ambiente

```env
VITE_API_URL="http://localhost:3001/api"
```

Se `VITE_API_URL` não for definida, o frontend usa a URL pública atual da API no Render. Para produção na Vercel, configure a variável no painel do projeto:

```env
VITE_API_URL="https://backend-project-solab.onrender.com/api"
```

## Scripts

| Comando             | Função                         |
| ------------------- | ------------------------------ |
| `npm run dev`       | Servidor de desenvolvimento    |
| `npm run build`     | Build de produção              |
| `npm run preview`   | Pré-visualiza o build          |
| `npm run lint`      | ESLint 9 com configuração flat |
| `npm run typecheck` | Verificação de tipos           |
| `npm test`          | Testes unitários com Vitest    |
| `npm run format`    | Prettier                       |

## Estrutura

- `src/features/sizer/calculations.ts`: regras de dimensionamento em funções puras. Os coeficientes (`0,762`, `0,8`, `30` dias, `365` dias) foram preservados do trabalho original; qualquer mudança precisa ser justificada pela metodologia do TCC.
- `src/hooks/useSolarimetricData.ts`: carregamento de estados, municípios e dados solarimétricos, com `AbortController`, estados de carregamento e erro.
- `src/lib/http.ts`: cliente HTTP nativo com validação Zod da resposta.
- `src/schemas/FormSchema.ts`: validação do formulário.
- `src/pages/SolabSizer/index.tsx`: fluxo do formulário e relatório.
- `src/components/PdfViewer/pdfViewer.tsx`: relatório em PDF, carregado sob demanda.

O gráfico e o PDF são carregados por `import()` dinâmico para não entrarem no bundle inicial.

## Testes

```bash
npm test
```

Os testes cobrem os cálculos de dimensionamento e a validação do formulário. Eles não precisam de API ou banco.

## Deploy na Vercel

- Build command: `npm run build`
- Output: `dist`
- Variável: `VITE_API_URL`
- O `vercel.json` inclui o rewrite de SPA para que rotas como `/solabSizer` e `/report` funcionem em acesso direto.

## Observações

- As páginas `Home` e `Report` foram preservadas; a rota `/` continua abrindo o Solab Sizer.
- O aviso de vulnerabilidades restante no `npm audit` é de ferramentas de desenvolvimento do Tailwind CSS 3 (cadeia `fast-glob`/`micromatch`). A migração para Tailwind 4 deve ser feita separadamente, com validação visual.
- A importação de fonte do Google Fonts no CSS é uma dependência externa de baixo impacto; pode ser substituída por fonte local em uma etapa futura.

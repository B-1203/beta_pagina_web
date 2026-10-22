This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Galería de cabinas

Las fotografías se guardan en `public/imagenes/` y sus rutas se mantienen en la propiedad `imagenes` de cada cabina en `app/data/sitio.ts`. Las fotografías actuales de Casa el Artesano están en `public/imagenes/Casa/`; los bungalows usan actualmente `public/imagenes/imagen_frontend.jpeg`.

Para agregar fotos nuevas, se pueden organizar por cabina, por ejemplo:

- `public/imagenes/cabinas/lagarto-01/` para Casa el Artesano
- `public/imagenes/cabinas/lagarto-02/` para Bungalow El Artesano #1
- `public/imagenes/cabinas/lagarto-03/` para Bungalow El Artesano #2

Después, agrega cada ruta (desde `public/`, comenzando con `/imagenes/`) al arreglo `imagenes` de la cabina correspondiente en `app/data/sitio.ts`. Para reemplazar o quitar fotos, cambia ese arreglo. La galería de la portada y las fotos de la página de detalle usan la misma lista; si queda una sola foto, los controles de navegación se ocultan automáticamente. Respeta mayúsculas y minúsculas en los nombres de archivo.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

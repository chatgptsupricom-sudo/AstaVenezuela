/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // `unoptimized: true` desactivaba el optimizador en TODO el sitio: las
    // imágenes se servían a tamaño completo y sin convertir a WebP/AVIF.
    // Las fotos de producto llegan de /api/image/product, que es mismo
    // origen, así que no hace falta configurar remotePatterns.
    formats: ["image/avif", "image/webp"],
    // Con el optimizador activo Next valida el host de cada imagen remota.
    // La mascota vive en Vercel Blob (ver DEPLOYMENT.md), así que hay que
    // declararla o las páginas que la usan devuelven 500.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hebbkx1anhila5yf.public.blob.vercel-storage.com",
      },
    ],
    // Los productos se pintan a 150 CSS px; estos son los anchos que Next
    // puede generar para <Image> con width/height fijos.
    imageSizes: [64, 128, 150, 256, 384],
  },
}

export default nextConfig

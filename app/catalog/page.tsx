"use client";

import { ControlPatches, ControlStrip } from "@/components/ControlStrip";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";

// El stagger solo tiene sentido en las tarjetas que ya están en pantalla.
// Sin tope, con 150 productos la última aparecía a los 7,5 s (150 * 0.05).
const MAX_TARJETAS_ESCALONADAS = 12;

// Montar 162 tarjetas de golpe es trabajo de layout que nadie llega a ver.
const POR_PAGINA = 24;

// Definimos el tipo de producto
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image: string;
  code: string;
  description: string;
}

function Paginacion({
  paginaActual,
  totalPaginas,
  onCambio,
}: {
  paginaActual: number;
  totalPaginas: number;
  onCambio: (n: number) => void;
}) {
  if (totalPaginas <= 1) return null;

  // Ventana deslizante de 5 páginas alrededor de la actual: con 7 páginas
  // caben todas, pero esto aguanta si el catálogo crece.
  const inicio = Math.max(1, Math.min(paginaActual - 2, totalPaginas - 4));
  const fin = Math.min(totalPaginas, inicio + 4);
  const paginas = [];
  for (let i = inicio; i <= fin; i++) paginas.push(i);

  const base =
    "min-w-11 h-11 px-3 rounded-lg font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <nav aria-label="Paginación de productos" className="mt-10">
      <ul
        role="list"
        className="flex items-center justify-center gap-2 flex-wrap"
      >
        <li>
          <button
            type="button"
            onClick={() => onCambio(paginaActual - 1)}
            disabled={paginaActual === 1}
            className={`${base} bg-white text-brand-strong border border-gray-200 hover:bg-gray-50`}
          >
            <span aria-hidden="true">‹</span>
            <span className="sr-only">Página anterior</span>
          </button>
        </li>

        {paginas.map((n) => {
          const activa = n === paginaActual;
          return (
            <li key={n}>
              <button
                type="button"
                onClick={() => onCambio(n)}
                aria-current={activa ? "page" : undefined}
                aria-label={`Página ${n}`}
                className={`${base} ${
                  activa
                    ? "bg-brand-strong text-white focus-on-brand"
                    : "bg-white text-brand-strong border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {n}
              </button>
            </li>
          );
        })}

        <li>
          <button
            type="button"
            onClick={() => onCambio(paginaActual + 1)}
            disabled={paginaActual === totalPaginas}
            className={`${base} bg-white text-brand-strong border border-gray-200 hover:bg-gray-50`}
          >
            <span aria-hidden="true">›</span>
            <span className="sr-only">Página siguiente</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

function CatalogoSkeleton() {
  return (
    <div
      role="status"
      aria-label="Cargando productos"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg overflow-hidden border border-gray-100 shadow-md flex flex-col"
        >
          <div className="h-48 bg-gray-100 animate-pulse border-b border-gray-100" />
          <div className="p-6 flex-1 flex flex-col gap-3">
            <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-100 rounded animate-pulse" />
            <div className="h-9 w-full bg-gray-100 rounded-lg animate-pulse mt-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CatalogPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [pagina, setPagina] = useState(1);

  // Fetch a nuestra API creada
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/productos/rapidito");
        if (!res.ok) throw new Error("Error al obtener los datos");

        const data = await res.json();
        setAllProducts(data);
      } catch (err) {
        console.error(err);
        setError("No se pudieron cargar los productos.");
      } finally {
        setIsLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Generamos categorías dinámicas
  const categories = useMemo(() => {
    const unique = Array.from(new Set(allProducts.map((p) => p.category)));
    return ["Todas", ...unique.sort()];
  }, [allProducts]);

  // Con una sola categoría real, "Todas" y esa categoría dan el mismo
  // resultado: el filtro ocupa espacio sin discriminar nada.
  const showCategoryFilter = categories.length > 2;

  // Aplicamos filtros y búsqueda
  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (selectedCategory !== "Todas") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          p.code.toLowerCase().includes(lower),
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });
  }, [allProducts, selectedCategory, searchTerm, sortBy]);

  // Cualquier cambio de filtro invalida la página actual: si estabas en la 5
  // y filtras a 10 resultados, quedarías mirando una página vacía.
  useEffect(() => {
    setPagina(1);
  }, [selectedCategory, searchTerm, sortBy]);

  const totalPaginas = Math.max(
    1,
    Math.ceil(filteredProducts.length / POR_PAGINA),
  );
  const paginaActual = Math.min(pagina, totalPaginas);
  const desde = (paginaActual - 1) * POR_PAGINA;
  const productosVisibles = filteredProducts.slice(desde, desde + POR_PAGINA);

  function irAPagina(n: number) {
    setPagina(n);
    // Sin esto el usuario cambia de página y sigue mirando el pie de la
    // anterior. `scroll-behavior` ya lo cubre `prefers-reduced-motion`.
    document
      .getElementById("resultados")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // Texto del subtítulo: durante la carga no podemos decir "0 productos",
  // porque se lee como catálogo vacío en vez de catálogo cargando.
  const subtitle = isLoading
    ? "Cargando catálogo…"
    : error
      ? "No se pudo cargar el catálogo"
      : `Explora nuestros ${filteredProducts.length} productos disponibles`;

  return (
    <>
      <Navbar />
      <main className="relative min-h-screen bg-surface pt-24">
        {/* Cabecera: el buscador vive aquí, no escondido en la barra lateral.
            Es lo primero que hace quien llega con un código en la mano. */}
        {/* Base en --ink (#0a1a2f, la tinta oscura original), con un
            brillo radial hacia --brand-strong desde donde arranca el texto
            -- como el degradado anterior pero con el par de tonos correcto.
            Sin cálculo de tope esta vez: --ink y --brand-strong ya estaban
            verificados para texto blanco en 17,48:1 y 5,71:1 respectivamente
            (medidos antes en esta misma sesión), así que cualquier punto
            intermedio del radial cae dentro de ese rango. */}
        <section className="bg-[radial-gradient(140%_140%_at_12%_15%,var(--brand-strong)_0%,var(--ink)_100%)] py-14 text-white">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="mb-6 flex items-center gap-3">
              <ControlPatches />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                Tóner · Tintas · Drums · Chips
              </span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tight [font-stretch:115%]">
              Catálogo
            </h1>
            <p className="mt-4 text-lg text-white">{subtitle}</p>

            <div className="mt-8 max-w-xl">
              <label
                htmlFor="catalogo-buscar"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-white"
              >
                Buscar por nombre o código
              </label>
              <input
                id="catalogo-buscar"
                type="search"
                placeholder="Ej. A-GI-10Y"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-white/15 bg-ink-soft px-5 py-4 font-mono text-white placeholder:text-slate-400"
              />
            </div>
          </div>
        </section>

        <ControlStrip alto="h-2" />

        <div className="container mx-auto max-w-7xl px-6 pb-12 pt-8">
          <div>
            {/* Barra de herramientas: con el buscador en la cabecera y una sola
                categoría, la barra lateral quedaba con un desplegable suelto y
                robando un cuarto del ancho a los productos. */}
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-4">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="sr-only">Filtros</h2>
                {!showCategoryFilter && (
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">
                    {filteredProducts.length}{" "}
                    {filteredProducts.length === 1 ? "producto" : "productos"}
                  </p>
                )}
                {showCategoryFilter &&
                  categories.map((cat, idx) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={`category-${cat}-${idx}`}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => setSelectedCategory(cat)}
                        className={`rounded-full px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors ${
                          isActive
                            ? "focus-on-brand bg-ink text-white"
                            : "bg-white text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="catalogo-ordenar"
                  className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500"
                >
                  Ordenar
                </label>
                <select
                  id="catalogo-ordenar"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-brand-strong"
                >
                  <option value="name">Nombre</option>
                  <option value="price">Precio</option>
                </select>
              </div>
            </div>

            <div id="resultados">
              <h2 className="sr-only">Productos</h2>

              {/* Anuncia el resultado a lectores de pantalla sin ocupar espacio */}
              <p role="status" aria-live="polite" className="sr-only">
                {isLoading
                  ? "Cargando productos"
                  : error
                    ? ""
                    : `${filteredProducts.length} productos encontrados. Página ${paginaActual} de ${totalPaginas}.`}
              </p>

              {isLoading ? (
                <CatalogoSkeleton />
              ) : error ? (
                <div
                  role="alert"
                  className="text-center py-20 text-red-700 font-bold"
                >
                  {error}
                </div>
              ) : filteredProducts.length > 0 ? (
                <>
                  <motion.ul
                    role="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  >
                    {productosVisibles.map((product, idx) => (
                      <Fragment key={`fila-${product.id || "no-id"}-${idx}`}>
                        {/* Corta la retícula a media página: 24 tarjetas
                            seguidas se leen como una hoja de cálculo. */}
                        {idx === 12 && (
                          <li className="sm:col-span-2 lg:col-span-3 xl:col-span-4">
                            <div className="flex flex-col items-start gap-5 rounded-xl bg-ink p-8 md:flex-row md:items-center md:justify-between">
                              <div>
                                <ControlPatches className="mb-4" />
                                <p className="font-display text-2xl font-black uppercase tracking-tight text-white [font-stretch:115%]">
                                  ¿No encuentras tu modelo?
                                </p>
                                <p className="mt-2 max-w-md text-sm text-slate-300">
                                  Dinos qué impresora tienes y te decimos qué
                                  consumible le corresponde.
                                </p>
                              </div>
                              <Link
                                href="/contact"
                                className="shrink-0 rounded-lg bg-white px-6 py-3 font-display font-bold text-ink transition-colors hover:bg-slate-100"
                              >
                                Consultar compatibilidad
                              </Link>
                            </div>
                          </li>
                        )}
                        <motion.li
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay:
                              Math.min(idx, MAX_TARJETAS_ESCALONADAS) * 0.04,
                          }}
                          whileHover={{ y: -5 }}
                          className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 flex flex-col"
                        >
                          <div className="relative h-48 bg-white p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
                            <Image
                              src={product.image || "/placeholder.jpg"}
                              alt={product.name || "Producto ASTA"}
                              width={150}
                              height={150}
                              // El endpoint ya entrega una miniatura; evita que
                              // el optimizador vuelva a proxificar esta URL.
                              unoptimized
                              className="object-contain hover:scale-110 transition-transform"
                            />
                            <div className="absolute top-2 right-2 rounded bg-gray-100 px-2 py-1 font-mono text-xs uppercase tracking-wider text-gray-600">
                              {product.code}
                            </div>
                          </div>

                          <div className="p-6 flex-1 flex flex-col">
                            <p className="text-xs text-brand-strong font-semibold mb-2 uppercase line-clamp-1">
                              {product.category}
                            </p>
                            {/* Sin uppercase: son nombres tecnicos largos que
                                pierden legibilidad forzados a mayusculas. */}
                            <h3 className="mb-4 line-clamp-2 flex-1 font-display font-bold text-ink">
                              {product.name}
                            </h3>

                            <Link
                              href={`/producto/${product.code}`}
                              className="w-full text-center px-4 py-2 bg-brand-strong text-white rounded-lg font-bold hover:bg-brand-darker transition-colors mt-auto block focus-on-brand"
                            >
                              Ver Detalles
                              {/* 150 enlaces idénticos son inservibles en un lector
                              de pantalla: le damos destino a cada uno. */}
                              <span className="sr-only">
                                {" "}
                                de {product.name}
                              </span>
                            </Link>
                          </div>
                        </motion.li>
                      </Fragment>
                    ))}
                  </motion.ul>

                  <p className="mt-8 text-center text-sm text-gray-600">
                    Mostrando {desde + 1}–
                    {Math.min(desde + POR_PAGINA, filteredProducts.length)} de{" "}
                    {filteredProducts.length} productos
                  </p>

                  <Paginacion
                    paginaActual={paginaActual}
                    totalPaginas={totalPaginas}
                    onCambio={irAPagina}
                  />
                </>
              ) : (
                <div role="status" className="text-center py-12">
                  <p className="text-xl text-gray-600">
                    No hay productos que coincidan con tu búsqueda
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

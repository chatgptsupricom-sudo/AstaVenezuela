"use client";

import { ControlPatches, ControlStrip } from "@/components/ControlStrip";
import { Navbar } from "@/components/Navbar";
import {
  MARCAS,
  TIPOS,
  coincideBusqueda,
  marcaDe,
  tipoDe,
} from "@/lib/clasificar";
import { enlaceWhatsApp } from "@/lib/whatsapp";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useMemo, useState } from "react";

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
  conFoto?: boolean;
}

// Grupo de botones de filtro (marca o tipo). "Todas"/"Todos" va primero y
// cada opción muestra cuántos productos quedan si la eliges; las que darían
// cero resultados no se muestran.
function FiltroGrupo({
  titulo,
  todos,
  opciones,
  valor,
  conteo,
  onCambio,
}: {
  titulo: string;
  todos: string;
  opciones: readonly string[];
  valor: string;
  conteo: (opcion: string) => number;
  onCambio: (v: string) => void;
}) {
  return (
    // En móvil, una sola fila deslizable por grupo: con flex-wrap ocupaban
    // 5 filas y el primer producto quedaba a ~900px del inicio.
    <div
      role="group"
      aria-label={titulo}
      className="-mx-6 flex items-center gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
    >
      <span className="mr-1 w-14 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-slate-600">
        {titulo}
      </span>
      {[todos, ...opciones].map((op) => {
        const activa = valor === op;
        const n = op === todos ? null : conteo(op);
        if (n === 0 && !activa) return null;
        return (
          <button
            key={op}
            type="button"
            aria-pressed={activa}
            onClick={() => onCambio(op)}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-4 font-mono text-xs uppercase tracking-wider transition-colors ${
              activa
                ? "focus-on-brand bg-ink text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            {op}
            {n !== null && (
              <span
                className={`ml-2 tabular-nums ${activa ? "text-white/70" : "text-slate-500"}`}
              >
                {n}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
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

  const [marcaSel, setMarcaSel] = useState("Todas");
  const [tipoSel, setTipoSel] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  // "recomendados": primero los que tienen foto. Ordenar por nombre ponía
  // arriba los "[CRG-047]...", que son justo los que no la tienen.
  const [sortBy, setSortBy] = useState("recomendados");
  const [pagina, setPagina] = useState(1);

  // Estado inicial desde la URL (/catalog?q=cf258a&tipo=Tóner&marca=HP&p=2):
  // así enlazan las migas de la ficha y el buscador del inicio, y al volver
  // atrás desde un producto la búsqueda sigue ahí. Se lee de window y no con
  // useSearchParams para no tener que envolver la página en <Suspense>.
  const [urlLeida, setUrlLeida] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const m = q.get("marca");
    const t = q.get("tipo");
    if (m && (MARCAS as readonly string[]).includes(m)) setMarcaSel(m);
    if (t && (TIPOS as readonly string[]).includes(t)) setTipoSel(t);
    setSearchTerm(q.get("q") ?? "");
    if (q.get("orden") === "nombre") setSortBy("name");
    const p = Number(q.get("p"));
    if (Number.isInteger(p) && p > 1) setPagina(p);
    setUrlLeida(true);
  }, []);

  // ...y de vuelta a la URL en cada cambio. replaceState: filtrar no debe
  // llenar el historial; "atrás" vuelve a la página anterior, no al filtro
  // anterior. Se omiten los valores por defecto para que la URL quede limpia.
  useEffect(() => {
    if (!urlLeida) return;
    const q = new URLSearchParams();
    if (searchTerm) q.set("q", searchTerm);
    if (marcaSel !== "Todas") q.set("marca", marcaSel);
    if (tipoSel !== "Todos") q.set("tipo", tipoSel);
    if (sortBy === "name") q.set("orden", "nombre");
    if (pagina > 1) q.set("p", String(pagina));
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [urlLeida, searchTerm, marcaSel, tipoSel, sortBy, pagina]);

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

  // Odoo no trae marca ni tipo en campos propios: se deducen del nombre y
  // del código una vez por carga (ver lib/clasificar.ts).
  const clasificados = useMemo(
    () =>
      allProducts.map((p) => ({
        ...p,
        marca: marcaDe(p.name, p.code),
        tipo: tipoDe(p.name),
      })),
    [allProducts],
  );
  type Clasificado = (typeof clasificados)[number];

  const buscados = useMemo(() => {
    if (!searchTerm.trim()) return clasificados;
    return clasificados.filter((p) =>
      coincideBusqueda(searchTerm, p.name, p.code),
    );
  }, [clasificados, searchTerm]);

  const pasaMarca = (p: Clasificado, m = marcaSel) =>
    m === "Todas" || p.marca === m;
  const pasaTipo = (p: Clasificado, t = tipoSel) =>
    t === "Todos" || p.tipo === t;

  const filteredProducts = useMemo(() => {
    const filtered = buscados.filter(
      (p) =>
        (marcaSel === "Todas" || p.marca === marcaSel) &&
        (tipoSel === "Todos" || p.tipo === tipoSel),
    );
    return [...filtered].sort((a, b) => {
      if (sortBy === "recomendados" && a.conFoto !== b.conFoto)
        return a.conFoto ? -1 : 1;
      return a.name.localeCompare(b.name);
    });
  }, [buscados, marcaSel, tipoSel, sortBy]);

  // Cualquier cambio de filtro invalida la página actual: si estabas en la 5
  // y filtras a 10 resultados, quedarías mirando una página vacía. Se hace en
  // cada cambio y no en un efecto, para no pisar la ?p= que llega por URL.
  const conPagina1 =
    <T,>(set: (v: T) => void) =>
    (v: T) => {
      set(v);
      setPagina(1);
    };

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
            <ControlPatches className="mb-6" />

            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-black uppercase leading-none tracking-tight [font-stretch:115%]">
              Catálogo
            </h1>
            <p className="mt-4 text-lg text-white">{subtitle}</p>

            <div className="mt-8 max-w-xl">
              <label
                htmlFor="catalogo-buscar"
                className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-white"
              >
                Buscar por código o modelo
              </label>
              <input
                id="catalogo-buscar"
                type="search"
                placeholder="Ej. CF258A o LaserJet 1160"
                value={searchTerm}
                onChange={(e) => conPagina1(setSearchTerm)(e.target.value)}
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
            <div className="mb-8 flex flex-wrap items-end justify-between gap-6 border-b border-slate-200 pb-6">
              {/* min-w-0: como hijo flex, sin esto crecía al ancho de todos
                  los chips (~780px) y la página se desbordaba en móvil. */}
              <div className="flex w-full min-w-0 flex-col gap-3 sm:w-auto">
                <h2 className="sr-only">Filtros</h2>
                {/* Cada conteo respeta el otro filtro y la búsqueda: "HP 12"
                    son los HP que quedan con el tipo elegido. */}
                <FiltroGrupo
                  titulo="Marca"
                  todos="Todas"
                  opciones={MARCAS}
                  valor={marcaSel}
                  conteo={(m) =>
                    buscados.filter((p) => pasaTipo(p) && pasaMarca(p, m))
                      .length
                  }
                  onCambio={conPagina1(setMarcaSel)}
                />
                <FiltroGrupo
                  titulo="Tipo"
                  todos="Todos"
                  opciones={TIPOS}
                  valor={tipoSel}
                  conteo={(t) =>
                    buscados.filter((p) => pasaMarca(p) && pasaTipo(p, t))
                      .length
                  }
                  onCambio={conPagina1(setTipoSel)}
                />
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
                  onChange={(e) => conPagina1(setSortBy)(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white px-4 py-2 focus:border-brand-strong"
                >
                  <option value="recomendados">Recomendados</option>
                  <option value="name">Nombre (A–Z)</option>
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
                  <ul
                    role="list"
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
                        <li className="flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
                          <div className="relative h-48 bg-white p-4 flex items-center justify-center overflow-hidden border-b border-gray-100">
                            <Image
                              src={product.image || "/placeholder.jpg"}
                              alt={product.name || "Producto ASTA"}
                              width={150}
                              height={150}
                              // El endpoint ya entrega una miniatura; evita que
                              // el optimizador vuelva a proxificar esta URL.
                              unoptimized
                              className="object-contain"
                            />
                            <div className="absolute top-2 right-2 rounded bg-gray-100 px-2 py-1 font-mono text-xs uppercase tracking-wider text-gray-600">
                              {product.code}
                            </div>
                          </div>

                          <div className="p-6 flex-1 flex flex-col">
                            {/* Tipo y marca en vez de la categoría de Odoo,
                                que es la misma para todo el catálogo. */}
                            <p className="text-xs text-brand-strong font-semibold mb-2 uppercase line-clamp-1">
                              {[product.tipo, product.marca]
                                .filter(Boolean)
                                .join(" · ") || product.category}
                            </p>
                            {/* Sin uppercase: son nombres tecnicos largos que
                                pierden legibilidad forzados a mayusculas. */}
                            <h3 className="mb-4 line-clamp-2 flex-1 font-display font-bold text-ink">
                              {product.name}
                            </h3>

                            {/* Dos acciones: ver la ficha o cotizar directo por
                                WhatsApp con el código ya escrito, sin pasar por
                                la ficha (el revendedor que ya sabe lo que quiere). */}
                            <div className="mt-auto flex gap-2">
                              <Link
                                href={`/producto/${product.code}`}
                                className="flex min-h-11 flex-1 items-center justify-center rounded-lg bg-brand-strong px-4 font-bold text-white transition-colors hover:bg-brand-darker focus-on-brand"
                              >
                                Ver Detalles
                                {/* 150 enlaces idénticos son inservibles en un
                                    lector de pantalla: le damos destino a cada uno. */}
                                <span className="sr-only"> de {product.name}</span>
                              </Link>
                              <a
                                href={enlaceWhatsApp(
                                  `Hola, quiero cotizar: ${product.name} (código ${product.code})`,
                                )}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Cotizar ${product.name} por WhatsApp`}
                                className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-whatsapp px-4 font-bold text-white transition-colors hover:bg-whatsapp-dark"
                              >
                                <Image src="/whatsapp-wh.png" alt="" width={18} height={18} />
                                <span aria-hidden="true">Cotizar</span>
                              </a>
                            </div>
                          </div>
                        </li>
                      </Fragment>
                    ))}
                  </ul>

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
                <div role="status" className="py-16 text-center">
                  <p className="text-xl text-gray-600">
                    No hay productos que coincidan con tu búsqueda.
                  </p>
                  {/* Que no aparezca no significa que ASTA no lo tenga: el
                      catálogo web es una parte del inventario. */}
                  <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    {searchTerm.trim() && (
                      <a
                        href={enlaceWhatsApp(
                          `Hola, busco "${searchTerm.trim()}" y no lo encuentro en el catálogo. ¿Lo tienen?`,
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 items-center gap-2 rounded-lg bg-whatsapp px-6 font-bold text-white hover:bg-whatsapp-dark"
                      >
                        <Image src="/whatsapp-wh.png" alt="" width={18} height={18} />
                        Pregúntanos por «{searchTerm.trim()}»
                      </a>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setSearchTerm("");
                        setMarcaSel("Todas");
                        setTipoSel("Todos");
                        setPagina(1);
                      }}
                      className="min-h-11 rounded-lg border border-slate-300 bg-white px-6 font-bold text-ink hover:bg-slate-50"
                    >
                      Quitar filtros
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

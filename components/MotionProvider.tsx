"use client";

import { MotionConfig } from "framer-motion";

/**
 * Hace que TODA animación de framer-motion respete la preferencia
 * "reducir movimiento" del sistema operativo.
 *
 * Con reducedMotion="user", framer-motion desactiva las animaciones de
 * transformación (x, y, scale, rotate) cuando el usuario la tiene activada,
 * y conserva las de opacidad — así el contenido sigue apareciendo sin
 * desplazamientos que provocan mareo o migraña.
 *
 * Va aquí y no en cada componente porque el proyecto usa framer-motion en
 * prácticamente todas las secciones: hacerlo uno a uno se desincroniza solo.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

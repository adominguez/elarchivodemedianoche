/**
 * Servicio de imágenes.
 *
 * Cloudinary es el único origen de imágenes del proyecto. En Turso sólo se
 * guarda el `publicId`. Nadie fuera de este módulo construye URLs a mano ni
 * conoce el formato de las transformaciones.
 */
import { CLOUDINARY_CLOUD_NAME } from 'astro:env/server';

const DELIVERY_BASE = 'https://res.cloudinary.com';

/** Contextos en los que el archivo muestra una imagen. */
export type ImageVariant =
  | 'caseCover' // portada del expediente (listado y cabecera)
  | 'caseBanner' // portada apaisada dentro del expediente
  | 'scene' // ilustración del nodo narrativo
  | 'portrait' // retrato de sospechoso, ficha
  | 'portraitThumb' // retrato pequeño, listados y acusación
  | 'clueThumb' // miniatura de pista en la rejilla de evidencias
  | 'clueDetail'; // pista ampliada

interface VariantSpec {
  width: number;
  height?: number;
  crop: 'fill' | 'fit';
  gravity?: 'auto' | 'face';
}

/**
 * Cada contexto pide exactamente el tamaño que necesita: nunca se descarga una
 * ilustración completa para pintarla como miniatura.
 */
const VARIANTS: Record<ImageVariant, VariantSpec> = {
  caseCover: { width: 640, height: 800, crop: 'fill', gravity: 'auto' },
  caseBanner: { width: 1280, height: 560, crop: 'fill', gravity: 'auto' },
  scene: { width: 1024, height: 576, crop: 'fill', gravity: 'auto' },
  portrait: { width: 400, height: 500, crop: 'fill', gravity: 'face' },
  portraitThumb: { width: 160, height: 160, crop: 'fill', gravity: 'face' },
  clueThumb: { width: 200, height: 200, crop: 'fill', gravity: 'auto' },
  clueDetail: { width: 720, height: 540, crop: 'fit' },
};

export interface CaseImage {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

export function isImageServiceConfigured(): boolean {
  return Boolean(CLOUDINARY_CLOUD_NAME?.trim());
}

function transformation(spec: VariantSpec, width: number): string {
  const parts = ['f_auto', 'q_auto', `c_${spec.crop}`, `w_${width}`];
  if (spec.height) {
    parts.push(`h_${Math.round((spec.height / spec.width) * width)}`);
  }
  if (spec.gravity) parts.push(`g_${spec.gravity}`);
  return parts.join(',');
}

function buildUrl(publicId: string, spec: VariantSpec, width: number): string {
  const cloud = CLOUDINARY_CLOUD_NAME!.trim();
  const id = publicId.replace(/^\/+/, '');
  return `${DELIVERY_BASE}/${cloud}/image/upload/${transformation(spec, width)}/${id}`;
}

/** Densidades servidas para cada variante: 1x y 2x. */
const DENSITIES = [1, 2];

/**
 * Devuelve la imagen lista para pintar, o `null` si no hay `publicId` o si
 * Cloudinary aún no está configurado. La interfaz debe degradar con elegancia.
 */
export function caseImage(
  publicId: string | null | undefined,
  variant: ImageVariant,
  sizes?: string,
): CaseImage | null {
  if (!publicId || !isImageServiceConfigured()) return null;

  const spec = VARIANTS[variant];
  const srcSet = DENSITIES.map(
    (density) => `${buildUrl(publicId, spec, spec.width * density)} ${density}x`,
  ).join(', ');

  return {
    src: buildUrl(publicId, spec, spec.width),
    srcSet,
    sizes: sizes ?? `${spec.width}px`,
    width: spec.width,
    height: spec.height ?? Math.round(spec.width * 0.75),
  };
}

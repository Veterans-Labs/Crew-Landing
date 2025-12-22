export interface IHeaderProps {
  nav?: string;
  rightButton?: {
    label: string;
    href: string;
    ariaLabel?: string;
  };
}

/**
 * ComicGridPanel - Sistema de maquetado CSS Grid tipo editorial cómic
 * 
 * Arquitectura estructural:
 * - Grid base: 6 columnas (flexible, escalable)
 * - Filas: 120px (unidad base configurable)
 * - Gap: 8px
 * 
 * Tipos de celdas predefinidos:
 * - small: 1×1 (celda individual compacta)
 * - medium: 2×2 (celda mediana cuadrada)
 * - wide: 3×1 (celda ancha horizontal)
 * - tall: 2×3 (celda alta vertical)
 * - hero: 3×3 (celda destacada grande)
 * 
 * Capas visuales (separadas de la estructura):
 * 1. page-cell: contenedor estructural (posición grid)
 * 2. page-cell-inner: borde y sombra
 * 3. page-cell-deform: transformaciones (rotateZ, skew, perspective)
 * 4. page-cell-content: clip-path irregular (bordes deformados)
 * 
 * Extensibilidad:
 * - Cada celda puede tener clip-path personalizado
 * - Rotaciones independientes por eje (rotationZ, rotation)
 * - z-index para superposiciones controladas
 */

export interface CellConfig {
  id: string;
  image?: string;
  video?: string;
  alt?: string;
  title?: string;
  label?: {
    position: 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'middle-left' | 'middle-right';
    text: string;
  };
  
  // Layout responsive (Bootstrap-like): posicionamiento por breakpoint
  layout?: {
    sm?: { col?: number; colSpan?: number; row?: number; rowSpan?: number; rowHeight?: number };
    md?: { col?: number; colSpan?: number; row?: number; rowSpan?: number; rowHeight?: number };
    lg?: { col?: number; colSpan?: number; row?: number; rowSpan?: number; rowHeight?: number };
  };
  
  // Control de borde
  borderWidth?: number;
}

export interface PanelConfig {
  title?: string;
  logoURL?: string;
  altLogo?: string;
  cells: CellConfig[];
  gap?: number; // espaciado entre celdas (default: 8)
  label?: string;
}

/**
 * Configuración de estructura grid explícita (sin spans dinámicos)
 * Las deformaciones visuales NO afectan la posición estructural
 */
export interface GridArea {
  column: string; // "1 / 2" o "auto"
  row: string;    // "1 / 2" o "auto"
}
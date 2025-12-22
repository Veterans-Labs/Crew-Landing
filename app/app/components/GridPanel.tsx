'use client';
import Image from 'next/image';
import type { CellConfig, PanelConfig } from '../interfaces/interfaces';

const DEFAULT_GAP = 4;
/**
 * Componente de celda individual
 * 
 * Arquitectura de capas separadas:
 * 1. page-cell: contenedor estructural (posición grid, NO transformaciones)
 * 2. cell-visual: capa de deformaciones visuales (skew, clip-path, rotate)
 * 3. page-cell-image: contenido visual
 * 
 * Los bordes y deformaciones NO rompen el layout grid
 */
function Cell({ cell }: { cell: CellConfig }) {
  const spans = { sm: 12, md: 6, lg: 4 };

  // Permite definir inicio/span por breakpoint por celda
  const sm = cell.layout?.sm || {};
  const md = cell.layout?.md || {};
  const lg = cell.layout?.lg || {};

  return (
    <div
      className={`col page-cell page-cell`}
      style={{
        // Variables CSS para spans responsive (cast a string index to evitar any)
        position: 'relative',
        ...( {
          // Column spans (fallback to type-based)
          ['--span-sm']: sm.colSpan ?? spans.sm,
          ['--span-md']: md.colSpan ?? spans.md,
          ['--span-lg']: lg.colSpan ?? spans.lg,
          // Column starts
          ['--col-start-sm']: sm.col,
          ['--col-start-md']: md.col,
          ['--col-start-lg']: lg.col,
          // Row starts
          ['--row-start-sm']: sm.row,
          ['--row-start-md']: md.row ?? sm.row,
          ['--row-start-lg']: lg.row ?? md.row ?? sm.row,
          // Row spans
          ['--row-span-sm']: sm.rowSpan ?? 1,
          ['--row-span-md']: md.rowSpan ?? (sm.rowSpan ?? 1),
          ['--row-span-lg']: lg.rowSpan ?? (md.rowSpan ?? (sm.rowSpan ?? 1)),
          // Optional per-cell row height (falls back to container)
          ['--row-height-sm']: sm.rowHeight,
          ['--row-height-md']: md.rowHeight,
          ['--row-height-lg']: lg.rowHeight,
        } as React.CSSProperties ),
      }}
    >
      {cell.image ? (
        <Image
          src={cell.image.toString() === '#' ? 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=' : cell.image}
          alt={cell.alt || cell.id}
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', border: '3px solid black' }}
        />
      ) : cell.video ? (
        <video
          src={cell.video}
          autoPlay
          loop
          muted
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'unset' }}
        />
      ) : (
        <div className="page-cell-placeholder">
          {cell.title && <div className="page-cell-title">{cell.title}</div>}
        </div>
      )}

      {cell.label && (
        <div className="page-cell-label" style={{ position: 'absolute', bottom : cell.label.position.includes('bottom') ? 6 : 'auto', top: cell.label.position.includes('top') ? 6 : cell.label.position.includes('middle') ? '50%' : 'auto', left: cell.label.position.includes('left') ? 6 : cell.label.position.includes('center') ? '50%' : 'auto', right: cell.label.position.includes('right') ? 6 : 'auto', zIndex: 10 }}>
          {cell.label.text}
        </div>
      )}
    </div>
  );
}

/**
 * Panel principal con grid explícito
 * grid-template-columns y grid-template-rows definen la estructura
 * Las celdas se posicionan explícitamente sin afectar el layout
 */
export function GridPanel({ config }: { config: PanelConfig }) {
  // Diseño simplificado: fila responsive de 12 columnas

  return (
    <div className="page-panel">
      {config.title && (
        <div className="page-panel-title text-center">
          {config.title}
          {config.logoURL && (
            <Image src={config.logoURL} alt={config.altLogo || ''} width={653} height={71} className='mx-auto mt-2'/>
          )}
        </div>
      )}

      {config.label && (
        <div className="page-panel-label">
          {config.label}
        </div>
      )}

      <div className="row" style={{ ...( { ['--grid-gap']: `${config.gap || DEFAULT_GAP}px` } as React.CSSProperties ) }}>
        {config.cells.map((cell) => (
          <Cell
            key={cell.id}
            cell={cell}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * GridPanelVeterans - Estructura explícita tipo CSS Grid
 * 
 */
export async function GridPanelVeterans(): Promise<PanelConfig[]> {
  const panels: PanelConfig[] = [];
  const pathImages = '/pages/veterans';
  const cells: CellConfig[] = [
    // ============================================================
    // FILA 1,2
    // ============================================================
    {
      id: `cell_1-2`,
      video: `${pathImages}/cell_1-2.mp4`,
      layout: {
        lg: { col: 1, colSpan: 12, row: 1, rowSpan: 5 },
        md: { col: 1, colSpan: 12, row: 1, rowSpan: 5 },
        sm: { col: 1, colSpan: 12, row: 1, rowSpan: 5 },
      },
    },
    /*// ============================================================
    // FILA 1
    // ============================================================
    {
      id: `cell_1_1`,
      image: '#',
      layout: {
        lg: { col: 1, colSpan: 12, row: 1, rowSpan: 3 },
        md: { col: 1, colSpan: 12, row: 1, rowSpan: 3 },
        sm: { col: 1, colSpan: 12, row: 1, rowSpan: 2 },
      },
    },
    // ============================================================
    // FILA 2
    // ============================================================
    {
      id: `cell_2_1`,
      image: '#',
      layout: {
        lg: { col: 1, colSpan: 3, row: 4, rowSpan: 2 },
        md: { col: 1, colSpan: 3, row: 4, rowSpan: 2 },
        sm: { col: 1, colSpan: 3, row: 4, rowSpan: 2 },
      },
    },
    {
      id: `cell_2_2_1`,
      image: `${pathImages}/cell_2_2_1.png`,
      layout: {
        lg: { col: 4, colSpan: 9, row: 4, rowSpan: 1 },
        md: { col: 4, colSpan: 9, row: 4, rowSpan: 1 },
        sm: { col: 1, colSpan: 9, row: 4, rowSpan: 1 },
      },
    },
    {
      id: `cell_2_2_2`,
      image: `${pathImages}/cell_2_2_2.png`,
      layout: {
        lg: { col: 4, colSpan: 9, row: 5, rowSpan: 1 },
        md: { col: 4, colSpan: 9, row: 5, rowSpan: 1 },
        sm: { col: 1, colSpan: 9, row: 5, rowSpan: 1 },
      },
    },*/
    // ============================================================
    // FILA 3
    // ============================================================
    {
      id: `cell_3_1`,
      image: `${pathImages}/cell_3_1.png`,
      layout: {
        lg: { col: 1, colSpan: 4, row: 6, rowSpan: 3 },
        md: { col: 1, colSpan: 4, row: 6, rowSpan: 3 },
        sm: { col: 1, colSpan: 4, row: 6, rowSpan: 3 },
      },
    },
    {
      id: `cell_3_2`,
      image: `${pathImages}/cell_3_2.png`,
      label: { position: 'top-center', text: 'SAGA SNAPTSHOP' },
      layout: {
        lg: { col: 5, colSpan: 4, row: 6, rowSpan: 3 },
        md: { col: 5, colSpan: 4, row: 6, rowSpan: 3 },
        sm: { col: 5, colSpan: 4, row: 6, rowSpan: 3 },
      },
    },
    {
      id: `cell_3_3`,
      image: `${pathImages}/cell_3_3.png`,
      layout: {
        lg: { col: 9, colSpan: 4, row: 6, rowSpan: 3 },
        md: { col: 9, colSpan: 4, row: 6, rowSpan: 3 },
        sm: { col: 9, colSpan: 4, row: 6, rowSpan: 3 },
      },
    },
    // ============================================================
    // FILA 4
    // ============================================================
    {
      id: `cell_4_1`,
      image: `${pathImages}/cell_4_1.png`,
      layout: {
        lg: { col: 1, colSpan: 4, row: 9, rowSpan: 3 },
        md: { col: 1, colSpan: 4, row: 9, rowSpan: 3 },
        sm: { col: 1, colSpan: 4, row: 9, rowSpan: 3 },
      },
    },
    {
      id: `cell_4_2`,
      image: `${pathImages}/cell_4_2.png`,
      layout: {
        lg: { col: 5, colSpan: 2, row: 9, rowSpan: 3 },
        md: { col: 5, colSpan: 2, row: 9, rowSpan: 3 },
        sm: { col: 5, colSpan: 2, row: 9, rowSpan: 3 },
      },
    },
    {
      id: `cell_4_3`,
      image: `${pathImages}/cell_4_3.png`,
      layout: {
        lg: { col: 7, colSpan: 2, row: 9, rowSpan: 3 },
        md: { col: 7, colSpan: 2, row: 9, rowSpan: 3 },
        sm: { col: 7, colSpan: 2, row: 9, rowSpan: 3 },
      },
    },
    {
      id: `cell_4_4`,
      image: `${pathImages}/cell_4_4.png`,
      layout: {
        lg: { col: 9, colSpan: 2, row: 9, rowSpan: 3 },
        md: { col: 9, colSpan: 2, row: 9, rowSpan: 3 },
        sm: { col: 9, colSpan: 2, row: 9, rowSpan: 3 },
      },
    },
    {
      id: `cell_4_5`,
      image: `${pathImages}/cell_4_5.png`,
      layout: {
        lg: { col: 11, colSpan: 2, row: 9, rowSpan: 3 },
        md: { col: 11, colSpan: 2, row: 9, rowSpan: 3 },
        sm: { col: 11, colSpan: 2, row: 9, rowSpan: 3 },
      },
    },
    // ============================================================
    // FILA 5,6,7
    // ============================================================
    {
    id: `cell_5-6-7`,
      video: `${pathImages}/cell_5-6-7.mp4`,
      layout: {
        lg: { col: 1, colSpan: 12, row: 12, rowSpan: 6 },
        md: { col: 1, colSpan: 12, row: 12, rowSpan: 6 },
        sm: { col: 1, colSpan: 12, row: 12, rowSpan: 6 },
      },
    },
    /*// ============================================================
    // FILA 5
    // ============================================================
    {
      id: `cell_5_1`,
      label: { position: 'top-left', text: 'VETERAN LABS' },
      image: 'https://picsum.photos/200/250?random=5',
      layout: {
        lg: { col: 1, colSpan: 4, row: 12, rowSpan: 3 },
        md: { col: 1, colSpan: 4, row: 12, rowSpan: 3 },
        sm: { col: 1, colSpan: 4, row: 12, rowSpan: 3 },
      },
    },
    {
      id: `cell_5_2`,
      
      image: 'https://picsum.photos/200/250?random=6',
      layout: {
        lg: { col: 5, colSpan: 4, row: 12, rowSpan: 3 },
        md: { col: 5, colSpan: 4, row: 12, rowSpan: 3 },
        sm: { col: 5, colSpan: 4, row: 12, rowSpan: 3 },
      },
    },
    {
      id: `cell_5_3`,
      image: 'https://picsum.photos/200/250?random=7',
      layout: {
        lg: { col: 9, colSpan: 4, row: 12, rowSpan: 3 },
        md: { col: 9, colSpan: 4, row: 12, rowSpan: 3 },
        sm: { col: 9, colSpan: 4, row: 12, rowSpan: 3 },
      },
    },
    // ============================================================
    // FILA 6
    // ============================================================
    {
      id: `cell_6_1`,
      image: 'https://picsum.photos/200/250?random=5',
      layout: {
        lg: { col: 1, colSpan: 6, row: 15, rowSpan: 3 },
        md: { col: 1, colSpan: 6, row: 15, rowSpan: 3 },
        sm: { col: 1, colSpan: 6, row: 15, rowSpan: 3 },
      },
    },
    {
      id: `cell_6_2`,       
      image: 'https://picsum.photos/200/250?random=6',
      layout: {
        lg: { col: 7, colSpan: 6, row: 15, rowSpan: 3 },
        md: { col: 7, colSpan: 6, row: 15, rowSpan: 3 },
        sm: { col: 7, colSpan: 6, row: 15, rowSpan: 3 },
      },
    },
    // ============================================================
    // FILA 7
    // ============================================================
    {
      id: `cell_7_1`,
      image: '#',
      layout: {
        lg: { col: 1, colSpan: 12, row: 18, rowSpan: 3 },
        md: { col: 1, colSpan: 12, row: 18, rowSpan: 3 },
        sm: { col: 1, colSpan: 12, row: 18, rowSpan: 3 },
      },
    },*/
  ];

  panels.push({
    title: `THIS IS`,
    logoURL: `${pathImages}/page_veterans.png`,
    altLogo: 'Veterans Gallery',
    cells,
    gap: DEFAULT_GAP,
  });

  return panels;
}
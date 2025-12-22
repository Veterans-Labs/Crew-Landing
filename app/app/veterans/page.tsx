'use client';

import { useEffect, useState } from 'react';
import type { PanelConfig } from '../interfaces/interfaces';
import { GridPanel, GridPanelVeterans } from '../components/GridPanel';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import '../globals.css';

/**
 * Página Veterans - Galería de Veteranos con Layout Editorial Cómico
 * 
 * Implementa un sistema CSS Grid dinámico y escalable con:
 * - Celdas de múltiples tamaños (small, medium, wide, tall, hero)
 * - Deformaciones visuales controladas
 * - Superposiciones de contenido
 * - Responsive desde mobile hasta desktop
 */

export default function Veterans() {
  const [panels, setPanels] = useState<PanelConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPanels() {
      try {
        const data = await GridPanelVeterans();
        setPanels(data);
      } catch (error) {
        console.error("Error generating comic panels:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPanels();
  }, []);

  return (
    <div className="min-h-dvh flex flex-col bg-veterans-yellow">
      <Header nav="| VAULT | GALLERY |" rightButton={{ label: 'Home', href: '/', ariaLabel: 'Back Home' }} />

      {/* Main Content */}
      <main className="flex-1 max-w-full w-full px-4 sm:px-8 lg:px-16 py-8 overflow-auto">
        <div className="max-w-7xl mx-auto">

          {/* Renderizar paneles generados */}
          {loading ? (
            <div className="flex items-center justify-center min-h-96 bg-gray-100 border-2 border-dashed border-gray-400 rounded">
              <p className="text-gray-600 text-lg">Cargando galería...</p>
            </div>
          ) : panels.length > 0 ? (
            <div className="space-y-16">
              {panels.map((panel, index) => (
                <div key={`panel-${index}`} className="relative">
                  <GridPanel 
                    config={panel}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-96 bg-gray-100 border-2 border-dashed border-gray-400 rounded">
              <p className="text-gray-600 text-lg">No hay paneles disponibles</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
'use client';

import { Header } from './Header';
import { Footer } from './Footer';

export function ErrorFallback({ error, reset }: { error?: string; reset?: () => void }) {
const handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <div className="min-h-dvh flex flex-col">
      <Header nav={undefined} manifiest={undefined} />      
      <div className="flex-1 max-w-full w-full flex items-center justify-center p-10">
        <div className="text-center">
          <div className="mb-4">
            <svg 
              className="mx-auto h-16 w-16 text-red-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error to connect to the server
          </h2>
          <p className="text-gray-600 mb-6">
            {error || "No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet."}
          </p>
          <div className="flex justify-center">
            <button
              onClick={reset || handleReload}
              className="side-panel-open-btn font-semibold py-2 px-10 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>

      <Footer social={[]} />
    </div>
  );
}
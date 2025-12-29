/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { JSX } from 'react/jsx-runtime';
import { APIGetPage } from '../services/Strapi';

export default function Veterans() {
  const [content, setContent] = useState<JSX.Element>(<></>);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function GetVeterans() {
      try {
        const veterans = await APIGetPage("Veterans");
        return (
          <div className="page-panel">
            <div className="page-panel-title text-center lg:px-16 py-8 ">
              THIS IS
              <img src={`${veterans.banner}`} alt='Veterans' width={350} height={71} className='mx-auto mt-2'/>
            </div>      
            <div style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>
              <video
                src={`${veterans.video}`}
                autoPlay
                loop
                muted
                playsInline
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  marginTop: '34px',
                  transform: 'scale(1.108)',
                  transformOrigin: 'center center'
                }}
              />
            </div>
          </div>    
        );
      } catch (error) {
        console.error("Error generating comic panels:", error);
      } finally {
        setLoading(false);
      }
    }

    async function LoadVeterans(){      
      try {
        const data = await GetVeterans();
        setContent(data? data : <></>);
      } catch (error) {
        console.error("Error generating comic panels:", error);
      } finally {
        setLoading(false);
      }      
    }

    LoadVeterans();
  }, []);

  return (
    <div className="max-w-full w-full px-4 sm:px-8 overflow-auto">
      <div className="max-w-7xl mx-auto">

        {/* Renderizar contenido */}
        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <p className="text-gray-600 text-lg">Loading gallery...</p>
          </div>
        ) : content ? (
          <div>
            {content}
          </div>
        ) : (
          <div className="flex items-center justify-center min-h-96 bg-gray-100 border-2 border-dashed border-gray-400 rounded">
            <p className="text-gray-600 text-lg">Not gallery available</p>
          </div>
        )}
      </div>
    </div>
  );
}
/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import "../globals.css";
import { IHeaderProps } from "../interfaces/interfaces";

export function Header({ nav, manifiest }: IHeaderProps) {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <>
      <header className="max-w-full py-2 px-2 w-full flex flex-row items-center justify-between dark:bg-black border-b-2 dark:border-black-700">
      <div className="max-w-fit">
        <Link href="/" aria-label="Go to home page">
          <img src="/veterans-logo.png" alt="Veterans Logo" width={39} height={32} className="cursor-pointer" />
        </Link>
      </div>
      <div className="page-panel-title-container">{
        nav?.map((item, index) => (
          <div key={index}>            
            <div className="page-panel-title-separator">|</div>
            <Link href={item.href || "#"} style={{cursor : item.href ? 'pointer' : 'default'}} className={`px-3 ${item.hoverEffect ? 'page-panel-title-highlight' : ''}`}>
              {item.label}
            </Link>
            {index > 0 ? <div className="page-panel-title-separator">|</div> : ''}            
          </div>
        ))
      }</div>
      {nav && (
      <div className="max-w-fit">
        <button 
          onClick={togglePanel} 
          className="side-panel-open-btn"
          aria-label="Open manifiest"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4 text-black"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>
          </svg>
        </button>
      </div>
      )}
    </header>

    {/* Overlay */}
    <div 
      className={`side-panel-overlay ${isPanelOpen ? 'active' : ''}`}
      onClick={closePanel}
    ></div>

    {/* Panel lateral */}
    {manifiest && (
    <div className={`side-panel ${isPanelOpen ? 'active' : ''}`} style={{backgroundImage: `url(${manifiest.backgroundUrl})`}}>
      <div className="side-panel-header">
        <div className="side-panel-header-left">
          <img 
            src={manifiest.profileUrl} 
            alt="Soldier" 
            className="side-panel-portrait"
          />
          <h1 className="side-panel-title">VETERANS<br />MANIFIEST</h1>
        </div>
        <button 
          onClick={closePanel} 
          className="side-panel-close-btn"
          aria-label="Close manifiest"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4 text-black"
          >
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div className="side-panel-content" dangerouslySetInnerHTML={{ __html: manifiest.content }}>
      </div>
    </div>
    )}
    </>
  );
}

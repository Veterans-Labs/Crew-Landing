/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useState } from "react";
import "../globals.css";
import { IHeaderProps } from "../interfaces/interfaces";

export function Header({ nav }: IHeaderProps) {
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
    </header>

    {/* Overlay */}
    <div 
      className={`side-panel-overlay ${isPanelOpen ? 'active' : ''}`}
      onClick={closePanel}
    ></div>

    {/* Panel lateral */}
    <div className={`side-panel ${isPanelOpen ? 'active' : ''}`}>
      <div className="side-panel-header">
        <div className="side-panel-header-left">
          <img 
            src="/pages/home/soldier-profile.png" 
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
      <div className="side-panel-content">
        <p className="side-panel-welcome">Welcome home, brother.</p>

        <p>You've arrived at our base after navigating a minefield. Receive a big hug, soldier. You are a survivor, a hero without decorations.</p>

        <p>You've been through many battles that your mind remembers and that weigh on your conscience. What you've endured has made you stronger. If the toughest crypto and NFT winter hasn't stopped you, it's because you are forged with what it takes to achieve glory.</p>

        <p>That's why we want you in our ranks. That's why we will fight this battle together.</p>

        <p>It's not a time for crybabies but for those who accept ownership of their destiny. You are a warrior, and we want you by our side for this great battle. We will advance, shoulder to shoulder, for together, nothing is impossible.</p>

        <p>You've experienced defeats and, possibly, distant victories. That journey has battered your body and mind, but nothing has stopped you. You are a Veteran in deeds. But, for now, without medals. This is the moment to claim what is rightfully yours.</p>

        <p>We know you have the necessary will. You are strong, but together we will be invincible, advancing for our glory, for our honors. This victory will be ours.</p>

        <p>We will march steadily, and our ranks and banners will make noise and be seen by all villages and communities. Our Veterans' seal will be known and prestigious in all regions of the world where the SOL shines.</p>

        <p>We aim to forge a strong and resilient community, and we are delighted that you are a survivor who has knoked the doors of our base. We know that the Veterans seal calls to you and belongs to you. You are worthy to wear it on your chest. Here is your uniform, your boots, and your weapons. Put them on, and together we will march towards a glory that will be engraved in history.</p>

        <p>Once again, it is said:</p>
        <p>Welcome home, brother!</p>
      </div>
    </div>
    </>
  );
}

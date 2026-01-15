/* eslint-disable @next/next/no-img-element */
"use client";

import "../globals.css";
import { ISocial } from "../interfaces/interfaces";

export function Footer({ social }: { social: ISocial[] }) {
  return (
    <footer className="relative max-w-full px-2 w-full flex flex-row items-center justify-center dark:var(--background) border-t-4 dark:border-black-700 mt-0">
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex items-center gap-2">       
        {social.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" aria-label={item.name} className="group relative inline-flex footer-social-btn">
            <span className="relative flex items-center justify-center w-8 h-8 rounded-xs bg-veterans-yellow border-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" className="items-center justify-center" viewBox={item.viewBox} height={item.height} width={item.width}>
                {item.path.startsWith('M') ? (
                  <path d={item.path} fill="black" />
                ) : (
                  <image href={item.path} width={item.width} height={item.height} />
                )}
              </svg>
            </span>
          </a>
        ))}
      </div>      
      <div className="w-full flex-row items-center justify-center text-center space-y-2 mt-8">
        <div className="py-1 text-sm footer-text"><span>VAULT / GALLERY</span></div>
        <div className="py-1 text-sm copyright-section">
          <img src="/veterans-logo.png" alt="Veterans Logo" width={15} height={15} />
          © {new Date().getFullYear()} VETERANS. ALL RIGHTS RESERVED</div>
      </div>
    </footer>
  );
}

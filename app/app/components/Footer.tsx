/* eslint-disable @next/next/no-img-element */
"use client";

import "../globals.css";
import { ISocial } from "../interfaces/interfaces";

export function Footer({ social }: { social: ISocial[] }) {
  return (
    <footer className="relative -bottom-5 max-w-full py-6 px-2 w-full flex flex-row items-center justify-center dark:bg-black border-t-4 dark:border-black-700">
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-4">
       
        {social.map((item, idx) => (
          <a key={idx} href={item.url} target="_blank" aria-label={item.name} className="group relative inline-flex" style={{background: "var(--background)", borderRadius: '13px'}} rel="noopener noreferrer">
            <span className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-veterans-yellow border-2 border-black shadow-[6px_6px_0_0_#0a0a0a]">
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
        <div className="py-2 text-sm"><span>VAULT / GALLERY</span></div>
        <div className="py-2 text-sm copyright-section">
          <img src="/veterans-logo.png" alt="Veterans Logo" width={20} height={20} />
          © {new Date().getFullYear()} VETERANS. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}

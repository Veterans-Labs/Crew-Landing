/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import "../globals.css";
import { IHeaderProps } from "../interfaces/interfaces";

export function Header({ nav }: IHeaderProps) {
  return (
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
        <Link href="#" className="group relative inline-flex">
          <span className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-veterans-yellow border border-black shadow-[4px_4px_0_0_#0a0a0a]">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-black"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="15" y2="16"/></svg>
          </span>
        </Link>
      </div>
    </header>
  );
}

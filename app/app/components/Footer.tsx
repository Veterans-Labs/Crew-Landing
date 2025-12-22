import "../globals.css";

export function Footer() {
  return (
    <footer className="relative max-w-full py-6 px-2 w-full flex flex-row items-center justify-center dark:bg-black border-t-4 dark:border-black-700">
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-4">
        {[
          { aria: "X (Twitter)", path: "M18.9 3H21l-6.54 7.47L21.7 21h-5.41l-4.25-5.51L6.95 21H3l7.07-8.07L2.3 3h5.49l3.84 5.03L18.9 3Zm-1.89 16h1.18L8.06 5H6.82l10.19 14Z" },
          { aria: "Instagram", path: "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-.75a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z" },
          { aria: "Facebook", path: "M13 9V7a2 2 0 0 1 2-2h2V1h-3a5 5 0 0 0-5 5v3H6v4h3v9h4v-9h3l1-4h-4Z" },
          { aria: "LinkedIn", path: "M4.98 3.5a2.5 2.5 0 1 0 0 4.999 2.5 2.5 0 0 0 0-5ZM3 8.98h4v12H3v-12Zm7 0h3.82v1.64h.05c.53-.95 1.82-1.95 3.75-1.95 4.01 0 4.75 2.64 4.75 6.07v6.24h-4v-5.53c0-1.32-.02-3.01-1.84-3.01-1.85 0-2.13 1.44-2.13 2.92v5.62h-4v-12Z" },
          { aria: "YouTube", path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .6 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1c.4-1.9.6-3.8.6-5.8s-.2-3.9-.6-5.8ZM9.5 15.5v-7l7 3.5-7 3.5Z" },
        ].map((item, idx) => (
          <a key={idx} href="#" aria-label={item.aria} className="group relative inline-flex" style={{background: "var(--background)"}} rel="noopener noreferrer">
            <span className="relative flex items-center justify-center w-14 h-14 rounded-xl bg-veterans-yellow border-2 border-black shadow-[8px_8px_0_0_#0a0a0a]">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-black">
                <path d={item.path} />
              </svg>
            </span>
          </a>
        ))}
      </div>
      <div className="w-full flex-row items-center justify-center text-center space-y-2 mt-8">
        <div className="py-2 text-sm font-bold">VAULT / GALLERY</div>
        <div className="py-2 text-sm">© {new Date().getFullYear()} VETERANS. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { AppProvider } from './AppProvider';
import { IConditionalLayoutProps } from '../interfaces/interfaces';

export function ConditionalLayout({ children, manifiest, social }: IConditionalLayoutProps) {
    const pathname = usePathname();

    const headerConfig = pathname === '/veterans' 
        ? { nav: [{ label: "VAULT", hoverEffect: true, href: "/" }, { label: "GALLERY", hoverEffect: false }], manifiest }
        : { nav: [{ label: "VAULT", hoverEffect: false }, { label: "GALLERY", hoverEffect: false, href: "/veterans" }], manifiest };

    return (
        <AppProvider value={{ manifiest, social }}>
        <div className="min-h-dvh flex flex-col">
            <Header {...headerConfig} />
            <main className="flex-1 max-w-full w-full">
            {children}
            </main>
            <Footer social={social} />
        </div>
        </AppProvider>
    );
}
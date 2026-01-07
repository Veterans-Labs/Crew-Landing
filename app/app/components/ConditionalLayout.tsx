'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';
import { AppProvider } from './AppProvider';
import { IConditionalLayoutProps } from '../interfaces/interfaces';

export function ConditionalLayout({ children, manifiest, social }: IConditionalLayoutProps) {
    const pathname = usePathname();

    const headerConfig = { nav: [{ label: "CREW DEX", hoverEffect: false, href: "https://veteranscrew.trade/perp/PERP_SOL_USDC", target: "_blank" }, { label: "GALLERY", hoverEffect: pathname === '/veterans' ? true : false, href: "/veterans", target: "_self" }], manifiest };

    return (
        <AppProvider value={{ manifiest, social }}>
        <div className="flex flex-col">
            <Header {...headerConfig} />
            <main className="max-w-full w-full">
            {children}
            </main>
            <Footer social={social} />
        </div>
        </AppProvider>
    );
}
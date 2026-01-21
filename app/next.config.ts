import type { NextConfig } from 'next'
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants'

const NextConfig = (phase: string) => {
    const nextConfigOptions: NextConfig = {
        reactStrictMode: true,
        poweredByHeader: false,
        experimental: {
            // experimental typescript "statically typed links"
            // https://nextjs.org/docs/app/api-reference/next-config-js/typedRoutes
            typedRoutes: true,
        },
        headers: async () => {
            return [
                {
                    source: '/(.*)',
                    headers: securityHeadersConfig(phase)
                },
            ];
        },
    };
 
    return nextConfigOptions
 
}
 
const securityHeadersConfig = (phase: string) => {
 
    const cspReportOnly = true
 
    const cspHeader = () => {
 
        const upgradeInsecure = (phase !== PHASE_DEVELOPMENT_SERVER && !cspReportOnly) ? 'upgrade-insecure-requests;' : ''
 
        // worker-src is for sentry replay
        // child-src is because safari <= 15.4 does not support worker-src
        const defaultCSPDirectives = `
            default-src 'none';
            object-src 'none';
            worker-src 'self' blob:;
            child-src 'self' blob:;
            manifest-src 'self';
            base-uri 'none';
            form-action 'none';
            frame-ancestors 'none';
            ${upgradeInsecure}
        `
 
        // for production environment allowing vitals.vercel-insights.com
        // based on: https://vercel.com/docs/speed-insights#content-security-policy
        if (process.env.NEXT_PUBLIC_SERVER_ENVIRONMENT === 'PRODUCTION') {
            return `
                ${defaultCSPDirectives}
                font-src 'self' https://veterans-kohl.vercel.app/ https://veteranscrew.xyz/ https://crew-landing-production.up.railway.app/;
                style-src 'self' 'unsafe-inline' https://veterans-kohl.vercel.app/ https://veteranscrew.xyz/ https://crew-landing-production.up.railway.app/;
                script-src 'self' 'unsafe-inline' https://veterans-kohl.vercel.app/ https://veteranscrew.xyz/ https://crew-landing-production.up.railway.app/;
                connect-src 'self' https://vitals.vercel-insights.com https://veterans-kohl.vercel.app/ https://veteranscrew.xyz/ https://crew-landing-production.up.railway.app/;
                img-src 'self' data: https://veterans-kohl.vercel.app/ https://veteranscrew.xyz/ https://crew-landing-production.up.railway.app/;
                media-src 'self' data: https://veterans-kohl.vercel.app/ https://veteranscrew.xyz/ https://crew-landing-production.up.railway.app/;
                frame-src 'none' https://veterans-kohl.vercel.app/ https://veteranscrew.xyz/ https://crew-landing-production.up.railway.app/;
            `
        }
 
        // for dev environment enable unsafe-eval for hot-reload
        if (process.env.NEXT_PUBLIC_SERVER_ENVIRONMENT === 'DEVELOPMENT') {
            return `
                ${defaultCSPDirectives}
                font-src 'self' http://192.168.1.2:1337/;
                style-src 'self' 'unsafe-inline' http://192.168.1.2:1337/;
                script-src 'self' 'unsafe-inline' 'unsafe-eval' http://192.168.1.2:1337/;
                connect-src 'self' http://192.168.1.2:1337/;
                img-src 'self' data: http://192.168.1.2:1337/;
                media-src 'self' http://192.168.1.2:1337/;
                frame-src 'self' http://192.168.1.2:1337/;
            `
        }

        // default to a restrictive policy
        return `
            ${defaultCSPDirectives}
            font-src 'self';
            style-src 'self' 'unsafe-inline';
            script-src 'self' 'unsafe-inline';
            connect-src 'self';
            img-src 'self' data:;
            media-src 'self' data:;
            frame-src 'none';
        `
 
    }
 
    const headers = [
        {
            key: cspReportOnly ? 'Content-Security-Policy-Report-Only' : 'Content-Security-Policy',
            value: cspHeader().replace(/\n/g, ''),
        },
    ]
 
    return headers; 
}

export default NextConfig;
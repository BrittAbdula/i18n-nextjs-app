import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    logging: {
        fetch: {
            enable: true,
            level: 'info',
            prettyPrint: {
                colorize: true,
                translateTime: 'SYS:standard',
                ignore: 'hostname,pid'
            }
        }
    }
};
 
export default withNextIntl(nextConfig);

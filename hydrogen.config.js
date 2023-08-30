
import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: 'wilo.studio',
    storefrontToken: '3619e2a77120857c6e57862b096710b6',
    storefrontApiVersion: '2022-07',
    // storeDomain: import.meta.env.VITE_STORE_DOMAIN || 'default.stud',
    // storefrontToken: import.meta.env.VITE_STOREFRONT_TOKEN || 'default_token',
    // storefrontApiVersion: import.meta.env.VITE_STOREFRONT_API_VERSION || 'default_version',
  },
  server: {
    logger: {
      showQueryTiming: import.meta.env.VITE_SHOW_QUERY_TIMING === 'true',
    },
  },
});

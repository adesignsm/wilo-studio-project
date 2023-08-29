
import {defineConfig} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: import.meta.env.VITE_STORE_DOMAIN || 'default.stud',
    storefrontToken: import.meta.env.VITE_STOREFRONT_TOKEN || 'default_token',
    storefrontApiVersion: import.meta.env.VITE_STOREFRONT_API_VERSION || 'default_version',
  },
  server: {
    logger: {
      showQueryTiming: import.meta.env.VITE_SHOW_QUERY_TIMING === 'true',
    },
  },
});

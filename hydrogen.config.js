import {defineConfig, CookieSessionStorage} from '@shopify/hydrogen/config';

export default defineConfig({
  shopify: {
    storeDomain: 'wilo-candles.myshopify.com',
    storefrontToken: '3619e2a77120857c6e57862b096710b6',
    storefrontApiVersion: '2022-07',
  },
  server: {
    logger: {
      showQueryTiming: import.meta.env.VITE_SHOW_QUERY_TIMING === 'true',
    },
  },
});

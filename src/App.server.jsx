import renderHydrogen from '@shopify/hydrogen/entry-server';
import {Router, FileRoutes, ShopifyProvider, CartProvider} from '@shopify/hydrogen';
import {Suspense} from 'react';

import "./styles/index.css";
import "./styles/cartPage.css";
import "./styles/productDetails.css";
import "./styles/ingredients.css";
import "./styles/policy.css";
import "./styles/shopAll.css";
import "./styles/skin.css";
import "./styles/homeGoods.css";

function App() {
  return (
    <Suspense fallback={null}>
      <ShopifyProvider>
          <CartProvider>
            <Router>
              <FileRoutes />
            </Router>
          </CartProvider>
      </ShopifyProvider>
    </Suspense>
  );
}

export default renderHydrogen(App);

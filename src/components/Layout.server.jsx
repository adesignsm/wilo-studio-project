import { useShopQuery, CacheLong, gql, Seo, Link } from "@shopify/hydrogen";
import { Suspense } from "react";
import Footer from "./Footer.server";
import MobileMenu from "./MobileMenu.client";
import CartBubble from "./CartBubble.client";

import LOGO from "../assets/WILO_LOGO_BLK.svg";

const Layout = ({ children }) => {
  const data = useShopQuery({
      query: SHOP_QUERY,
      cache: CacheLong(),
      preload: true,
  });

  const { 
    data: { 
      shop 
    } 
  } = data;

  return (
    <>
      <Seo type="defaultSeo" data={{title: shop.name, description: shop.description}} />
      <header>
        <div className='announcement-bar'><p>Free shipping on orders over $100 – Canada wide</p></div>
        <div className="container header-inner">
          <div className="header-links">
            <Link to='/' className="header-logo"><img src={LOGO} /></Link>
            <MobileMenu />
            <ul className="header-navigation">
              <li><Link to='collections/shop-all'>SHOP ALL</Link></li>
              <li><Link to='collections/home'>HOME</Link></li>
              <li><Link to='collections/skin'>SKIN</Link></li>
              <li><Link to='pages/ingredients'>INGREDIENTS</Link></li>
            </ul>
          </div>
          <Link to="/pages/Cart" className="header-cart-link">CART
            <CartBubble/>
          </Link>
        </div>
      </header>
      <main>
        <Suspense>{children}</Suspense>
      </main>
      <Footer/>
    </>
  );
}

export default Layout;

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
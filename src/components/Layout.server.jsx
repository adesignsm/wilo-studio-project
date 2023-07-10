import { useShopQuery, CacheLong, gql, Seo, Link } from "@shopify/hydrogen";
import { Suspense } from "react";

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
            <div className="container header-inner">
                <div className="header-links">
                <Link to='/' className="header-logo">
                    LOGO
                </Link>
                <ul className="header-navigation">
                    <li><Link to='collections/shop-all'>SHOP ALL</Link></li>
                    <li><Link to='collections/home'>HOME</Link></li>
                    <li><Link to='collections/skin'>SKIN</Link></li>
                    <li><Link to='pages/ingredients'>INGREDIENTS</Link></li>
                </ul>
                </div>
            </div>
        </header>
      <main>
        <Suspense>{children}</Suspense>
      </main>
      <footer className="footer">
        <ul className="legal">
          <li> Legal </li>
          <li> Terms of Service </li>
          <li> Privacy policy </li>
        </ul>
        <ul className="inquiry">
          <li> Assistance </li>
          <li> Ordering </li>
          <li> Shipping information </li>
          <li> Returns & Exchanges </li>
        </ul>
        <ul className="comapny">
          <li> Comapny </li>
          <li> About </li>
          <li> Contact Us </li>
        </ul>
        <ul className="socials">
          <li> Instagram </li>
          <li> Facebook </li>
          <li> TikTok </li>
        </ul>
      </footer>
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
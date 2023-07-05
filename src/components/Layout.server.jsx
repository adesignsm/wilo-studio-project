// render header and SEO information
import { useShopQuery, CacheLong, gql, Seo, Link } from "@shopify/hydrogen";
import { Suspense } from "react";


export default function Layout ({ children }) {

  const data = useShopQuery({
      query: SHOP_QUERY,
      cache: CacheLong(),
      preload: true,
  });

const { data: { shop } } = data;

  return (
    <>
    <Seo
    type="defaultSeo"
    data={{
        title: shop.name,
        description: shop.description
    }}
    />
    <header>
        <div className="container header-inner">
            <div className="header-links">
            <Link to='/' className="header-logo">
                LOGO
            </Link>
            <ul className="header-navigation">
            <li><a href="#">SHOP ALL</a></li>
            <li><a href="#">HOME</a></li>
            <li><a href="#">SKIN</a></li>
            <li><a href="#">INGREDIENTS</a></li>
            </ul>
            </div>
            <div className="header-cart-link">CART</div>
        </div>
    </header>
 <main>
    <Suspense>{children}</Suspense>
 </main>
    </>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
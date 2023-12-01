import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import Layout from "../../components/Layout.server";
import "../../styles/homeGoods.css";

const HomeGoods = () => {
  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
  });
 
  const { products } = collection || {};

  return (
    <>
      <Layout>
        <div className="home-products-container">
          {products?.edges.map((productEdge) => {
            const { node: product } = productEdge;
            const price = product?.variants?.edges[0]?.node?.priceV2?.amount;

            return (
              <Link key={product.handle} to={`/products/${product.handle}`}>
                {product?.media?.edges[1]?.node?.previewImage?.url && (
                    <div className="grid-container">
                        <Image
                            alt={`Image of ${product.title}`}
                            src={product.media.edges[1].node.previewImage.url}
                            height={product.media.edges[0].node.previewImage.height}
                            width={product.media.edges[0].node.previewImage.width}
                            />
                        <div className="product-info">
                        <h3> {product.title} </h3>
                        <h3> ${price}0 </h3>
                        </div>
                    </div>
                )}
              </Link>
            );
          })}
        </div>
      </Layout>
    </>
  );
};

export default HomeGoods;

const QUERY = gql`
  query {
    collection(handle: "HOME") {
      products(first: 4) {
        edges {
          node {
            handle
            title
            media(first: 2) {
              edges {
                node {
                  previewImage {
                    url
                    width
                    height
                  }
                }
              }
            }
            variants(first: 1) {
                edges {
                  node {
                    priceV2 {
                      amount
                    }
                  }
                }
            }
          }
        }
      }
    }
  }
`;

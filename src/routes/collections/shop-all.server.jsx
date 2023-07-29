import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";
import Layout from "../../components/Layout.server";
import "../../styles/shop-all.css";

const ShopAll = () => {
  const { data, fetchMore } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
    preload: true,
  });


  const { products } = data || {};
  const { edges: productEdges, pageInfo } = products || {};

  const fetchMoreProducts = () => {
    if (pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          cursor: pageInfo.endCursor,
        },
      });
    }
  };

  return (
    <>
      <Layout>
        <div className="all-products-container">
          {productEdges?.map((productEdge) => {
            const { node: product } = productEdge;
            const price = product?.variants?.edges[0]?.node?.priceV2?.amount;

            return (
              <Link key={product.handle} to={`/products/${product.handle}`}>
                {product?.media?.edges[0]?.node?.previewImage?.url && (
                  <div className="all-products-grid-container">
                    <Image className="" 
                    alt={`Image of ${product.title}`} 
                    src={product.media.edges[0].node.previewImage.url}
                    height={product.media.edges[0].node.previewImage.height}
                    width={product.media.edges[0].node.previewImage.width}
                    />
                    <div className="all-products-info">
                    <h3>{product.title}</h3>
                    <h3>${price}0</h3>
                    </div>
                  </div>
                )}
              </Link>
            );
          })}
          {pageInfo.hasNextPage && (
            <button onClick={fetchMoreProducts}>Load More</button>
          )}
        </div>
      </Layout>
    </>
  );
};

export default ShopAll;

const QUERY = gql`
  query AllProducts($cursor: String) {
    products(first: 10, after: $cursor) {
      edges {
        node {
          handle
          title
          media(first: 1) {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

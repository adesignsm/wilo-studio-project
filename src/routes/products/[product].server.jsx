import { 
  useRouteParams, 
  gql, 
  useShopQuery, 
  useServerAnalytics, 
  ShopifyAnalyticsConstants, 
  Seo,
  CartProvider, 
  BuyNowButton,
  AddToCartButton, 
  useProductOptions } from "@shopify/hydrogen";
import { Suspense } from "react";
import Layout from "../../components/Layout.server";

const Product = ({ params }) => {
  const { handle } = useRouteParams(params);

  const { data, loading } = useShopQuery({
    query: PRODUCT_QUERY,
    variables: {
      handle: params.product || '',
    },
  });

  const product = data?.product;

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.product,
      resourceId: product?.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type="product" data={product} />
      </Suspense>
      <section className="">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {product ? (
              <>
                <div className="product-details">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>
                </div>
                <div className="product-variants">
                  <h3>Variants:</h3>
                  {product.variants && product.variants.edges && (
                    <ul>
                      {product.variants.edges.map(({ node }) => (
                        <li key={node.id}>
                          Price: ${node.priceV2.amount} {node.priceV2.currencyCode}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="product-media">
                    {product.images && product.images.edges && (
                        <ul>
                        {product.images.edges.map(({ node }) => (
                            <li key={node.url}>
                            <img src={node.url} alt="" width={node.width} height={node.height} />
                            </li>
                        ))}
                        </ul>
                    )}
                </div>
                <CartProvider>
                <div className="buy-button-container">
                  <AddToCartButton>Add</AddToCartButton>
                </div>
                </CartProvider>
              </>
            ) : (
              <p>No product found</p>
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

export default Product;

const PRODUCT_QUERY = gql`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      images(first: 10) {
        edges {
          node {
            height
            width
            url
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            priceV2 {
              amount
              currencyCode
            }
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
`;

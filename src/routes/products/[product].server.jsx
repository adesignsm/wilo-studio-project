import { 
  useRouteParams, 
  gql, 
  useShopQuery, 
  useServerAnalytics, 
  ShopifyAnalyticsConstants, 
  Seo
} from "@shopify/hydrogen";
import { Suspense } from "react";
import Layout from "../../components/Layout.server";
import ProductDetails from "../../components/ProductDetails.Client";


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
        <section className="">
          {loading ? (
            <p>Loading...</p>
            ) : (
              <>
              {product ? (
                <ProductDetails product={product}/>
                ) : (
                  <p>No product found</p>
                  )}
            </>
          )}
        </section>
        </Suspense>
    </Layout>
  );
}

export default Product;


const PRODUCT_QUERY = gql`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      description
      tags
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
            id
            availableForSale
            priceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
          }
        }
      }
      seo {
        title
        description
      }
      media(first: 10) {  # Include the media field to retrieve video data
        edges {
          node {
            mediaContentType
            ... on Video {  # Use the ... on Video fragment for video-specific fields
              sources {
                url
                format
              }
            }
          }
        }
      }
    }
  }
`;

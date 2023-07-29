import { useShopQuery, gql, CacheLong, useRouteParams } from "@shopify/hydrogen";

const ProductDetails = () => {
    
    return (
        <section>
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
                  <div className="buy-button-container">
                  </div>
                </>
              ) : (
                  <p>No product found</p>
                  )}
            </>
          )}
          </section>
    )
}

export default ProductDetails;
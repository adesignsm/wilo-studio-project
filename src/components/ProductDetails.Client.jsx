import { 
useProductOptions,
AddToCartButton, 
ProductOptionsProvider} from "@shopify/hydrogen";

const ProductDetails = ({ product }) => {
  
  return (
    <ProductOptionsProvider data={product}>
    <ProductForm product={product}/>
    </ProductOptionsProvider>
  )
  
};

const ProductForm = ({product}) => {
  
  const { selectedVariant, setSelectedOption } = useProductOptions();

  return (
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
                <AddToCartButton
                  variantId={selectedVariant ? selectedVariant.id : node.id}
                  quantity={1}
                >
                ADD TO CART
                </AddToCartButton>
               
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
                    </>
  );
};

export default ProductDetails;

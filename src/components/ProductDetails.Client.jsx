import { 
useProductOptions,
AddToCartButton, 
ProductOptionsProvider,
ProductPrice,
CartLineProvider,
useCart,
CartLineQuantityAdjustButton,
CartLineQuantity
} from "@shopify/hydrogen";
import "../styles/productDetails.css";

const ProductDetails = ({ product }) => {
  
  return (
    <ProductOptionsProvider data={product}>
    <ProductForm product={product}/>
    </ProductOptionsProvider>
  )
  
};

const ProductForm = ({product}) => {
  console.log(product);
  
  const { selectedVariant, setSelectedOption } = useProductOptions();

  const isOutOfStock = !selectedVariant?.availableForSale || false;

  const {lines} = useCart();

  return (
    <>
       <div className="product-container">
        <div className="product-name">
          <h1>{product.title}</h1>
          <div className="product-details">
            <p>Info</p>
            <p>{product.description}</p>
          </div>
          <ProductPrice 
            className="product-page-price" 
            withoutTrailingZeros
            data={product}
            variantId={selectedVariant.id}
          />
          <div className="add-to-cart-container">
          <AddToCartButton disabled={isOutOfStock} className="add-to-cart" >
        {isOutOfStock ? 'Out of stock' : 'Add to cart'}
          </AddToCartButton>
        </div>
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
      </div>

                    </>
        
  );
};

export default ProductDetails;

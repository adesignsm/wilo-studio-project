import { useEffect, useState } from 'react';
import { 
  useProductOptions,
  AddToCartButton, 
  ProductOptionsProvider,
  ProductPrice,
  CartLineProvider,
  useCart,
  CartLineQuantityAdjustButton,
  CartLineQuantity,
  Link
  } from "@shopify/hydrogen";
  import "../styles/productDetails.css";
  
  const ProductDetails = ({ product }) => { 
    return (
      <ProductOptionsProvider data={product}>
        <ProductForm product={product}/>
      </ProductOptionsProvider>
    )
  };
  
  const ProductForm = ({ product }) => {
    const { selectedVariant, setSelectedOption } = typeof window !== 'undefined' ? useProductOptions() : {};
    const isOutOfStock = !selectedVariant?.availableForSale || false;
    const { lines } = useCart();
    const firstLine = lines[0];
    const [toggleAutoPlay, setToggleAutoPlay] = useState(false);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        const isMobile = window.matchMedia('(min-width: 375px)').matches;
        if (isMobile) {
          setToggleAutoPlay(true);
        } else {
          setToggleAutoPlay(false);
        }
      }
    }, []);

    return (
      <>
        <div className="product-container">
          <div className="product-name">
            <h1>{product.title}</h1>
            <div className="product-details">
              <p>Info</p>
              <p>{product.description}</p>
            </div>
            {product.tags.length > 0 && 
              <div className="ingredients-details">
                <p>Ingredients</p>
                <div className="ingredients-list">
                  {product.tags.map((ingredient, index) => (
                    <span key={index}>
                      <Link to={`ingredients/${ingredient.toLowerCase().replace(" ", "-")}`} className="tag-link">
                        {ingredient}
                      </Link>
                      {index < product.tags.length - 1 && <span>, </span>}
                    </span>
                  ))}
                </div>
              </div>
            }
            <ProductPrice className="product-page-price" withoutTrailingZeros data={product} variantId={selectedVariant.id} />
            <div className="add-to-cart-container">
                <div className="add-to-cart-box">
                  <AddToCartButton disabled={isOutOfStock} className="add-to-cart" >
                    {isOutOfStock ? 'Out of stock' : 'Add to cart'}
                   </AddToCartButton>
                </div>
                {/* <div className="qty-box">
                  {firstLine && 
                    <CartLineProvider key={firstLine?.id || 'defaultKey'} line={firstLine || 0}>
                      <CartLineQuantityAdjust />
                    </CartLineProvider>
                  }
                </div> */}
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
                {product.media && product.media.edges && (
                  product.media.edges.map(({ node }) => {
                    if (node.mediaContentType === "VIDEO") {
                      return (
                        <li key={node.sources[0].url}>
                          <video autoPlay={toggleAutoPlay} muted={true} loop={true} playsInline={true}>
                            <source src={node.sources[0].url} type="video/mp4"></source>
                          </video>
                        </li>
                      )
                    }
                  })
                )}
              </ul>
            )}
          </div>
        </div>
      </>
    );
  };
  
  export default ProductDetails;
  
  const CartLineQuantityAdjust = () => {
    return (
      <>
       <div className="cart-quantity-selector">
                <CartLineQuantityAdjustButton adjust="decrease">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                    </svg>
                </CartLineQuantityAdjustButton>
                  <CartLineQuantity />
                <CartLineQuantityAdjustButton adjust="increase">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </CartLineQuantityAdjustButton>
            </div>
      </>
    );
  };
    
import { useEffect, useState, Suspense } from "react";
import {
  useProductOptions,
  AddToCartButton,
  ProductOptionsProvider,
  ProductPrice,
  Link,
} from "@shopify/hydrogen";
import "../styles/productDetails.css";

const ProductDetails = ({ product }) => {
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProductOptionsProvider data={product}>
      <Suspense fallback={<ProductFormSkeleton product={product} />}>
        <ProductForm product={product} />
      </Suspense>
    </ProductOptionsProvider>
  );
};

const ProductFormSkeleton = ({ product }) => {
  return (
    <div className="product-container">
      <div className="product-name">
        <h1>{product?.title || "Loading..."}</h1>
        <div className="product-details">
          <p>Info</p>
          <p>{product?.description || "Loading product details..."}</p>
        </div>
        <div className="add-to-cart-container">
          <div className="add-to-cart-box">
            <button disabled className="add-to-cart">
              Loading...
            </button>
          </div>
        </div>
      </div>
      <div className="product-media">
        {product?.images?.edges?.[0] && (
          <ul>
            <li>
              <img
                src={product.images.edges[0].node.url}
                alt=""
                width={product.images.edges[0].node.width}
                height={product.images.edges[0].node.height}
              />
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export const ProductForm = ({ product }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [toggleAutoPlay, setToggleAutoPlay] = useState(false);

  let productOptions;
  let selectedVariant;
  let isOutOfStock = true;

  try {
    productOptions = useProductOptions();
    selectedVariant = productOptions?.selectedVariant;
    isOutOfStock = !selectedVariant?.availableForSale;
  } catch (error) {
    console.warn("ProductOptions hook failed:", error);
    // Fallback to first variant if available
    selectedVariant = product?.variants?.edges?.[0]?.node;
    isOutOfStock = !selectedVariant?.availableForSale;
  }

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      try {
        const isMobile = window.matchMedia("(min-width: 375px)").matches;
        setToggleAutoPlay(isMobile);
      } catch (error) {
        console.warn("Media query failed:", error);
        setToggleAutoPlay(false);
      }
    }
  }, []);

  if (!isMounted) {
    return <ProductFormSkeleton product={product} />;
  }

  return (
    <div className="product-container">
      <div className="product-name">
        <h1>{product.title}</h1>
        <div className="product-details">
          <p>Info</p>
          <p>{product.description}</p>
        </div>
        {product.tags && product.tags.length > 0 && (
          <div className="ingredients-details">
            <p>Ingredients</p>
            <div className="ingredients-list">
              {product.tags.map((ingredient, index) => (
                <span key={index}>
                  <Link
                    to={`/pages/ingredients/${ingredient.toLowerCase().replace(" ", "-")}`}
                    className="tag-link"
                  >
                    {ingredient}
                  </Link>
                  {index < product.tags.length - 1 && <span>, </span>}
                </span>
              ))}
            </div>
          </div>
        )}
        {selectedVariant && (
          <ProductPrice
            className="product-page-price"
            withoutTrailingZeros
            data={product}
            variantId={selectedVariant.id}
          />
        )}
        <div className="add-to-cart-container">
          <div className="add-to-cart-box">
            <AddToCartButton disabled={isOutOfStock} className="add-to-cart">
              {isOutOfStock ? "Out of stock" : "Add to cart"}
            </AddToCartButton>
          </div>
        </div>
      </div>

      <div className="product-media">
        {product.images && product.images.edges && (
          <ul>
            {product.images.edges.map(({ node }) => (
              <li key={node.url}>
                <img
                  src={node.url}
                  alt=""
                  width={node.width}
                  height={node.height}
                />
              </li>
            ))}
            {product.media &&
              product.media.edges &&
              product.media.edges.map(({ node }) => {
                if (node.mediaContentType === "VIDEO" && node.sources?.[0]) {
                  return (
                    <li key={node.sources[0].url}>
                      <video
                        autoPlay={toggleAutoPlay}
                        muted={true}
                        loop={true}
                        playsInline={true}
                      >
                        <source src={node.sources[0].url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </li>
                  );
                }
                return null;
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

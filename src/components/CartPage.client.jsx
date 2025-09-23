"use client";

import {
  useCart,
  CartLineProvider,
  Image,
  useCartLine,
  Money,
  Link,
  CartCost,
  CartLineQuantity,
  CartLineQuantityAdjustButton,
} from "@shopify/hydrogen";
import { Suspense, useEffect, useRef, useState } from "react";
import "../styles/cartPage.css";

const CartPage = () => {
  return (
    <Suspense fallback={null}>
      <CartTable />
    </Suspense>
  );
};

export default CartPage;

const CartTable = () => {
  const scene = useRef();
  const { lines, checkoutUrl, status } = useCart();
  const [cartProductImages, setCartProductImages] = useState([]);
  const [engine, setEngine] = useState(null);
  const [matterInitialized, setMatterInitialized] = useState(false);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (
      lines.length === 0 ||
      matterInitialized ||
      typeof window === "undefined"
    )
      return;

    const init = async () => {
      const Matter = await import("matter-js");
      const engineInstance = Matter.Engine.create();
      setEngine(engineInstance);

      setCartProductImages(lines.map((p) => p.merchandise.image.url));

      const checkDOM = () => {
        const container = document.querySelector(".cart-container");
        if (container && container.offsetHeight > 0) {
          // Initialize Matter with known container height
          cleanupRef.current = initializeMatter(
            Matter,
            engineInstance,
            lines,
            container.offsetHeight,
          );
          setMatterInitialized(true);
        } else {
          requestAnimationFrame(checkDOM);
        }
      };

      checkDOM();
    };

    init();

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [lines, matterInitialized]);

  if (lines.length === 0)
    return status === "idle" ? <div>No items in cart</div> : null;

  return (
    <div id="cart-page-container">
      <div id="canvas-holster" className="column">
        <div ref={scene} />
      </div>
      <div className="cart-container">
        <table className="cart-table">
          <tbody className="product-line">
            {lines.map((line) => (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            ))}
          </tbody>
        </table>
        <div className="cart-footer">
          <tbody className="prices-line">
            <tr>
              <td colSpan="2"></td>
              <td>Sub total:</td>
              <td>
                <CartCost withoutTrailingZeros />
              </td>
            </tr>
            <tr>
              <td colSpan="2"></td>
              <td>Total:</td>
              <td>
                <CartCost withoutTrailingZeros />
              </td>
            </tr>
          </tbody>
          <Link to={checkoutUrl} className="checkout-button">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

const initializeMatter = (Matter, engineInstance, lines, containerHeight) => {
  const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } =
    Matter;

  const cw = window.innerWidth / 2;
  const ch = containerHeight;

  const render = Render.create({
    element: document.querySelector("#canvas-holster"),
    engine: engineInstance,
    options: {
      width: cw,
      height: ch,
      wireframes: false,
      background: "transparent",
    },
  });

  // Boundaries
  World.add(engineInstance.world, [
    Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
    Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
    Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
    Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
  ]);

  Runner.run(engineInstance);
  Render.run(render);
  engineInstance.world.gravity.y = 0.2;

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engineInstance, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } },
  });
  World.add(engineInstance.world, mouseConstraint);
  render.mouse = mouse;

  // Add balls
  lines.forEach((line, i) => {
    const imageUrl = line.merchandise.image.url;
    const ball = Bodies.circle(Math.random() * cw, Math.random() * -20, 70, {
      restitution: 1,
      friction: 0,
      density: 20,
      render: { sprite: { texture: imageUrl, xScale: 0.2, yScale: 0.2 } },
    });
    World.add(engineInstance.world, ball);
  });

  // Cleanup
  return () => {
    Render.stop(render);
    World.clear(engineInstance.world);
    Engine.clear(engineInstance);
    render.canvas.remove();
    render.canvas = null;
    render.context = null;
    render.textures = {};
  };
};

const CartLineItem = () => {
  const { lineId, merchandise, cost } = useCartLine();
  const { image, product } = merchandise;

  return (
    <tr key={lineId}>
      <td>
        <Image className="line-item-image" data={image} />
      </td>
      <td>
        <Link
          to={`/products/${product.handle}`}
          className="line-item-product-title"
        >
          {product.title}
        </Link>
      </td>
      <td>
        <div className="cart-quantity-selector">
          <CartLineQuantityAdjustButton adjust="decrease">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
              />
            </svg>
          </CartLineQuantityAdjustButton>
          <CartLineQuantity />
          <CartLineQuantityAdjustButton adjust="increase">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </CartLineQuantityAdjustButton>
        </div>
      </td>
      <td>
        <CartLineQuantityAdjustButton
          as="div"
          className="cart-remove"
          adjust="remove"
        >
          Remove
        </CartLineQuantityAdjustButton>
      </td>
      <td>
        <Money withoutTrailingZeros data={cost.totalAmount} />
      </td>
    </tr>
  );
};

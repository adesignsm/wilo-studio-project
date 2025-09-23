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
  const sceneRef = useRef();
  const { lines, checkoutUrl, status } = useCart();
  const [cartProductImages, setCartProductImages] = useState([]);
  const [matterInitialized, setMatterInitialized] = useState(false);
  const cleanupRef = useRef(null);

  useEffect(() => {
    if (!lines.length || matterInitialized || typeof window === "undefined")
      return;

    const init = async () => {
      // Dynamically import Matter.js to avoid server-side require()
      const MatterModule = await import("matter-js");
      const Matter = MatterModule.default || MatterModule;
      const engine = Matter.Engine.create();

      setCartProductImages(lines.map((line) => line.merchandise.image.url));

      // Wait until DOM is rendered and container has height
      const waitForDOM = () => {
        const container = document.querySelector(".cart-container");
        if (container && container.offsetHeight > 0) {
          cleanupRef.current = initializeMatter(
            Matter,
            engine,
            lines,
            container.offsetHeight,
            sceneRef.current,
          );
          setMatterInitialized(true);
        } else {
          requestAnimationFrame(waitForDOM);
        }
      };
      waitForDOM();
    };

    init();

    return () => {
      if (cleanupRef.current) cleanupRef.current();
    };
  }, [lines, matterInitialized]);

  if (!lines.length)
    return status === "idle" ? <div>No items in cart</div> : null;

  return (
    <div id="cart-page-container">
      <div id="canvas-holster" className="column" ref={sceneRef}></div>
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

const initializeMatter = (Matter, engine, lines, containerHeight, sceneEl) => {
  const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } =
    Matter;

  const cw = window.innerWidth / 2;
  const ch = containerHeight;

  const render = Render.create({
    element: sceneEl,
    engine,
    options: {
      width: cw,
      height: ch,
      wireframes: false,
      background: "transparent",
    },
  });

  // Add boundaries
  World.add(engine.world, [
    Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
    Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
    Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
    Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true }),
  ]);

  Runner.run(engine);
  Render.run(render);
  engine.world.gravity.y = 0.2;

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: 0.2, render: { visible: false } },
  });
  World.add(engine.world, mouseConstraint);
  render.mouse = mouse;

  // Add balls
  lines.forEach((line) => {
    const imageUrl = line.merchandise.image.url;
    const ball = Bodies.circle(Math.random() * cw, Math.random() * -20, 70, {
      restitution: 1,
      friction: 0,
      density: 20,
      render: { sprite: { texture: imageUrl, xScale: 0.2, yScale: 0.2 } },
    });
    World.add(engine.world, ball);
  });

  // Cleanup function
  return () => {
    Render.stop(render);
    World.clear(engine.world);
    Engine.clear(engine);
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
            -
          </CartLineQuantityAdjustButton>
          <CartLineQuantity />
          <CartLineQuantityAdjustButton adjust="increase">
            +
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

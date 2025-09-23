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
    <Suspense>
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

  useEffect(() => {
    if (
      lines.length === 0 ||
      matterInitialized ||
      typeof window === "undefined"
    )
      return;

    const init = async () => {
      const $ = (await import("jquery")).default;
      const Matter = await import("matter-js");
      const engineInstance = Matter.Engine.create();

      setEngine(engineInstance);
      setCartProductImages(lines.map((p) => p.merchandise.image.url));

      // Small delay to ensure DOM elements are rendered
      setTimeout(() => {
        const cleanup = initializeMatter($, Matter, engineInstance, lines);
        setMatterInitialized(true);

        // Optional: cleanup on unmount
        return () => cleanup();
      }, 500);
    };

    init();
  }, [lines, matterInitialized]);

  const initializeMatter = ($, Matter, engineInstance, lines) => {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } =
      Matter;

    const cw = window.innerWidth / 2;
    const ch = $(".cart-container").height();

    const render = Render.create({
      element: scene.current,
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
      Bodies.rectangle(cw / 2, -10, 0, 20, { isStatic: false }),
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
    cartProductImages.forEach((imageUrl) => {
      const ball = Bodies.circle(Math.random() * cw, Math.random() * -20, 70, {
        restitution: 1,
        friction: 0,
        density: 20,
        render: { sprite: { texture: imageUrl, xScale: 0.2, yScale: 0.2 } },
      });
      World.add(engineInstance.world, ball);
    });

    // Cleanup function
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

  if (lines.length === 0)
    return status === "idle" ? <div>No items in cart</div> : null;

  return (
    <div id="cart-page-container">
      <div id="canvas-holster" className="column">
        <div ref={scene} />
      </div>
      <div className="cart-container">{/* ...rest of your table code */}</div>
    </div>
  );
};

const CartLineItem = () => {
  const { lineId, merchandise, cost } = useCartLine();

  const { image, product, selectedOptions } = merchandise;

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
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </CartLineQuantityAdjustButton>
      </td>
      <td>
        <Money withoutTrailingZeros data={cost.totalAmount} />
      </td>
    </tr>
  );
};

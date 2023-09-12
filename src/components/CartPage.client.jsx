import {
    useCart,
    CartLineProvider,
    Image,
    useCartLine,
    Money,
    Link,
    CartCost,
    CartLineQuantity,
    CartLineQuantityAdjustButton
} from '@shopify/hydrogen';
import { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint } from 'matter-js';
import $ from "jquery";
import { Suspense, useEffect, useRef, useState } from 'react';
import "../styles/cartPage.css";


const CartPage = () => {

    return (

        <Suspense>
            <CartTable/>
        </Suspense>
        
    )
}

export default CartPage;

const CartTable = () => {
    const scene = useRef();
    const engine = useRef(Engine.create());
    const { lines, checkoutUrl, status } = useCart();
    const cartProductImages = [];
    const [matterInitialized, setMatterInitialized] = useState(false);

    useEffect(() => {
        if (lines.length > 0 && !matterInitialized) {
          lines.forEach((product) => {
            cartProductImages.push(product.merchandise.image.url);
          });
    
          if (cartProductImages.length > 0) {
            setTimeout(() => {
                initializeMatter();
                setMatterInitialized(true);
            }, 500);
          }
        }
    }, [lines, cartProductImages, matterInitialized]);

    const initializeMatter = () => {
        const cw = window.innerWidth / 2;
        const ch = $(".cart-container").height();

        console.log(ch)

        const render = Render.create({
            element: scene.current,
            engine: engine.current,
            options: {
                width: cw,
                height: ch,
                wireframes: false,
                background: 'transparent'
            }
        })

        World.add(engine.current.world, [
            Bodies.rectangle(cw / 2, -10, 0, 20, { isStatic: false }),
            Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
            Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
            Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
        ])

        Runner.run(engine.current)
        Render.run(render);

        engine.current.world.gravity.y = 0.2;

        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine.current, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });
    
        World.add(engine.current.world, mouseConstraint);
    
        render.mouse = mouse;

        addBalls();

        return () => {
            Render.stop(render)
            World.clear(engine.current.world)
            Engine.clear(engine.current)
            render.canvas.remove()
            render.canvas = null
            render.context = null
            render.textures = {}
        }
    }

    const addBalls = () => {
        for (let i = 0; i < cartProductImages.length; i++) {
          const imageUrl = cartProductImages[i];
    
          // Create a ball based on the image URL
          const ball = Bodies.circle(
            Math.random() * window.innerWidth / 2, Math.random() * -20, 70,
            {
              restitution: 1, // Adjust the restitution (bounce) as needed
              friction: 0, // Adjust friction as needed
              density: 20, // Adjust density as needed
              render: {
                sprite: {
                  texture: imageUrl,
                  xScale: 0.5, // Adjust the scale as needed
                  yScale: 0.5, // Adjust the scale as needed
                },
              },
            }
          );
    
          World.add(engine.current.world, [ball]);
        }
      };

    if (lines.length === 0) {
        if(status == 'idle') {
            return <div>No items are currently in the cart</div>
        }
    } else {


        return (
            <>
                <div id="cart-page-container">
                    <div id="canvas-holster" className="column">
                        <div ref={scene}/>
                    </div>
                    <div className='cart-container'>
                       <table className='cart-table'>
                            <tbody className='product-line'>
                                {lines.map(line => {
                                        return (
                                            <CartLineProvider key={line.id} line={line} >
                                                <CartLineItem />
                                            </CartLineProvider>
                                        )
                                    })}
                            </tbody>
                        </table>
                        <div className="cart-footer">
                            <tbody className='prices-line'>
                                <tr>
                                    <td colSpan="2"></td>
                                    <td>Sub total:</td>
                                    <td><CartCost withoutTrailingZeros /></td>
                                </tr>
                                <tr>
                                    <td colSpan="2"></td>
                                    <td>Total:</td>
                                    <td><CartCost withoutTrailingZeros /></td>
                                </tr>
                            </tbody>
                            <Link to={checkoutUrl} className="checkout-button">Checkout</Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const CartLineItem = () => {
    
    const { lineId, merchandise, cost } = useCartLine();

    const { image, product, selectedOptions } = merchandise

    return (
        <tr key={lineId}>
            <td>
                <Image className="line-item-image" data={image} />
            </td>
            <td>
                <Link to={`/products/${product.handle}`} className="line-item-product-title">{product.title}</Link>
            </td>
            <td>
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
            </td>
            <td>
            <CartLineQuantityAdjustButton as="div" className='cart-remove' adjust='remove'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </CartLineQuantityAdjustButton>
            </td>
            <td>
                <Money withoutTrailingZeros data={cost.totalAmount} />
            </td>
        </tr>
    )
}


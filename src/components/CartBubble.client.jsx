import { useCart } from '@shopify/hydrogen';

const CartBubble = () => {

  const { totalQuantity } = useCart();

  if(totalQuantity < 1) {
    return null;
  }

  return (
    <span>({ totalQuantity })</span>
  )
}

export default CartBubble;
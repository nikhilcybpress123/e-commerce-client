import React from 'react'
import CartItem from '../components/CartItem';

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items); 

  return (
    <div className="cart-page">
      <h2 className="cart-title">Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <button className="checkout-btn">Checkout</button>
    </div>
  );
};
export default Cart

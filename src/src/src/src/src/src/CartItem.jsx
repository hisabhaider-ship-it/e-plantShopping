import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.replace('$', ''));
    return (costNum * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <h3 style={{ margin: '15px 0', color: '#2e7d32' }}>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div style={{ flex: 1, marginLeft: '20px' }}>
              <h4>{item.name}</h4>
              <p>Unit Price: {item.cost}</p>
              <p>Subtotal: ${calculateTotalCost(item)}</p>
              <div style={{ marginTop: '10px' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '2px 8px' }}>-</button>
                <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '2px 8px' }}>+</button>
              </div>
            </div>
            <button onClick={() => handleRemove(item)} style={{ backgroundColor: '#d32f2f', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
              Delete
            </button>
          </div>
        ))
      )}

      <div style={{ marginTop: '30px', display: 'flex', gap: '20px' }}>
        <button className="get-started-btn" onClick={onContinueShopping}>Continue Shopping</button>
        <button className="get-started-btn" style={{ backgroundColor: '#0288d1' }} onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;

import './ModernEcommerce.css';
import './CartTable.css';

const CartPage = ({ cart, onBack, onUpdateQuantity, onRemove, onClearAll, onCheckout }) => {
  const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="full-width-container">
      <div className="products-container">
        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>
        
        <div className="vendor-banner">
          <h2>Shopping Cart ({cart.length} items)</h2>
        </div>

        {cart.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🛒</div>
            <h3>Your cart is empty</h3>
            <p>Add some items to get started</p>
            <button className="shop-items-btn" onClick={onBack}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-table-container">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => (
                    <tr key={item._id}>
                      <td>
                        <div className="item-image">
                          {item.image ? (
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                          ) : (
                            '📦'
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="item-name">{item.name}</div>
                      </td>
                      <td>
                        <div className="item-price">Rs. {item.price}</div>
                      </td>
                      <td>
                        <div className="quantity-controls">
                          <button 
                            className="qty-btn minus"
                            onClick={() => onUpdateQuantity(item._id, -1)}
                          >
                            -
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button 
                            className="qty-btn plus"
                            onClick={() => onUpdateQuantity(item._id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="total-price">Rs. {item.price * item.quantity}</div>
                      </td>
                      <td>
                        <button 
                          className="remove-btn"
                          onClick={() => onRemove(item._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="cart-summary">
              <div className="grand-total">
                <h3>Grand Total:</h3>
                <span className="amount">Rs. {grandTotal}</span>
              </div>
              
              <div className="checkout-actions">
                <button className="clear-cart-btn" onClick={onClearAll}>
                  Clear Cart
                </button>
                <button className="checkout-btn" onClick={onCheckout}>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
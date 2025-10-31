import { useState } from 'react';
import './ModernEcommerce.css';
import './CartTable.css';

const CheckoutPage = ({ cart, onBack, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    paymentMethod: 'cash',
    address: '',
    state: '',
    city: '',
    pincode: ''
  });

  const grandTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      items: cart,
      totalAmount: grandTotal
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const savedOrder = await response.json();
        onSuccess({
          ...orderData,
          id: savedOrder._id,
          orderDate: new Date(savedOrder.createdAt).toLocaleDateString()
        });
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order');
    }
  };

  return (
    <div className="full-width-container">
      <div className="products-container">
        <button className="back-button" onClick={onBack}>
          ← Back to Cart
        </button>
        
        <div className="vendor-banner">
          <h2>Checkout</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
          {/* Checkout Form */}
          <div className="cart-table-container">
            <div style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#212529', fontSize: '1.5rem' }}>Delivery Details</h3>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="checkout-input"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.number}
                    onChange={(e) => setFormData({...formData, number: e.target.value})}
                    required
                    className="checkout-input"
                  />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="checkout-input"
                  />
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    className="checkout-select"
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="upi">UPI Payment</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Complete Address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  required
                  className="checkout-input"
                  style={{ width: '100%', marginBottom: '1rem' }}
                />
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <input
                    type="text"
                    placeholder="State"
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    required
                    className="checkout-input"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    required
                    className="checkout-input"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Pincode"
                  value={formData.pincode}
                  onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                  required
                  className="checkout-input"
                  style={{ width: '100%', marginBottom: '2rem' }}
                />

                <button type="submit" className="checkout-btn" style={{ width: '100%', fontSize: '1.2rem', padding: '1rem' }}>
                  Place Order - Rs. {grandTotal}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="cart-table-container">
            <div style={{ padding: '2rem' }}>
              <h3 style={{ marginBottom: '1.5rem', color: '#212529', fontSize: '1.5rem' }}>Order Summary</h3>
              
              <div style={{ marginBottom: '1.5rem' }}>
                {cart.map(item => (
                  <div key={item._id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #e9ecef'
                  }}>
                    <div>
                      <div style={{ fontWeight: '600', color: '#212529' }}>{item.name}</div>
                      <div style={{ fontSize: '0.9rem', color: '#6c757d' }}>Qty: {item.quantity} × Rs. {item.price}</div>
                    </div>
                    <div style={{ fontWeight: '600', color: '#198754' }}>Rs. {item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              
              <div style={{
                borderTop: '2px solid #e9ecef',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ fontSize: '1.25rem', fontWeight: '600', color: '#212529' }}>Total Amount:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#198754' }}>Rs. {grandTotal}</span>
              </div>
              
              <div style={{
                background: '#f8f9fa',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1rem',
                fontSize: '0.9rem',
                color: '#6c757d'
              }}>
                📝 Your order will be processed within 24 hours. You will receive a confirmation email shortly.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
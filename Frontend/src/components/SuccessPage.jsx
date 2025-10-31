import './Auth.css';

const SuccessPage = ({ orderData, onHome, onDashboard }) => {
  return (
    <div className="success-page-fullscreen">
      <div className="success-container">
        <div className="success-hero">
          <div className="success-checkmark">✓</div>
          <h1>Order Confirmed!</h1>
          <p>Thank you for your order. We'll send you a confirmation email shortly.</p>
          <div className="order-number">Order #{orderData._id?.slice(-8) || 'EM' + Date.now().toString().slice(-6)}</div>
        </div>

        <div className="success-main">
          <div className="order-details-card">
            <div className="summary-header">
              <h3>Order Summary</h3>
              <div className="order-total">Rs. {orderData.totalAmount}</div>
            </div>
            
            <div className="items-list">
              <h4>Items Ordered</h4>
              {orderData.items.map(item => (
                <div key={item._id} className="item-row">
                  <div className="item-info">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                  </div>
                  <div className="item-price">Rs. {item.price * item.quantity}</div>
                </div>
              ))}
            </div>
            
            <div className="payment-info">
              <div className="payment-row">
                <span>Payment Method</span>
                <span>{orderData.paymentMethod.toUpperCase()}</span>
              </div>
              <div className="payment-row">
                <span>Order Date</span>
                <span>{orderData.orderDate}</span>
              </div>
            </div>
          </div>

          <div className="delivery-details-card">
            <h3>Delivery Information</h3>
            
            <div className="delivery-section">
              <h4>Contact Details</h4>
              <div className="info-box">
                <div className="info-row">
                  <span className="info-label">Name</span>
                  <span className="info-value">{orderData.name}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Phone</span>
                  <span className="info-value">{orderData.number}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Email</span>
                  <span className="info-value">{orderData.email}</span>
                </div>
              </div>
            </div>
            
            <div className="delivery-section">
              <h4>Delivery Address</h4>
              <div className="address-box">
                <div className="address-line">{orderData.address}</div>
                <div className="address-line">{orderData.city}, {orderData.state} - {orderData.pincode}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="success-footer">
          <div className="action-buttons">
            <button className="btn-secondary" onClick={onHome}>
              Continue Shopping
            </button>
            <button className="btn-primary" onClick={onDashboard}>
              View Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
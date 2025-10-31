import { useState, useEffect } from 'react';
import './ModernEcommerce.css';

const OrderStatusPage = ({ onBack, user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const orders = await response.json();
        const formattedOrders = orders.map(order => ({
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          items: order.items,
          totalAmount: order.totalAmount,
          status: order.status,
          vendor: 'Multiple Vendors'
        }));
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
    setLoading(false);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return '#28a745';
      case 'processing': return '#fd7e14';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  if (loading) {
    return (
      <div className="full-width-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="full-width-container">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h1 className="page-title">Order Status</h1>
      </div>

      <div className="content-container">
        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No Orders Found</h3>
            <p>You haven't placed any orders yet. Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-id">Order #{order.id}</div>
                  <div 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </div>
                </div>
                
                <div className="order-details">
                  <div className="order-info">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{order.date}</span>
                  </div>
                  <div className="order-info">
                    <span className="info-label">Vendor:</span>
                    <span className="info-value">{order.vendor}</span>
                  </div>
                  <div className="order-info">
                    <span className="info-label">Total:</span>
                    <span className="info-value">Rs. {order.totalAmount}</span>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items.map((item, index) => (
                    <div key={index} className="order-item">
                      <span>{item.name} x {item.quantity}</span>
                      <span>Rs. {item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusPage;
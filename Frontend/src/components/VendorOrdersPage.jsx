import { useState, useEffect } from 'react';
import './ModernEcommerce.css';

const VendorOrdersPage = ({ onBack, user }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVendorOrders();
  }, []);

  const fetchVendorOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/orders/vendor-orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const orders = await response.json();
        setOrders(orders);
      }
    } catch (error) {
      console.error('Error fetching vendor orders:', error);
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/vendor-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchVendorOrders();
        alert('Order status updated successfully!');
      }
    } catch (error) {
      alert('Error updating order status');
    }
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
        <h1 className="page-title">Order Management</h1>
      </div>

      <div className="content-container">
        {orders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No Orders Found</h3>
            <p>No orders containing your products yet.</p>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-id">Order #{order._id.slice(-6)}</div>
                  <div 
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </div>
                </div>
                
                <div className="order-details">
                  <div className="order-info">
                    <span className="info-label">Customer:</span>
                    <span className="info-value">{order.name}</span>
                  </div>
                  <div className="order-info">
                    <span className="info-label">Date:</span>
                    <span className="info-value">{new Date(order.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="order-info">
                    <span className="info-label">Total:</span>
                    <span className="info-value">Rs. {order.totalAmount}</span>
                  </div>
                  <div className="order-info">
                    <span className="info-label">Payment:</span>
                    <span className="info-value">{order.paymentMethod.toUpperCase()}</span>
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

                <div className="order-actions">
                  {order.status === 'Processing' ? (
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className="status-select-dropdown"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <div className="status-final">
                      Status: {order.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorOrdersPage;
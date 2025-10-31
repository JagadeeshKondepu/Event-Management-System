import { useState, useEffect } from 'react';
import ImageUpload from './ImageUpload';
import VendorOrdersPage from './VendorOrdersPage';
import './Auth.css';
import './ModernEcommerce.css';

const VendorDashboard = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [activeView, setActiveView] = useState('main');
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    stock: '',
    image: ''
  });

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/events', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setEvents(data.filter(event => event.vendor._id === user.id));
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const url = editingProduct 
        ? `http://localhost:5000/api/events/${editingProduct._id}`
        : 'http://localhost:5000/api/events';
      
      const method = editingProduct ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', description: '', category: '', price: '', stock: '', image: '' });
        setEditingProduct(null);
        fetchMyEvents();
        alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
      }
    } catch (error) {
      alert('Error saving product');
    }
  };

  const editProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      category: product.category || '',
      price: product.price,
      stock: product.stock || '',
      image: product.image || ''
    });
  };

  const deleteProduct = async (id) => {
    if (confirm('Delete this product?')) {
      try {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:5000/api/events/${id}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${token}` }
        });
        fetchMyEvents();
        alert('Product deleted');
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  if (activeView === 'main') {
    return (
      <div className="full-width-container">
        <div className="vendor-main-header">
          <h1>Vendor Dashboard</h1>
          <p>Welcome back, {user.name}</p>
        </div>
        
        <div className="vendor-main-nav">
          <div className="nav-card" onClick={() => setActiveView('items')}>
            <div className="nav-icon">📦</div>
            <h3>Manage Products</h3>
            <p>View and edit your products</p>
          </div>
          <div className="nav-card" onClick={() => setActiveView('add')}>
            <div className="nav-icon">➕</div>
            <h3>Add New Product</h3>
            <p>Create new products for sale</p>
          </div>
          <div className="nav-card" onClick={() => setActiveView('orders')}>
            <div className="nav-icon">📦</div>
            <h3>Order Management</h3>
            <p>Manage customer orders</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'add') {
    return (
      <div className="full-width-container">
        <div className="page-header">
          <button className="back-button" onClick={() => setActiveView('main')}>
            ← Back to Dashboard
          </button>
          <h1 className="page-title">Add New Product</h1>
        </div>

        <div className="content-container">
          <div className="form-card">
            <h3>{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
            <form onSubmit={handleSubmit} className="modern-form">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className="form-input"
              />
              <textarea
                placeholder="Product Description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="form-input"
                rows="3"
              />
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="form-select"
              >
                <option value="">Select Category</option>
                <option value="catering">Catering</option>
                <option value="florist">Florist</option>
                <option value="decoration">Decoration</option>
                <option value="lighting">Lighting</option>
              </select>
              <div className="form-row">
                <input
                  type="number"
                  placeholder="Price (Rs.)"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  required
                  className="form-input"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="form-input"
                />
              </div>
              
              <ImageUpload 
                currentImage={formData.image}
                onImageChange={(image) => setFormData({...formData, image})}
              />
              
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                {editingProduct && (
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => {
                      setEditingProduct(null);
                      setFormData({ name: '', description: '', category: '', price: '', stock: '', image: '' });
                      setActiveView('items');
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'items') {
    return (
      <div className="full-width-container">
        <div className="page-header">
          <button className="back-button" onClick={() => setActiveView('main')}>
            ← Back to Dashboard
          </button>
          <h1 className="page-title">Manage Products</h1>
        </div>

        <div className="content-container">
          <div className="products-table-card">
            <h3>Your Products ({events.length})</h3>
            <div className="products-table">
              <div className="table-header">
                <div>Image</div>
                <div>Product Name</div>
                <div>Category</div>
                <div>Price</div>
                <div>Stock</div>
                <div>Actions</div>
              </div>
              
              {events.map(event => (
                <div key={event._id} className="table-row">
                  <div className="table-cell">
                    {event.image && (
                      <img src={event.image} alt={event.name} className="product-img" />
                    )}
                  </div>
                  <div className="table-cell">{event.name}</div>
                  <div className="table-cell">
                    <span className="category-tag">{event.category}</span>
                  </div>
                  <div className="table-cell">Rs. {event.price}</div>
                  <div className="table-cell">{event.stock || '-'}</div>
                  <div className="table-cell">
                    <div className="action-btns">
                      <button className="icon-btn edit" onClick={() => { editProduct(event); setActiveView('add'); }}>✏️</button>
                      <button className="icon-btn delete" onClick={() => deleteProduct(event._id)}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeView === 'orders') {
    return <VendorOrdersPage 
      onBack={() => setActiveView('main')}
      user={user}
    />;
  }

  return (
    <div className="full-width-container">
      <div className="page-header">
        <button className="back-button" onClick={() => setActiveView('main')}>
          ← Back to Dashboard
        </button>
        <h1 className="page-title">Transactions</h1>
      </div>
      <div className="content-container">
        <div className="empty-state">
          <div className="empty-icon">💰</div>
          <h3>Transaction History</h3>
          <p>Your transaction history will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
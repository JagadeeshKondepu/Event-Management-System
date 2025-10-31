import { useState, useEffect } from 'react';
import './Auth.css';

const AddItem = ({ user, onBack }) => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
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
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormData({ name: '', price: '', image: '' });
        fetchMyEvents();
        alert('Product added successfully!');
      }
    } catch (error) {
      alert('Error adding product');
    }
  };

  const deleteProduct = async (id) => {
    if (confirm('Delete this product?')) {
      alert('Product deleted');
      fetchMyEvents();
    }
  };

  return (
    <div className="add-item-page">
      <div className="top-nav">
        <button onClick={() => onBack('status')}>Product Status</button>
        <button onClick={() => onBack('request')}>Request Item</button>
        <button onClick={() => onBack('view')}>View Product</button>
        <button onClick={() => window.location.reload()}>Log Out</button>
      </div>

      <div className="add-item-content">
        <div className="add-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Product Price"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Product Image"
              value={formData.image}
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <button type="submit">Add Product</button>
          </form>
        </div>

        <div className="products-list">
          <div className="products-header">
            <div>Image</div>
            <div>Name</div>
            <div>Price</div>
            <div>Action</div>
          </div>
          {events.map(event => (
            <div key={event._id} className="product-row">
              <div>📷</div>
              <div>{event.name}</div>
              <div>Rs. {event.price}</div>
              <div>
                <button onClick={() => deleteProduct(event._id)}>Delete</button>
                <button>Update</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddItem;
import { useState, useEffect } from 'react';
import './ModernEcommerce.css';

const ProductsPage = ({ vendor, onBack, onAddToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      // Filter by specific vendor
      const filtered = data.filter(event => 
        event.status === 'approved' && 
        event.vendor._id === vendor.vendorId
      );
      setProducts(filtered);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = (product) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists
    const existingItem = existingCart.find(item => item._id === product._id);
    
    let updatedCart;
    if (existingItem) {
      // Increase quantity
      updatedCart = existingCart.map(item => 
        item._id === product._id 
          ? {...item, quantity: item.quantity + 1}
          : item
      );
    } else {
      // Add new item
      updatedCart = [...existingCart, {...product, quantity: 1}];
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Call parent callback
    onAddToCart(product);
    
    // Show success message
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="full-width-container">
      <div className="products-container">
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
          <button className="back-button" onClick={onBack}>
            ← Back to Vendors
          </button>
          <button className="back-button" onClick={() => window.location.href = '/'}>
            🏠 Dashboard
          </button>
        </div>
        
        <div className="vendor-banner">
          <h2>{vendor.name}</h2>
        </div>
        
        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products available</h3>
            <p>This vendor hasn't added any products yet</p>
          </div>
        ) : (
          <div className="products-grid">
            {products.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  {product.image ? (
                    <img src={product.image} alt={product.name} />
                  ) : (
                    <div className="product-placeholder">📦</div>
                  )}
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  {product.description && (
                    <p className="product-description">{product.description}</p>
                  )}
                  <div className="product-price">Rs. {product.price}</div>
                  <button 
                    className="add-to-cart-btn" 
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
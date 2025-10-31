import { useState, useEffect } from 'react';
import ProductsPage from './ProductsPage';
import './ModernEcommerce.css';

const VendorPage = ({ onBack, onAddToCart, selectedCategory }) => {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(selectedCategory || '');

  useEffect(() => {
    fetchVendors();
  }, [currentCategory]);

  const fetchVendors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users');
      const users = await response.json();
      const vendorUsers = users?.filter(user => user.role === 'vendor') || [];
      
      // Get event counts for each vendor
      const eventsResponse = await fetch('http://localhost:5000/api/events');
      const events = await eventsResponse.json();
      
      const vendorsWithData = vendorUsers.map(vendor => ({
        id: vendor._id,
        name: vendor.businessName || vendor.name,
        type: vendor.category ? vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1) : 'General',
        contact: vendor.phone || 'N/A',
        items: events.filter(event => event.vendor._id === vendor._id && event.status === 'approved').length,
        vendorId: vendor._id
      }));
      
      const filtered = currentCategory 
        ? vendorsWithData.filter(v => v.type.toLowerCase() === currentCategory.toLowerCase())
        : vendorsWithData;
      
      setVendors(filtered);
    } catch (error) {
      console.error('Error fetching vendors:', error);
      setVendors([]);
    }
  };

  if (selectedVendor) {
    return <ProductsPage 
      vendor={selectedVendor}
      onBack={() => setSelectedVendor(null)}
      onAddToCart={onAddToCart}
    />;
  }

  return (
    <div className="full-width-container">
      <div className="filter-section">
        <div className="filter-content">
          <span className="filter-label">Filter by Category:</span>
          <select 
            className="filter-select"
            onChange={(e) => {
              const value = e.target.value;
              setCurrentCategory(value === 'all' ? '' : value);
            }} 
            value={currentCategory || 'all'}
          >
            <option value="all">All Vendor Types</option>
            <option value="Catering">Catering Services</option>
            <option value="Florist">Florist Services</option>
            <option value="Decoration">Decoration Services</option>
            <option value="Lighting">Lighting Services</option>
          </select>
        </div>
      </div>

      <div className="vendor-container">
        <button className="back-button" onClick={onBack}>
          ← Dashboard
        </button>
        {vendors.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🏪</div>
            <h3>No vendors found</h3>
            <p>Try selecting a different category</p>
          </div>
        ) : (
          <div className="vendors-grid">
            {vendors.map(vendor => (
              <div key={vendor.id} className="vendor-card">
                <div className="vendor-header">
                  <h3 className="vendor-name">{vendor.name}</h3>
                  <span className="vendor-type-badge">{vendor.type}</span>
                </div>
                <div className="vendor-details">
                  <div className="vendor-detail-row">
                    <span className="detail-label">Contact:</span>
                    <span className="detail-value">{vendor.contact}</span>
                  </div>
                  <div className="vendor-detail-row">
                    <span className="detail-label">Available Items:</span>
                    <span className="detail-value">{vendor.items}</span>
                  </div>
                </div>
                <button className="shop-items-btn" onClick={() => setSelectedVendor(vendor)}>
                  Shop Items
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
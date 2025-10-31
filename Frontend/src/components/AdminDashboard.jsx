import { useState, useEffect } from 'react';
import './ModernEcommerce.css';

const AdminDashboard = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [activeTab, setActiveTab] = useState('main');
  const [memberships, setMemberships] = useState([]);
  const [newMembership, setNewMembership] = useState({ userId: '', vendorId: '', type: 'basic', duration: '1', memberType: 'vendor' });

  useEffect(() => {
    fetchUsers();
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    const mockMemberships = [
      { _id: '1', member: { name: 'Elite Decorators', type: 'vendor' }, type: 'premium', status: 'active', expiresAt: '2025-12-31' },
      { _id: '2', member: { name: 'Royal Caterers', type: 'vendor' }, type: 'basic', status: 'active', expiresAt: '2025-11-30' },
      { _id: '3', member: { name: 'John Smith', type: 'user' }, type: 'premium', status: 'active', expiresAt: '2025-12-15' }
    ];
    setMemberships(mockMemberships);
  };

  const addMembership = async (e) => {
    e.preventDefault();
    let membership;
    
    if (newMembership.memberType === 'vendor') {
      const vendor = vendors.find(v => v._id === newMembership.vendorId);
      if (vendor) {
        membership = {
          _id: Date.now().toString(),
          member: { name: vendor.name, type: 'vendor' },
          type: newMembership.type,
          status: 'active',
          expiresAt: new Date(Date.now() + parseInt(newMembership.duration) * 30 * 24 * 60 * 60 * 1000).toISOString()
        };
      }
    } else {
      const user = users.find(u => u._id === newMembership.userId);
      if (user) {
        membership = {
          _id: Date.now().toString(),
          member: { name: user.name, type: 'user' },
          type: newMembership.type,
          status: 'active',
          expiresAt: new Date(Date.now() + parseInt(newMembership.duration) * 30 * 24 * 60 * 60 * 1000).toISOString()
        };
      }
    }
    
    if (membership) {
      setMemberships([...memberships, membership]);
      setNewMembership({ userId: '', vendorId: '', type: 'basic', duration: '1', memberType: 'vendor' });
      alert('Membership added successfully!');
    }
  };



  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data) {
        setUsers(data.filter(u => u.role === 'user'));
        setVendors(data.filter(u => u.role === 'vendor'));
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };



  if (activeTab === 'main') {
    return (
      <div className="full-width-container">
        <div className="vendor-main-header">
          <h1>Admin Dashboard</h1>
          <p>Manage users, vendors, and memberships</p>
        </div>
        
        <div className="vendor-main-nav">
          <div className="nav-card" onClick={() => setActiveTab('users')}>
            <div className="nav-icon">👥</div>
            <h3>User Management</h3>
            <p>Manage user accounts and permissions</p>
          </div>
          <div className="nav-card" onClick={() => setActiveTab('vendors')}>
            <div className="nav-icon">🏪</div>
            <h3>Vendor Management</h3>
            <p>Manage vendor accounts and status</p>
          </div>
          <div className="nav-card" onClick={() => setActiveTab('memberships')}>
            <div className="nav-icon">🎫</div>
            <h3>Memberships</h3>
            <p>Add and update vendor memberships</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="full-width-container">
      <div className="page-header">
        <button className="back-button" onClick={() => setActiveTab('main')}>
          ← Back to Dashboard
        </button>
        <h1 className="page-title">
          {activeTab === 'users' && 'User Management'}
          {activeTab === 'vendors' && 'Vendor Management'}
          {activeTab === 'memberships' && 'Membership Management'}
        </h1>
      </div>

      <div className="content-container">


        {activeTab === 'users' && (
          <div className="management-grid">
            {users.map(user => (
              <div key={user._id} className="management-card">
                <div className="card-header">
                  <h3>{user.name}</h3>
                  <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="card-details">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="management-grid">
            {vendors.map(vendor => (
              <div key={vendor._id} className="management-card">
                <div className="card-header">
                  <h3>{vendor.name}</h3>
                  <span className={`status-badge ${vendor.isActive ? 'active' : 'inactive'}`}>
                    {vendor.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div className="card-details">
                  <p><strong>Business:</strong> {vendor.businessName || 'N/A'}</p>
                  <p><strong>Category:</strong> {vendor.category || 'N/A'}</p>
                  <p><strong>Email:</strong> {vendor.email}</p>
                  <p><strong>Phone:</strong> {vendor.phone || 'N/A'}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'memberships' && (
          <div className="vendor-layout">
            <div className="vendor-form-section">
              <div className="form-card">
                <h3>Add New Membership</h3>
                <form onSubmit={addMembership} className="modern-form">
                  <select
                    value={newMembership.memberType}
                    onChange={(e) => setNewMembership({...newMembership, memberType: e.target.value, userId: '', vendorId: ''})}
                    className="form-select"
                  >
                    <option value="vendor">Vendor Membership</option>
                    <option value="user">User Membership</option>
                  </select>
                  
                  {newMembership.memberType === 'vendor' ? (
                    <select
                      value={newMembership.vendorId}
                      onChange={(e) => setNewMembership({...newMembership, vendorId: e.target.value})}
                      required
                      className="form-select"
                    >
                      <option value="">Select Vendor</option>
                      {vendors.map(vendor => (
                        <option key={vendor._id} value={vendor._id}>{vendor.name}</option>
                      ))}
                    </select>
                  ) : (
                    <select
                      value={newMembership.userId}
                      onChange={(e) => setNewMembership({...newMembership, userId: e.target.value})}
                      required
                      className="form-select"
                    >
                      <option value="">Select User</option>
                      {users.map(user => (
                        <option key={user._id} value={user._id}>{user.name}</option>
                      ))}
                    </select>
                  )}
                  <select
                    value={newMembership.type}
                    onChange={(e) => setNewMembership({...newMembership, type: e.target.value})}
                    className="form-select"
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                  <select
                    value={newMembership.duration}
                    onChange={(e) => setNewMembership({...newMembership, duration: e.target.value})}
                    className="form-select"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                  <button type="submit" className="submit-btn">Add Membership</button>
                </form>
              </div>
            </div>
            
            <div className="vendor-products-section">
              <div className="form-card">
                <h3>Existing Memberships ({memberships.length})</h3>
                <div className="memberships-list">
                  {memberships.map(membership => (
                    <div key={membership._id} className="membership-item">
                      <div className="membership-info">
                        <h4>{membership.member?.name || 'Unknown Member'}</h4>
                        <p><strong>Member Type:</strong> {membership.member?.type}</p>
                        <p><strong>Plan:</strong> {membership.type}</p>
                        <p><strong>Status:</strong> {membership.status}</p>
                        <p><strong>Expires:</strong> {new Date(membership.expiresAt).toLocaleDateString()}</p>
                      </div>
                      <div className="membership-actions">
                        <span className={`membership-badge ${membership.status}`}>
                          {membership.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
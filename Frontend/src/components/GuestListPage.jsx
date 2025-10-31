import { useState, useEffect } from 'react';
import './ModernEcommerce.css';

const GuestListPage = ({ onBack, user }) => {
  const [guests, setGuests] = useState([]);
  const [newGuest, setNewGuest] = useState({ name: '', email: '', phone: '', status: 'invited' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    // Load guests from localStorage or set mock data
    const savedGuests = JSON.parse(localStorage.getItem('guestList') || '[]');
    
    if (savedGuests.length === 0) {
      const mockGuests = [
        { id: 1, name: 'John Smith', email: 'john@email.com', phone: '9876543210', status: 'confirmed' },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', phone: '9876543211', status: 'pending' },
        { id: 3, name: 'Mike Wilson', email: 'mike@email.com', phone: '9876543212', status: 'declined' }
      ];
      setGuests(mockGuests);
      localStorage.setItem('guestList', JSON.stringify(mockGuests));
    } else {
      setGuests(savedGuests);
    }
  }, []);

  const addGuest = (e) => {
    e.preventDefault();
    const guest = {
      id: Date.now(),
      ...newGuest
    };
    const updatedGuests = [...guests, guest];
    setGuests(updatedGuests);
    localStorage.setItem('guestList', JSON.stringify(updatedGuests));
    setNewGuest({ name: '', email: '', phone: '', status: 'invited' });
    setShowAddForm(false);
  };

  const updateGuestStatus = (id, status) => {
    const updatedGuests = guests.map(guest => 
      guest.id === id ? { ...guest, status } : guest
    );
    setGuests(updatedGuests);
    localStorage.setItem('guestList', JSON.stringify(updatedGuests));
  };

  const removeGuest = (id) => {
    const updatedGuests = guests.filter(guest => guest.id !== id);
    setGuests(updatedGuests);
    localStorage.setItem('guestList', JSON.stringify(updatedGuests));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#28a745';
      case 'pending': return '#fd7e14';
      case 'declined': return '#dc3545';
      case 'invited': return '#6c757d';
      default: return '#6c757d';
    }
  };

  return (
    <div className="full-width-container">
      <div className="page-header">
        <button className="back-button" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <div className="header-content">
          <h1 className="page-title">Guest List</h1>
          <button 
            className="add-guest-btn"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            + Add Guest
          </button>
        </div>
      </div>

      <div className="content-container">
        {showAddForm && (
          <div className="add-guest-form">
            <h3>Add New Guest</h3>
            <form onSubmit={addGuest}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Guest Name"
                  value={newGuest.name}
                  onChange={(e) => setNewGuest({...newGuest, name: e.target.value})}
                  required
                  className="form-input"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newGuest.email}
                  onChange={(e) => setNewGuest({...newGuest, email: e.target.value})}
                  required
                  className="form-input"
                />
              </div>
              <div className="form-row">
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newGuest.phone}
                  onChange={(e) => setNewGuest({...newGuest, phone: e.target.value})}
                  required
                  className="form-input"
                />
                <select
                  value={newGuest.status}
                  onChange={(e) => setNewGuest({...newGuest, status: e.target.value})}
                  className="form-select"
                >
                  <option value="invited">Invited</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">Add Guest</button>
                <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="guests-table">
          <div className="table-header">
            <div className="header-cell">Name</div>
            <div className="header-cell">Email</div>
            <div className="header-cell">Phone</div>
            <div className="header-cell">Status</div>
            <div className="header-cell">Actions</div>
          </div>
          
          {guests.map(guest => (
            <div key={guest.id} className="table-row">
              <div className="table-cell">{guest.name}</div>
              <div className="table-cell">{guest.email}</div>
              <div className="table-cell">{guest.phone}</div>
              <div className="table-cell">
                <select
                  value={guest.status}
                  onChange={(e) => updateGuestStatus(guest.id, e.target.value)}
                  className="status-select"
                  style={{ backgroundColor: getStatusColor(guest.status) }}
                >
                  <option value="invited">Invited</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
                </select>
              </div>
              <div className="table-cell">
                <button 
                  className="remove-btn"
                  onClick={() => removeGuest(guest.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {guests.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No Guests Added</h3>
            <p>Start building your guest list by adding guests above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestListPage;
import { useState } from 'react';
import UserDashboard from './UserDashboard';
import VendorDashboard from './VendorDashboard';
import AdminDashboard from './AdminDashboard';
import SystemChart from './SystemChart';
import './Dashboard.css';
import './EcommerceStyles.css';

const Dashboard = ({ user, onLogout }) => {
  const [showChart, setShowChart] = useState(false);

  const renderDashboard = () => {
    if (showChart) {
      return <SystemChart />;
    }
    
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} />;
      case 'vendor':
        return <VendorDashboard user={user} />;
      default:
        return <UserDashboard user={user} />;
    }
  };

  const getRoleIcon = () => {
    switch (user.role) {
      case 'admin': return '⚙️';
      case 'vendor': return '🏪';
      default: return '👤';
    }
  };

  return (
    <div className="dashboard">
      <div className="ecommerce-header">
        <div className="logo">Event Management System</div>
        <div className="header-actions">
          <button 
            className="dashboard-btn"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? 'Dashboard' : 'Chart'}
          </button>
          <div className="user-info">
            {getRoleIcon()} {user.name} ({user.role})
          </div>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </div>
      {renderDashboard()}
    </div>
  );
};

export default Dashboard;
import React from 'react';
import './ModernEcommerce.css';

const SystemChart = () => {
  const flowData = {
    roles: {
      admin: {
        label: 'ADMIN',
        functions: [
          { text: 'User Management', icon: '👥' },
          { text: 'Vendor Management', icon: '🏪' },
          { text: 'Membership Management', icon: '🎫' }
        ]
      },
      vendor: {
        label: 'VENDOR',
        functions: [
          { text: 'Manage Products', icon: '📦' },
          { text: 'Add New Product', icon: '➕' },
          { text: 'Order Management', icon: '📋' }
        ]
      },
      user: {
        label: 'USER',
        functions: [
          { text: 'Browse Vendors', icon: '🏪' },
          { text: 'Shopping Cart', icon: '🛒' },
          { text: 'Order Status', icon: '📦' },
          { text: 'Guest List', icon: '👥' }
        ]
      }
    }
  };

  return (
    <div className="full-width-container">
      <div className="system-chart-header">
        <h1>Event Management System</h1>
        <p>Implemented features by user role</p>
      </div>

      <div className="system-flow">
        {/* Start Flow */}
        <div className="start-flow">
          <div className="chart-node start">
            <span>🚀</span>
            START
          </div>
          <div className="chart-arrow">↓</div>
          <div className="chart-node">
            <span>🏠</span>
            INDEX
          </div>
          <div className="chart-arrow">↓</div>
          <div className="chart-node">
            <span>🔐</span>
            LOGIN
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="roles-grid">
          <div className="role-column admin">
            <div className="role-header">
              <span>⚙️</span>
              <h2>ADMIN</h2>
            </div>
            <div className="role-functions">
              {flowData.roles.admin.functions.map((func, index) => (
                <div key={index} className="function-card">
                  <span className="func-icon">{func.icon}</span>
                  <span>{func.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="role-column vendor">
            <div className="role-header">
              <span>🏪</span>
              <h2>VENDOR</h2>
            </div>
            <div className="role-functions">
              {flowData.roles.vendor.functions.map((func, index) => (
                <div key={index} className="function-card">
                  <span className="func-icon">{func.icon}</span>
                  <span>{func.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="role-column user">
            <div className="role-header">
              <span>👤</span>
              <h2>USER</h2>
            </div>
            <div className="role-functions">
              {flowData.roles.user.functions.map((func, index) => (
                <div key={index} className="function-card">
                  <span className="func-icon">{func.icon}</span>
                  <span>{func.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemChart;
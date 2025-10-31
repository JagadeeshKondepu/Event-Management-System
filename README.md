# Event Management System

A comprehensive full-stack event management platform with role-based access control, enabling seamless interaction between administrators, vendors, and customers.

## 🚀 Features

### Multi-Role Architecture
- **Admin Dashboard**: Complete system oversight with user, vendor, and membership management
- **Vendor Portal**: Product management, order processing, and business analytics
- **Customer Interface**: Event browsing, cart management, order tracking, and guest list organization

### Core Functionality
- **Authentication & Authorization**: JWT-based secure login with role-specific access
- **Product Management**: Full CRUD operations for event services and products
- **E-commerce Integration**: Shopping cart, checkout process, and payment handling
- **Order Management**: Real-time status tracking with vendor and admin controls
- **Membership System**: Tiered access levels for enhanced platform features
- **Guest Management**: Comprehensive guest list creation and management tools

## 🛠 Technology Stack

### Backend
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcryptjs for password hashing
- **API**: RESTful architecture with role-based endpoints

### Frontend
- **Framework**: React 18 with Vite build tool
- **Styling**: Modern CSS with responsive design principles
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: Component-based navigation system
- **UI/UX**: Professional e-commerce interface design

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## ⚡ Quick Start

### 1. Clone Repository
```bash
git clone <repository-url>
cd Event-Management
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventmanagement
JWT_SECRET=your_secure_jwt_secret_key
```

Start MongoDB service and run:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
npm run dev
```

### 4. Database Initialization
```bash
cd Backend
node seedDatabase.js
```

## 🔐 Default Credentials

### Admin Access
- **Username**: admin
- **Password**: password123

### Vendor Accounts
- **vendor1** / password123 (Catering)
- **vendor2** / password123 (Florist)
- **vendor3** / password123 (Decoration)
- **vendor4** / password123 (Lighting)

### User Accounts
- **user1** / password123
- **user2** / password123

## 🏗 System Architecture

### Database Models
- **User**: Authentication and profile management
- **Event**: Product/service catalog with vendor associations
- **Order**: Transaction records with item details and status tracking

### API Endpoints

#### Authentication
```
POST /api/auth/register - User registration
POST /api/auth/login    - User authentication
```

#### Events/Products
```
GET    /api/events           - Retrieve all approved events
POST   /api/events           - Create new event (vendor only)
PUT    /api/events/:id       - Update event (vendor only)
DELETE /api/events/:id       - Remove event (vendor only)
PATCH  /api/events/:id/status - Update approval status (admin only)
```

#### Orders
```
POST  /api/orders                    - Create new order
GET   /api/orders/my-orders          - User's order history
GET   /api/orders/vendor-orders      - Vendor's order management
PATCH /api/orders/:id/status         - Update order status (admin)
PATCH /api/orders/:id/vendor-status  - Update order status (vendor)
```

#### Users
```
GET /api/users - Retrieve all users (admin only)
```

## 👥 User Roles & Permissions

### Administrator
- **System Management**: Complete oversight of platform operations
- **User Administration**: Create, update, and manage user accounts
- **Vendor Oversight**: Approve vendor registrations and manage vendor status
- **Membership Control**: Assign and modify membership tiers
- **Order Supervision**: Monitor and update all order statuses
- **Content Moderation**: Approve or reject vendor product listings

### Vendor
- **Product Catalog**: Add, edit, and remove service offerings
- **Inventory Management**: Track product availability and pricing
- **Order Processing**: View and update order statuses for their products
- **Business Analytics**: Access to sales data and performance metrics
- **Profile Management**: Update business information and categories

### Customer/User
- **Product Discovery**: Browse approved vendor services and products
- **Shopping Experience**: Add items to cart and complete purchases
- **Order Tracking**: Monitor order status and delivery updates
- **Guest Management**: Create and manage event guest lists
- **Account Management**: Update personal information and preferences

## 🎨 UI/UX Features

### Modern Design Elements
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Professional Styling**: Clean, modern interface inspired by leading e-commerce platforms
- **Intuitive Navigation**: Role-based menu systems with clear visual hierarchy
- **Interactive Components**: Hover effects, smooth transitions, and loading states
- **Accessibility**: Proper contrast ratios and keyboard navigation support

### Key Interface Components
- **Dashboard Cards**: Clean, informative overview panels
- **Data Tables**: Sortable, filterable product and order listings
- **Form Controls**: Consistent styling across all input elements
- **Status Indicators**: Color-coded badges for order and approval states
- **Modal Dialogs**: Streamlined workflows for critical actions

## 🔧 Configuration

### Environment Variables
```env
PORT=5000                                    # Server port
MONGODB_URI=mongodb://localhost:27017/eventmanagement  # Database connection
JWT_SECRET=your_secure_secret_key           # JWT signing key
```

### Default Ports
- **Backend API**: http://localhost:5000
- **Frontend Application**: http://localhost:5173

## 📊 System Flow

1. **User Registration/Login**: Secure authentication with role assignment
2. **Vendor Onboarding**: Admin approval process for vendor accounts
3. **Product Management**: Vendors add services, admin approves listings
4. **Customer Shopping**: Browse products, add to cart, complete checkout
5. **Order Processing**: Vendors update status, customers track progress
6. **Membership Management**: Admins assign premium features and access levels

## 🚀 Deployment

### Production Considerations
- Configure environment variables for production database
- Implement SSL/TLS certificates for secure connections
- Set up proper CORS policies for cross-origin requests
- Configure MongoDB Atlas for cloud database hosting
- Implement proper logging and error monitoring

### Recommended Hosting
- **Backend**: Heroku, DigitalOcean, or AWS EC2
- **Frontend**: Netlify, Vercel, or AWS S3 with CloudFront
- **Database**: MongoDB Atlas or self-hosted MongoDB instance

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For technical support or feature requests, please create an issue in the repository or contact the development team.

---

**Built with ❤️ for seamless event management experiences**
# Event Management System - Login Credentials

## Default Login Credentials

### Admin Account
- **Username:** admin
- **Password:** password123
- **Role:** Admin
- **Features:** Manage users, vendors, events, orders, memberships

### Vendor Accounts

#### Vendor 1 - Catering
- **Username:** vendor1
- **Password:** password123
- **Business:** Royal Catering Services
- **Category:** Catering
- **Products:** Wedding Buffet Package, Birthday Party Snacks

#### Vendor 2 - Florist
- **Username:** vendor2
- **Password:** password123
- **Business:** Bloom Florist
- **Category:** Florist
- **Products:** Bridal Bouquet, Table Centerpieces

#### Vendor 3 - Decoration
- **Username:** vendor3
- **Password:** password123
- **Business:** Elite Decorations
- **Category:** Decoration
- **Products:** Stage Decoration, Balloon Arch

#### Vendor 4 - Lighting
- **Username:** vendor4
- **Password:** password123
- **Business:** Bright Lights Co
- **Category:** Lighting
- **Products:** LED String Lights, Spotlight Setup

### User Accounts

#### User 1
- **Username:** user1
- **Password:** password123
- **Role:** Customer
- **Location:** Pune, Maharashtra

#### User 2
- **Username:** user2
- **Password:** password123
- **Role:** Customer
- **Location:** Hyderabad, Telangana

## Setup Instructions

1. **Start MongoDB** service on your system
2. **Install dependencies** in Backend folder:
   ```bash
   cd Backend
   npm install
   ```
3. **Seed the database** with default data:
   ```bash
   npm run seed
   ```
4. **Start the backend server**:
   ```bash
   npm run dev
   ```
5. **Install frontend dependencies**:
   ```bash
   cd Frontend
   npm install
   ```
6. **Start the frontend**:
   ```bash
   npm run dev
   ```

## Default Products Available

### Catering (vendor1)
- Wedding Buffet Package - Rs. 25,000
- Birthday Party Snacks - Rs. 5,000

### Florist (vendor2)
- Bridal Bouquet - Rs. 3,000
- Table Centerpieces - Rs. 1,500

### Decoration (vendor3)
- Stage Decoration - Rs. 15,000
- Balloon Arch - Rs. 2,500

### Lighting (vendor4)
- LED String Lights - Rs. 800
- Spotlight Setup - Rs. 5,000

## Features Available

### For Users:
- Browse products by category
- Add items to cart
- Place orders with checkout
- View order history

### For Vendors:
- Add/edit products
- View product status
- Manage inventory
- Handle customer requests

### For Admins:
- Manage all users and vendors
- Approve/reject products
- Handle orders
- Manage memberships

## Notes
- All passwords are set to **password123** for testing
- Images are stored as base64 SVG in MongoDB
- Products are pre-approved and ready for purchase
- System supports image upload and editing
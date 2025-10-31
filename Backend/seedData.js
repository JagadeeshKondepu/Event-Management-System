import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Event from './models/Event.js';
import dotenv from 'dotenv';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventmanagement');
    
    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});

    // Create default users
    const hashedPassword = await bcrypt.hash('password123', 12);

    const users = [
      {
        name: 'admin',
        email: 'admin@event.com',
        password: hashedPassword,
        role: 'admin',
        phone: '9999999999',
        category: 'system'
      },
      {
        name: 'vendor1',
        email: 'vendor1@event.com',
        password: hashedPassword,
        role: 'vendor',
        phone: '9876543210',
        businessName: 'Royal Catering Services',
        businessType: 'catering',
        category: 'catering',
        address: 'Mumbai, Maharashtra'
      },
      {
        name: 'vendor2',
        email: 'vendor2@event.com',
        password: hashedPassword,
        role: 'vendor',
        phone: '9876543211',
        businessName: 'Bloom Florist',
        businessType: 'florist',
        category: 'florist',
        address: 'Delhi, India'
      },
      {
        name: 'vendor3',
        email: 'vendor3@event.com',
        password: hashedPassword,
        role: 'vendor',
        phone: '9876543212',
        businessName: 'Elite Decorations',
        businessType: 'decoration',
        category: 'decoration',
        address: 'Bangalore, Karnataka'
      },
      {
        name: 'vendor4',
        email: 'vendor4@event.com',
        password: hashedPassword,
        role: 'vendor',
        phone: '9876543213',
        businessName: 'Bright Lights Co',
        businessType: 'lighting',
        category: 'lighting',
        address: 'Chennai, Tamil Nadu'
      },
      {
        name: 'user1',
        email: 'user1@event.com',
        password: hashedPassword,
        role: 'user',
        phone: '9123456789',
        address: 'Pune, Maharashtra'
      },
      {
        name: 'user2',
        email: 'user2@event.com',
        password: hashedPassword,
        role: 'user',
        phone: '9123456788',
        address: 'Hyderabad, Telangana'
      }
    ];

    const createdUsers = await User.insertMany(users);
    console.log('Users created successfully');

    // Get vendor IDs
    const vendors = createdUsers.filter(user => user.role === 'vendor');

    // Create default events/products with base64 images
    const events = [
      // Catering items
      {
        name: 'Wedding Buffet Package',
        description: 'Complete wedding buffet for 100 people',
        category: 'catering',
        price: 25000,
        vendor: vendors[0]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2YjM1Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QnVmZmV0PC90ZXh0Pjwvc3ZnPg==',
        stock: 10,
        status: 'approved'
      },
      {
        name: 'Birthday Party Snacks',
        description: 'Delicious snacks for birthday celebrations',
        category: 'catering',
        price: 5000,
        vendor: vendors[0]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZkNzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U25hY2tzPC90ZXh0Pjwvc3ZnPg==',
        stock: 20,
        status: 'approved'
      },
      // Florist items
      {
        name: 'Bridal Bouquet',
        description: 'Beautiful roses and lilies bouquet',
        category: 'florist',
        price: 3000,
        vendor: vendors[1]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2OWI0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Qm91cXVldDwvdGV4dD48L3N2Zz4=',
        stock: 15,
        status: 'approved'
      },
      {
        name: 'Table Centerpieces',
        description: 'Elegant floral centerpieces for tables',
        category: 'florist',
        price: 1500,
        vendor: vendors[1]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDBkZjlmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Q2VudGVycGllY2U8L3RleHQ+PC9zdmc+',
        stock: 25,
        status: 'approved'
      },
      // Decoration items
      {
        name: 'Stage Decoration',
        description: 'Complete stage setup with backdrop',
        category: 'decoration',
        price: 15000,
        vendor: vendors[2]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjOGI1Y2Y2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U3RhZ2U8L3RleHQ+PC9zdmc+',
        stock: 5,
        status: 'approved'
      },
      {
        name: 'Balloon Arch',
        description: 'Colorful balloon arch decoration',
        category: 'decoration',
        price: 2500,
        vendor: vendors[2]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY5NTAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+QmFsbG9vbnM8L3RleHQ+PC9zdmc+',
        stock: 12,
        status: 'approved'
      },
      // Lighting items
      {
        name: 'LED String Lights',
        description: 'Warm white LED string lights',
        category: 'lighting',
        price: 800,
        vendor: vendors[3]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZkNzAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9ImJsYWNrIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TGVkIExpZ2h0czwvdGV4dD48L3N2Zz4=',
        stock: 30,
        status: 'approved'
      },
      {
        name: 'Spotlight Setup',
        description: 'Professional spotlight for events',
        category: 'lighting',
        price: 5000,
        vendor: vendors[3]._id,
        image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjY5OWNjIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+U3BvdGxpZ2h0PC90ZXh0Pjwvc3ZnPg==',
        stock: 8,
        status: 'approved'
      }
    ];

    await Event.insertMany(events);
    console.log('Events created successfully');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
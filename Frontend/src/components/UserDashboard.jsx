import { useState, useEffect } from 'react';
import VendorPage from './VendorPage';
import CartPage from './CartPage';
import CheckoutPage from './CheckoutPage';
import SuccessPage from './SuccessPage';
import OrderStatusPage from './OrderStatusPage';
import GuestListPage from './GuestListPage';
import './Auth.css';

const UserDashboard = ({ user }) => {
  const [activeView, setActiveView] = useState('main');
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [orderData, setOrderData] = useState(null);

  const categories = ['Catering', 'Florist', 'Decoration', 'Lighting'];

  useEffect(() => {
    // Load cart from localStorage on component mount
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(savedCart);
  }, [activeView]);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existing = existingCart.find(item => item._id === product._id);
    
    let updatedCart;
    if (existing) {
      updatedCart = existingCart.map(item => 
        item._id === product._id 
          ? {...item, quantity: item.quantity + 1}
          : item
      );
    } else {
      updatedCart = [...existingCart, {...product, quantity: 1}];
    }
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
    alert('Added to cart!');
  };

  const updateQuantity = (id, change) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + change;
        return newQty > 0 ? {...item, quantity: newQty} : item;
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  if (activeView === 'vendor') {
    return <VendorPage 
      onBack={() => setActiveView('main')} 
      onAddToCart={addToCart}
      selectedCategory={selectedCategory}
    />;
  }

  if (activeView === 'cart') {
    return <CartPage 
      cart={cart}
      onBack={() => setActiveView('main')}
      onUpdateQuantity={updateQuantity}
      onRemove={removeFromCart}
      onClearAll={clearCart}
      onCheckout={() => setActiveView('checkout')}
    />;
  }

  if (activeView === 'checkout') {
    return <CheckoutPage 
      cart={cart}
      onBack={() => setActiveView('cart')}
      onSuccess={(data) => {
        setOrderData(data);
        clearCart();
        setActiveView('success');
      }}
    />;
  }

  if (activeView === 'success') {
    return <SuccessPage 
      orderData={orderData}
      onHome={() => setActiveView('main')}
      onDashboard={() => setActiveView('main')}
    />;
  }

  if (activeView === 'orders') {
    return <OrderStatusPage 
      onBack={() => setActiveView('main')}
      user={user}
    />;
  }

  if (activeView === 'guest') {
    return <GuestListPage 
      onBack={() => setActiveView('main')}
      user={user}
    />;
  }

  return (
    <div className="user-dashboard">


      <div className="user-welcome">
        <h1>WELCOME {user.name.toUpperCase()}</h1>
      </div>

      <div className="user-nav">
        <button onClick={() => setActiveView('vendor')}>Vendors</button>
        <button onClick={() => setActiveView('cart')}>Cart ({cart.length})</button>
        <button onClick={() => setActiveView('guest')}>Guest List</button>
        <button onClick={() => setActiveView('orders')}>Order Status</button>
      </div>




    </div>
  );
};

export default UserDashboard;
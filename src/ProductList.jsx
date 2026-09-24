import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import AboutUs from './AboutUs';

const ProductList = ({ onHomeClick }) => {
  const [showCart, setShowCart] = useState(false);
  const [showAboutUs, setShowAboutUs] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        { name: "Snake Plant", image: "https://images.unsplash.com/photo-1593482892290-f54927ae1bac?w=400", description: "Produces oxygen at night and purifies air.", cost: "$15" },
        { name: "Spider Plant", image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=400", description: "Filters toxins like formaldehyde and xylene.", cost: "$12" },
        { name: "Peace Lily", image: "https://images.unsplash.com/photo-1593691509543-c55fb32e7355?w=400", description: "Thrives in low light and removes pollutants.", cost: "$18" },
        { name: "Boston Fern", image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400", description: "Adds humidity and purifies indoor air.", cost: "$14" },
        { name: "Rubber Plant", image: "https://images.unsplash.com/photo-1520412099551-62b6bafeb5bb?w=400", description: "Large shiny leaves that absorb pollutants.", cost: "$20" },
        { name: "Aloe Vera", image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=400", description: "Soothes skin burns and purifies air.", cost: "$10" }
      ]
    },
    {
      category: "Aromatic Fragrant Plants",
      plants: [
        { name: "Lavender", image: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?w=400", description: "Calming floral fragrance for stress relief.", cost: "$22" },
        { name: "Jasmine", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=400", description: "Sweet smelling flowers that bloom continuously.", cost: "$25" },
        { name: "Rosemary", image: "https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=400", description: "Aromatic herb great for cooking and fragrance.", cost: "$15" },
        { name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400", description: "Refreshing scent and easy-to-grow herb.", cost: "$8" },
        { name: "Eucalyptus", image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400", description: "Distinct clean scent that clears sinuses.", cost: "$18" },
        { name: "Gardenia", image: "https://images.unsplash.com/photo-1534710961216-75c274a5f3b2?w=400", description: "Intensely fragrant white tropical flowers.", cost: "$28" }
      ]
    },
    {
      category: "Low Maintenance Plants",
      plants: [
        { name: "ZZ Plant", image: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=400", description: "Requires minimal water and tolerates dark spots.", cost: "$24" },
        { name: "Pothos", image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=400", description: "Fast-growing vine plant, nearly indestructible.", cost: "$10" },
        { name: "Cast Iron Plant", image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400", description: "Survives neglect, low light, and dry air.", cost: "$20" },
        { name: "Jade Plant", image: "https://images.unsplash.com/photo-1509587584298-0f3b3a3a1797?w=400", description: "Popular succulent symbolizing good fortune.", cost: "$16" },
        { name: "Succulent Trio", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400", description: "Set of three resilient low-water plants.", cost: "$15" },
        { name: "Chinese Evergreen", image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400", description: "Tolerates poor light and dry indoor air.", cost: "$22" }
      ]
    }
  ];

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prevState) => ({ ...prevState, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo" onClick={onHomeClick} style={{ cursor: 'pointer' }}>
          <h2>Paradise Nursery</h2>
        </div>
        <ul className="nav-links">
          <li><button onClick={() => { setShowCart(false); setShowAboutUs(false); }}>Plants</button></li>
          <li><button onClick={() => { setShowAboutUs(true); setShowCart(false); }}>About Us</button></li>
          <li><button onClick={() => { setShowCart(true); setShowAboutUs(false); }}>Cart ({totalCartCount})</button></li>
        </ul>
      </nav>

      {showAboutUs ? (
        <AboutUs />
      ) : showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((category, index) => (
            <div key={index} style={{ marginBottom: '40px' }}>
              <h2 style={{ textAlign: 'center', margin: '20px 0', color: '#2e7d32' }}>{category.category}</h2>
              <div className="product-grid">
                {category.plants.map((plant, pIndex) => (
                  <div key={pIndex} className="product-card">
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p style={{ margin: '10px 0', fontSize: '0.9rem', color: '#666' }}>{plant.description}</p>
                    <p style={{ fontWeight: 'bold', marginBottom: '10px' }}>{plant.cost}</p>
                    <button
                      className="btn-add"
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name] || cartItems.some(item => item.name === plant.name)}
                    >
                      {addedToCart[plant.name] || cartItems.some(item => item.name === plant.name) ? "Added to Cart" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;

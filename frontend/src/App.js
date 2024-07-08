import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import ItemList from './components/ListItems';
import BasketPopup from './components/BasketPopup';
import './App.css';

const App = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [cartVisibility, setCartVisiblity] = useState(false);

  const addToBasket = (item) => {
    setBasketItems([...basketItems, item]);
  };

  const removeFromBasket = (index) => {
    setBasketItems(basketItems.filter((_, i) => i !== index));
  };

  return (
    <div>
      <header style={{ position: 'fixed', top: 0, right: 0, padding: '10px' }}>
        <button onClick={() => setCartVisiblity(true)} style={{ position: 'relative', background: 'none', border: 'none' }}>
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
          <span style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            background: 'red',
            color: 'white',
            borderRadius: '50%',
            padding: '5px',
            fontSize: '12px'
          }}>
            {basketItems.length}
          </span>
        </button>
      </header>
      <h1>Simple E-commerce Site</h1>
      <ItemList addToBasket={addToBasket} />
      {<BasketPopup 
          trigger = {cartVisibility}
          setTrigger = {setCartVisiblity}
          items = {basketItems} 
          remove = {removeFromBasket} 
        />
      }
    </div>
  );
};

export default App;

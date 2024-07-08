import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ItemList = ({ addToBasket }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/items')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the items!', error);
      });
  }, []);

  return (
    <div>
      <h2>Items for Sale</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {items.map(item => (
          <div key={item._id} style={{ margin: '10px', border: '1px solid #ccc', padding: '10px' }}>
            <img src={item.thumbnail} alt={item.name} style={{ width: '100px', height: '100px' }} />
            <h3>{item.name}</h3>
            <p>${item.price}</p>
            <button onClick={() => addToBasket(item)}>Add to Basket</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;

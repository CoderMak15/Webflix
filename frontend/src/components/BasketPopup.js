import React from 'react';
import "./BasketPopup.css"

function BasketPopup(props){
  return(
    <div className={`basket-popup-overlay ${props.trigger ? 'visible' : ''}`}>
      <div className="basket-popup-content">
        <button className="close-button" onClick={() => props.setTrigger(false)}>&times;</button>
        <h2>Your Basket</h2>
        <br></br>
        {props.items.length === 0 ? (
          <p>Your basket is empty</p>
        ) : (
          <ul>
            {props.items.map((item, index) => (
              <li key={index} className="basket-item">
                { 
                  <img src={item.thumbnail} alt={item.name} className="thumbnail" /> 
                }
                <div className="item-details">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
                <button onClick={() => props.remove(index)} className="remove-button">Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default BasketPopup;

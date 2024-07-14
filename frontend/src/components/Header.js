import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../AppContext';
import "./Header.css";
import BasketPopup from './BasketPopup';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, basketItems, setBasketItems, cartVisibility, setCartVisibility } = useContext(AppContext);

  const removeFromBasket = (index) => {
    setBasketItems(basketItems.filter((_, i) => i !== index));
  };

  const handleLogout = () => {
    localStorage.setItem('token', null)
    setLoggedIn(false); 
    navigate("../");
  }

  return (
    <div className="custom-navbar">
      <div className='home-logo-container'>
        <button className="functionnality" onClick={() => navigate("../")}>
          <img className="icon-size" src="icons/home.png" alt="Home" />
        </button>
      </div>
      <div className="webflix-logo">Webflix</div>
      <div style={{ flexGrow: 1 }}></div>
        { loggedIn ? (
            <div className="functionnalities">
              <button className="functionnality" onClick={() => {setCartVisibility(true);}}> 
                <img className="icon-size" src="icons/cart-2.png" alt="cart"/>
                <span style={{
                  position: 'relative',
                  top: '-50px',
                  right: '20px',
                  background: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '5px',
                }}>
                  {basketItems.length}
              </span>
              </button>
              <button className="functionnality" onClick={() => handleLogout(0)}> 
                <img className="icon-size" src="icons/logout.png" alt="logout"/>
              </button>
            </div>
        ) : (
          <div className="functionnalities">
            <button className="functionnality" onClick={() => navigate("/login")}>
              <img className="icon-size" src="./icons/login.png" alt="login" />
            </button>
            <button className="functionnality" onClick={() => navigate("/signup")}>
              <img className="icon-size" src="icons/signup.png" alt="signup"/>
            </button>
          </div>
        )}
        {
        <BasketPopup 
          trigger = {cartVisibility}
          setTrigger = {setCartVisibility}
          items = {basketItems} 
          remove = {removeFromBasket}
          setItems = {setBasketItems} 
          />
        }
      </div>
  );
};

export default Header;

import React, { useState, useContext } from "react";
import "./Menu.css";
import { CartContext } from "../CartContext";

export default function Menu(props) {
  const { addToCart } = useContext(CartContext);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderPrice, setOrderPrice] = useState(props.price);

  const handleAddToCartClick = () => {
    setIsPopupVisible(true);
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false);
  };

  const addItem = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      setOrderPrice(props.price * newQuantity); // Calculate price with updated quantity
      return newQuantity;
    });
  };

  const subItem = () => {
    setQuantity((prevQuantity) => {
      if (prevQuantity > 1) {
        const newQuantity = prevQuantity - 1;
        setOrderPrice(props.price / newQuantity); 
        return newQuantity;
      }
      return prevQuantity; 
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addToCart({
      id: props.id,
      food: props.food,
      price: props.price,
      itemImg: props.itemImg,
      quantity,
      orderPrice,
    });
    handleClosePopup();
    alert("Item Added");
  };
  return (
    <div className="menu-page">
      <div className="menu-main">
        <div className="menu-cards">
          <div className="menu-card">
            <div className="menu-img">
              <img src={`../../${props.itemImg}`} alt={props.food} />
            </div>
            <div className="menu-info">
              <h1>{props.food}</h1>
              <h3>₱{props.price}</h3>
              <span className="button-menu" onClick={handleAddToCartClick}>
                <p className="des">Add to cart</p>
              </span>
            </div>
          </div>
        </div>
      </div>

      {isPopupVisible && (
        <div className="popup">
          <div className="popup-content">
            <div className="pop-header">
              <div className="pop-img">
                <img
                  src={`../../${props.itemImg}`}
                  alt=""
                  className="pop-image"
                />
              </div>
            </div>

            <div className="pop-divde">
              <div className="pop-info">
                <p>{props.food}</p>
                <span className="close-popup" onClick={handleClosePopup}>
                  &times;
                </span>
              </div>
              <form onSubmit={handleFormSubmit}>
                <label>
                  <span className="qant">Quantity</span>
                  <div className="quantity-controls">
                    <button type="button" onClick={subItem} className="button1">
                      -
                    </button>
                    <p>{quantity}</p>
                    <button type="button" onClick={addItem} className="button2">
                      +
                    </button>
                  </div>
                </label>
                <button type="submit" className="cart-button">
                  Add to cart
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

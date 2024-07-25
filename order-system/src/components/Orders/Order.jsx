import React, { useState, useContext, useEffect } from "react";
import "./Order.css";
import { CartContext } from "../CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faBox,
  faCheckSquare,
  faMinus,
  faPlus,
  faShoppingCart,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import CancelOrder from "./Cancel-Order";

export default function Order() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    toggleChecked,
    addShippedItem,
    shippedItems,
  } = useContext(CartContext);
  const [activeSection, setActiveSection] = useState("cart");
  const [totalItem, setTotalItem] = useState(0);
  const [totalItemPrice, setTotalItemPrice] = useState(0);
  const [isCheckoutPopupVisible, setIsCheckoutPopupVisible] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    number: "",
    date: "",
    address: "",
  });
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeButton, setActiveButton] = useState("local-store");

  const handleToggle = (section) => {
    setActiveButton(section);
  };

  const handleCancelClick = (order) => {
    setSelectedOrder(order);
    setIsCancelFormVisible(true);
  };

  useEffect(() => {
    const checkedItems = cartItems.filter((item) => item.checked);
    setTotalItem(checkedItems.length);
    setTotalItemPrice(
      checkedItems
        .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
        .toFixed(2)
    );
  }, [cartItems]);

  useEffect(() => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      address: activeButton,
    }));
  }, [activeButton]);

  const handleToggleChecked = (id) => {
    toggleChecked(id);
  };

  const handleCheckoutClick = () => {
    setIsCheckoutPopupVisible(true);
  };

  const handleCloseCheckoutPopup = () => {
    setIsCheckoutPopupVisible(false);
  };

  const getItemColor = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item?.checked ? "green" : "";
  };

  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const checkedItems = cartItems.filter((item) => item.checked);
    if (checkedItems.length > 0) {
      // Combine checked items into a single shipped item
      const combinedItem = {
        id: `shipped-${Date.now()}`,
        food: checkedItems.length > 1 ? "Combined Order" : "Single Order",
        itemImg: checkedItems[0]?.itemImg || "default.png",
        quantity: checkedItems.length,
        totalPrice: checkedItems
          .reduce((acc, item) => acc + parseFloat(item.totalPrice), 0)
          .toFixed(2),
        details: checkedItems,
        userDetails: { ...userDetails },
        address:
          userDetails.address === "local-store"
            ? "Local Store"
            : "Public Market",
      };
      addShippedItem(combinedItem);
      checkedItems.forEach((item) => removeFromCart(item.id)); // Remove checked items from cart
    }
    console.log("User details submitted:", userDetails);
    handleCloseCheckoutPopup();
    alert("Checkouted");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div className="order-sec">
      <div className="order-container">
        <span className="hei"></span>
        <div className="order-box-container">
          <div className="order-head">
            <div className="order-header">
              <a
                href="#cart"
                className={activeSection === "cart" ? "active" : ""}
                onClick={() => setActiveSection("cart")}
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <h3>Cart</h3>
              </a>
            </div>
            <div className="order-ship">
              <a
                href="#ship"
                className={activeSection === "ship" ? "active" : ""}
                onClick={() => setActiveSection("ship")}
              >
                <FontAwesomeIcon icon={faBox} />
                <h3>Orders</h3>
              </a>
            </div>
          </div>
          {activeSection === "cart" && (
            <div className="cart-items">
              {cartItems.length === 0 ? (
                <p className="icon-details">
                  <img src="../../list.png" alt="" className="icon-image" />
                  No items in cart
                </p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-icons">
                      <button
                        className="trash-icon"
                        onClick={() => handleToggleChecked(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          className="trash-can"
                          style={{ color: getItemColor(item.id) }}
                        />
                      </button>
                    </div>
                    <img src={`../../${item.itemImg}`} alt={item.food} />
                    <div className="cart-item-info">
                      <h4>{item.food}</h4>
                      <div className="quantity-cart">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="button1"
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <p className="item-quantity">
                          Quantity:{item.quantity}
                        </p>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="button2"
                          disabled={item.quantity === 1}
                        >
                          <FontAwesomeIcon icon={faMinus} />
                        </button>
                      </div>

                      <p className="item-price">Price: ₱{item.totalPrice} </p>
                      <button
                        className="trash-icon"
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="trash-can"
                        />
                      </button>
                    </div>
                  </div>
                ))
              )}
              {cartItems.length == 0 ? (
                ""
              ) : (
                <div className="cart-total">
                  <div className="cart-total-title">
                    <div className="cart-info">
                      <h3>Total:</h3>
                      <p>
                        {totalItem} {totalItem > 1 ? "items" : "item"}
                      </p>
                    </div>
                    <div className="cart-info">
                      <h2>₱{totalItemPrice}</h2>
                    </div>
                  </div>
                  <div className="checkout-container">
                    <div
                      className="checkout-button"
                      onClick={handleCheckoutClick}
                    >
                      Checkout
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {isCheckoutPopupVisible && (
            <div className="checkout-popup">
              <div className="checkout-popup-content">
                <h2>Checkout</h2>
                <div className="input-form">
                  <form onSubmit={handleFormSubmit} className="input-form">
                    <div className="input-box">
                      <input
                        type="text"
                        name="name"
                        value={userDetails.name}
                        onChange={handleUserDetailsChange}
                        required
                      />
                      <span>Full Name</span>
                      <i></i>
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        name="number"
                        value={userDetails.number}
                        onChange={handleUserDetailsChange}
                        required
                      />
                      <span>Phone Number</span>
                      <i></i>
                    </div>
                    <div className="input-box-date">
                      <input
                        type="date"
                        name="date"
                        value={userDetails.date}
                        onChange={handleUserDetailsChange}
                        required
                      />
                      <span>Date</span>
                      <i></i>
                    </div>
                    <div
                      className="toggle-button"
                      onClick={() =>
                        handleToggle(
                          activeButton === "local-store"
                            ? "public-market"
                            : "local-store"
                        )
                      }
                    >
                      <div
                        className={
                          activeButton === "local-store" ? "active" : ""
                        }
                      >
                        <p>Local Store</p>
                      </div>
                      <div
                        className={
                          activeButton === "public-market" ? "active" : ""
                        }
                      >
                        <p>Public Market</p>
                      </div>
                      <div className={`slider ${activeButton}`}></div>
                    </div>
                    <div className="checkout-buttons">
                      <button type="submit" className="check-submit">
                        Submit
                      </button>
                      <button
                        type="button"
                        className="check-close"
                        onClick={handleCloseCheckoutPopup}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {activeSection == "ship" && (
            <div className="ship-items">
              <div className="ship-header">
                <h4>Customer</h4>
                <h4>Claim Address</h4>
                <h4>Claim Date</h4>
                <h4>Total Quantity</h4>
                <h4>Total Price</h4>
              </div>
              {shippedItems.length === 0 ? (
                <p className="icon-details">
                  <img src="../../ship.png" alt="" className="icon-image" />
                  No orders yet
                </p>
              ) : (
                shippedItems.map((item) => (
                  <div key={item.id} className="shipped-item">
                    <div className="shipped-item-info">
                      <div className="ship-boxes">
                        <p>
                          <strong>{item.userDetails.name}</strong>
                        </p>
                        <p>{item.userDetails.address}</p>
                        <p>{item.userDetails.date}</p>
                        <p>
                          {item.quantity} {item.quantity > 1 ? "items" : "item"}
                        </p>
                        <p>₱{item.totalPrice}</p>

                        <button
                          className="cancel-order"
                          onClick={() => setIsFormVisible(true)}
                        >
                          Cancel
                        </button>

                        <button
                          onClick={toggleDropdown}
                          className="dropdown-toggle"
                          key={item.id}
                        >
                          {dropdownVisible ? (
                            <FontAwesomeIcon icon={faArrowUp} />
                          ) : (
                            <FontAwesomeIcon icon={faArrowDown} />
                          )}
                        </button>
                      </div>

                      {dropdownVisible && (
                        <div className="dropdown-content">
                          <div className="dropdown-container">
                            <h1 className="drop-h">Items</h1>
                            <ul>
                              {item.details.map((detail) => (
                                <li key={detail.id} className="drop-list">
                                  <img
                                    src={`../../${detail.itemImg}`}
                                    alt=""
                                    className="drop-img"
                                  />
                                  <p>{detail.food}</p>
                                  <p>
                                    <span>Quantity: </span>
                                    {detail.quantity}
                                  </p>
                                  ,
                                  <p>
                                    <span>Total Cost:</span> ₱
                                    {detail.totalPrice}
                                  </p>
                                  <p>
                                    <span>Price:</span> ₱{detail.price}/pcs
                                  </p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          {isFormVisible && (
            <CancelOrder
              order={selectedOrder}
              onClose={() => setIsFormVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

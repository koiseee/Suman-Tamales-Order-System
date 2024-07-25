import React, { useContext, useState } from "react";
import { CartContext } from "../CartContext";
import "./CancelForm.css";

export default function CancelOrder({ order, onClose }) {
  const { removeFromShip } = useContext(CartContext);

  const [cancelFormDetails, setCancelFormDetails] = useState({ comment: "" });

  const handleCancelForm = (e) => {
    const { name, value } = e.target;
    setCancelFormDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    removeFromShip(order.id); // Assuming order has
    onClose();
  };

  const handleCLose = () => {
    onClose();
  };

  return (
    <div>
      <div className="form-popup">
        <div>
          <form onSubmit={handleCancelForm} className="form-container">
            <h3>Cancel Order Form</h3>
            <div className="form-textarea">
              <textarea
                type="textarea"
                name="comment"
                value={cancelFormDetails.comment}
                onChange={handleCancelForm}
                required
              />
              <span>Reason for cancellation</span>
              <i></i>
            </div>

            <div className="form-button">
              <button type="submit" className="form-submit">
                Submit
              </button>
              <button
                type="button"
                className="form-close"
                onClick={handleCLose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

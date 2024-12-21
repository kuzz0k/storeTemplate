import React, { useState } from 'react';
import { updateCart } from '../http/basketApi';

const CartItem = ({ deviceId, initialQuantity }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleUpdateClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (quantity <= 0 || quantity >= 1000 || quantity % 1 !== 0) {
      alert('not a valid quantity');
      return;
    }

    setIsEditing(false);
    updateCart(deviceId, quantity)
  };

  const handleInputChange = (e) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <input
            type="number"
            value={quantity}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <div>
          <span>Quantity: {quantity}</span>
          <button onClick={handleUpdateClick}>
            Update
          </button>
        </div>
      )}
    </div>
  );
};


export default CartItem;

import React, { useState } from "react";
import "./Cart.css";
import CartItem from "../../Components/CartItem/CartItem";
import DeliveryForm from "../../Components/DeliveryForm/DeliveryForm";

const Cart = ({ cart, updateCart, removeFromCart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

  const handleOrderClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

   const handleConfirmOrder = () => {
    updateCart([]); 
    closeModal();
  };

  return (
    <div className="cart-container">
      {cart.length === 0 ? (
        <h2 style={{ textAlign: "center", color: "#555" }}>Ձեր զամբյուղը դատարկ է</h2>
      ) : (
        <>
          <ul>
            {cart.map((c) => (
              <CartItem
                key={c.id}
                cart={c}
                updateCart={updateCart}
                removeFromCart={removeFromCart}
              />
            ))}
          </ul>

          <h3
            style={{
              textAlign: "right",
              marginTop: "20px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            Ընդհանուր գումար՝ ${total.toFixed(2)}
          </h3>

          <button
            onClick={handleOrderClick}
            style={{
              marginTop: "15px",
              float: "right",
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Պատվիրել
          </button>

          {isModalOpen && <DeliveryForm total={total} onClose={closeModal} clearCart={handleConfirmOrder} />}
        </>
      )}
    </div>
  );
};

export default Cart;

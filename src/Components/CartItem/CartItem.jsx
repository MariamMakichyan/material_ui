import React, { useState } from "react"

const CartItem = ({ cart, updateCart, removeFromCart }) => {
    const [count, setCount] = useState(cart.count)

    const minus = () => {
        if (count > 1) {
            const newCount = count - 1
            setCount(newCount)
            updateCart(newCount, cart.id)
        } else {
            removeFromCart(cart.id)
        }
    }

    const plus = () => {
        const newCount = count + 1
        setCount(newCount)
        updateCart(newCount, cart.id)
    }


    const handleDelete = () => {
        removeFromCart(cart.id)
    }

    return (
        <li key={cart.id}>
            <div>
                <img src={cart.thumbnail} width={100} alt={cart.title} />
            </div>
            <div>
                <button onClick={plus}>+</button>
                <span>{count}</span>
                <button onClick={minus}>-</button>
            </div>
            <div>
                <h5>{(cart.price * count).toFixed(2)}$</h5>
            </div>
            <button
                onClick={handleDelete}
                style={{
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "5px 10px",
                    cursor: "pointer",
                }}
            >
                🗑️
            </button>
        </li>
    )
}

export default CartItem

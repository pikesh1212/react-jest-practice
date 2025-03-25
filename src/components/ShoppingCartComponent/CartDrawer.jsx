import { useCart } from "./CartContext";

function CartDrawer() {
    const { cart, removeFromCart, updateQuantity, setIsCartOpen } = useCart();
  
    return (
      <div>
        <h3>Shopping Cart</h3>
        <button className="btn btn-primary" onClick={() => setIsCartOpen(false)}>Close</button>
        {cart.length === 0 ? <p>Cart is empty</p> : (
          <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                <img src="https://picsum.photos/200/300" alt={item.name} width="50" />
                <div>
                  <p>{item.name}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button className="btn btn-sm btn-primary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span> {item.quantity} </span>
                  <button className="btn btn-sm btn-danger" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          </div>
        )}
      </div>
    );
  }
  export default CartDrawer;
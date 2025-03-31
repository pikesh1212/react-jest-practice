import { useCart } from "./CartContext";

function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    setIsCartOpen,
    isCartOpen,
  } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <h3 className="text-center">Cart</h3>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => setIsCartOpen(false)}
        >
          Close
        </button>
        <button
          className="btn btn-primary"
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          Cart: {totalItems} items
        </button>
      </div>
      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <img
                  src="https://picsum.photos/200/300"
                  alt={item.name}
                  width="50"
                />
                <div>
                  <p>{item.name}</p>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    data-testid="decrement"
                    className="btn btn-sm btn-primary"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span data-testid="quantity"> {item.quantity} </span>
                  <button
                    data-testid="increment"
                    className="btn btn-sm btn-danger"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  data-testid="remove"
                  className="btn btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default CartDrawer;

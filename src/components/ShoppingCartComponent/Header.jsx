import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

function Header() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <button className="btn btn-primary mb-4" onClick={() => setIsCartOpen(!isCartOpen)}>Cart: {totalItems} items</button>
      {isCartOpen && <CartDrawer />}
    </div>
  );
}
export default Header
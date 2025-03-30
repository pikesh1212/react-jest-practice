import { useCart } from "./CartContext";
import CartDrawer from "./CartDrawer";

function Header() {
  const { cart, isCartOpen, setIsCartOpen } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
       <h1 className="text-center">Shopping App</h1>
       <hr />
      {isCartOpen ? (
        <CartDrawer />
      ) : (
        <div>
          <div className="text-end">
            <button
              className="btn btn-primary mb-4"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              Cart: {totalItems} items
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;

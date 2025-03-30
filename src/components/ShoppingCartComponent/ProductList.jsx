import { useCart } from "./CartContext";

function ProductList() {
  const { addToCart, isCartOpen } = useCart();
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: "/images/headphones.jpg",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 149.99,
      image: "/images/smartwatch.jpg",
    },
    {
      id: 3,
      name: "Laptop Stand",
      price: 39.99,
      image: "/images/laptop-stand.jpg",
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 89.99,
      image: "/images/speaker.jpg",
    },
    {
      id: 5,
      name: "Fitness Tracker",
      price: 129.99,
      image: "/images/fitness-tracker.jpg",
    },
    {
      id: 6,
      name: "Desk Lamp",
      price: 19.99,
      image: "/images/desk-lamp.jpg",
    },
    {
      id: 7,
      name: "Ergonomic Chair",
      price: 249.99,
      image: "/images/chair.jpg",
    },
    {
      id: 8,
      name: "Mechanical Keyboard",
      price: 69.99,
      image: "/images/keyboard.jpg",
    },
    {
      id: 9,
      name: "Wireless Mouse",
      price: 49.99,
      image: "/images/mouse.jpg",
    },
    {
      id: 10,
      name: "Portable Monitor",
      price: 179.99,
      image: "/images/monitor.jpg",
    },
  ];
  if (isCartOpen) {
    return <></>;
  }

  return (
    <div className="product-list" style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {products.map((product) => (
        <div
          key={product.id}
          style={{ border: "1px solid #ccc", padding: "10px" }}
        >
          <img
            src="https://picsum.photos/200/300"
            alt={product.name}
            width="100"
          />
          <h4>{product.name}</h4>
          <p>${product.price.toFixed(2)}</p>
          <button
            className="btn btn-primary"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
export default ProductList;

import { fireEvent, render, screen } from "@testing-library/react";
import ShoppingCart from "../components/ShoppingCartComponent/ShoppingCart";
import { CartProvider } from "../components/ShoppingCartComponent/CartContext";

describe("Shopping Cart Tests", () => {
  beforeEach(() => {
    localStorage.clear();
    render(
      <CartProvider>
        <ShoppingCart />
      </CartProvider>
    );
  });

  test("renders header", () => {
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Shopping App");
  });

  test("renders cart button", () => {
    expect(screen.getByRole("button", { name: /Cart: 0 items/i })).toBeInTheDocument();
  });

  test("renders product list", () => {
    expect(document.querySelector(".product-list")).toBeInTheDocument();
  });

  test("add to cart button works", () => {
    const addToCartButtons = screen.getAllByRole("button", { name: /add to cart/i });
    expect(addToCartButtons).toHaveLength(10);

    fireEvent.click(addToCartButtons[0]);
    expect(screen.getByRole("button", { name: /Cart: 1 items/i })).toBeInTheDocument();
  });

  test("cart updates when item is added", () => {
    fireEvent.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /Cart:/i }));

    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
  });

  test("cart item quantity updates", () => {
    fireEvent.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /Cart:/i }));

    expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cart: 1 items/i })).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("increment"));
    expect(screen.getByTestId("quantity")).toHaveTextContent("2");
  });

  test("removes item from cart", () => {
    fireEvent.click(screen.getAllByRole("button", { name: /add to cart/i })[0]);
    fireEvent.click(screen.getByRole("button", { name: /Cart:/i }));

    expect(screen.getByText(/Wireless Headphones/i)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("remove"));
    expect(screen.getByText("Cart is empty")).toBeInTheDocument();
  });
});

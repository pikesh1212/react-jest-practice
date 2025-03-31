import { render, screen, fireEvent } from "@testing-library/react";
import useFetch from "../hooks/useFetch";
import UserTable from "../components/UserTable";
import { act } from "react";
jest.mock("../hooks/useFetch");

jest.mock("react-spinners", () => ({
  ClipLoader: jest.fn(() => <div data-testid="clip-loader"></div>),
}));

const mockUsers = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    company: { name: "TechCorp", title: "Manager", department: "IT" },
    address: { city: "New York", address: "123 Main St" },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    company: {
      name: "BizInc",
      title: "Developer",
      department: "Engineering",
    },
    address: { city: "Los Angeles", address: "456 Elm St" },
  },
  {
    id: 3,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice.jh@gmail.com",
    company: { name: "TechCorp", title: "Manager", department: "IT" },
    address: { city: "New York", address: "123 Main St" },
  },
  {
    id: 4,
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    company: {
      name: "BizInc",
      title: "Developer",
      department: "Engineering",
    },
    address: { city: "Los Angeles", address: "456 Elm St" },
  },
  {
    id: 5,
    firstName: "Charlie",
    lastName: "Davis",
    email: "charlie.davis@example.com",
    company: { name: "TechCorp", title: "Manager", department: "IT" },
    address: { city: "New York", address: "123 Main St" },
  },
  {
    id: 6,
    firstName: "Diana",
    lastName: "White",
    email: "diana.white@example.com",
    company: {
      name: "BizInc",
      title: "Developer",
      department: "Engineering",
    },
    address: { city: "Los Angeles", address: "456 Elm St" },
  },
  {
    id: 7,
    firstName: "Eve",
    lastName: "Green",
    email: "eve.green@example.com",
    company: { name: "TechCorp", title: "Manager", department: "IT" },
    address: { city: "New York", address: "123 Main St" },
  },
  {
    id: 8,
    firstName: "Frank",
    lastName: "Black",
    email: "frank.black@example.com",
    company: {
      name: "BizInc",
      title: "Developer",
      department: "Engineering",
    },
    address: { city: "Los Angeles", address: "456 Elm St" },
  },
];

describe("UserTable", () => {
  beforeEach(() => {
    // Setup default mock implementation
    useFetch.mockReturnValue({
      users: mockUsers,
      loading: false,
    });
  });

  test("renders table with user data", () => {
    render(<UserTable />);

    // Check if table headers are present
    expect(screen.getByText(/First/i)).toBeInTheDocument();
    expect(screen.getByText("Email ↑↓")).toBeInTheDocument();

    //check if data is there in table
    expect(screen.getAllByText("John")[0]).toBeInTheDocument();
    expect(screen.getAllByText("john.doe@example.com")[0]).toBeInTheDocument();
  });

  test("search functionality works", () => {
    render(<UserTable />);

    const searchInput = screen.getAllByPlaceholderText("Search...")[0];
    fireEvent.change(searchInput, { target: { value: "John" } });

    // Should show John but not Jane
    expect(screen.getAllByText("John")[0]).toBeInTheDocument();
    expect(screen.queryByText("Jane")).not.toBeInTheDocument();
  });

  test("displays loading state", () => {
    useFetch.mockReturnValue({ users: [], loading: true });
    render(<UserTable />);
    const loadingCell = screen.getByTestId("loader");
    expect(loadingCell).toBeInTheDocument();
  });

  test("renders table with user data when loading is complete", () => {
    useFetch.mockReturnValue({
      users: [
        {
          id: 1,
          firstName: "John",
          email: "john@example.com",
          company: { name: "TechCorp" },
          address: { city: "New York" },
        },
      ],
      loading: false,
    });

    render(<UserTable />);

    expect(screen.getAllByText("John")[0]).toBeInTheDocument();
    expect(screen.getAllByText("john@example.com")[0]).toBeInTheDocument();
    expect(screen.getAllByText("TechCorp")[0]).toBeInTheDocument();
    expect(screen.getAllByText("New York")[0]).toBeInTheDocument();
  });

  test("renders pagination controls", () => {
    useFetch.mockReturnValue({
      users: [
        {
          id: 1,
          firstName: "John",
          email: "john@example.com",
          company: { name: "TechCorp" },
          address: { city: "New York" },
        },
      ],
      loading: false,
    });

    render(<UserTable />);

    expect(screen.getByText(/previous/i)).toBeInTheDocument();
    expect(screen.getByText(/next/i)).toBeInTheDocument();
  });

  test("Next button test on pagination", () => {
    useFetch.mockReturnValue({
      users: mockUsers,
      loading: false,
    });
    render(<UserTable />);

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    expect(screen.getAllByText("Diana")[0]).toBeInTheDocument();
  });

  test("Previous button test on pagination", () => {
    useFetch.mockReturnValue({
      users: mockUsers,
      loading: false,
    });
    render(<UserTable />);
    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);
    const prevButton = screen.getByText(/previous/i);
    fireEvent.click(prevButton);
    expect(screen.getAllByText("John")[0]).toBeInTheDocument();
  });

  test("sorts users by email", () => {
    render(<UserTable />);

    const emailHeader = screen.getByText("Email ↑↓");
    fireEvent.click(emailHeader);

    expect(screen.getAllByText("Alice")[0]).toBeInTheDocument();
  });
  
  test("sorts users by first name", () => {
    render(<UserTable />);
    const firstNameHeader = screen.getByText("First ↑↓");
    fireEvent.click(firstNameHeader);
    expect(screen.getAllByText("Alice")[0]).toBeInTheDocument();
  });

  test("displays user details when a card is clicked", async () => {
    await useFetch.mockReturnValue({
      users: mockUsers,
      loading: false,
    });
    render(<UserTable />);

    const firstRow = screen.getAllByRole("row")[1];
    await act(async () => {
      firstRow.click();
    });

    expect(screen.getByTestId("userDisplayCard")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
});

describe("UserTable (Small Screen)", () => {
  beforeAll(() => {
    // Mock window.matchMedia for small screen
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: query === "(max-width: 768px)",
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      })),
    });
  });

  test("renders user cards on small screens", () => {
    useFetch.mockReturnValue({
      users: mockUsers,
      loading: false,
    });
    render(<UserTable />);
    const userCards = screen.getAllByTestId("userCard");
    expect(userCards).toHaveLength(5);
    expect(screen.getAllByText("John")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Jane")[0]).toBeInTheDocument();
  });
});

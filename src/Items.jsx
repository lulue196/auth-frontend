import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

function Items() {
  const navigate = useNavigate();

  const { isLoggedIn, isInitializing } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [amount, setAmount] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editAmount, setEditAmount] = useState("");

  useEffect(() => {
    if (isInitializing) return;

    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    getItems();
  }, [isInitializing, isLoggedIn, navigate]);

  async function getItems() {
    try {
      const response = await fetch(`${API_URL}/api/item`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to load items");
        return;
      }

      setItems(data.itemList || []);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  }

  async function createItem(event) {
    event.preventDefault();

    if (!name || !category || !price || !amount) {
      setMessage("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          amount: Number(amount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to create item");
        return;
      }

      setName("");
      setCategory("");
      setPrice("");
      setAmount("");

      setMessage("Item created successfully");

      await getItems();
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  }

  function startEdit(item) {
    setEditingId(item._id);
    setEditName(item.name);
    setEditCategory(item.category);
    setEditPrice(item.price);
    setEditAmount(item.amount);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function updateItem(id) {
    try {
      const response = await fetch(`${API_URL}/api/item/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: editName,
          category: editCategory,
          price: Number(editPrice),
          amount: Number(editAmount),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update item");
        return;
      }

      setEditingId(null);
      setMessage("Item updated successfully");

      await getItems();
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  }

  async function deleteItem(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/api/item/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to delete item");
        return;
      }

      setMessage("Item deleted successfully");

      await getItems();
    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  }

  if (isInitializing) {
    return <p>Loading...</p>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <button
        onClick={() => navigate("/")}
        style={{ marginBottom: "20px" }}
      >
        Back to Home
      </button>

      <h1>Items</h1>

      <h2>Create Item</h2>

      <form onSubmit={createItem}>
        <div>
          <input
            type="text"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <br />

        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <br />

        <button type="submit">Create Item</button>
      </form>

      {message && <p>{message}</p>}

      <hr />

      <h2>Item List</h2>

      {items.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item._id}>
                {editingId === item._id ? (
                  <>
                    <td>
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        value={editCategory}
                        onChange={(e) => setEditCategory(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                      />
                    </td>

                    <td>
                      <button onClick={() => updateItem(item._id)}>
                        Save
                      </button>

                      {" "}

                      <button onClick={cancelEdit}>
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.price}</td>
                    <td>{item.amount}</td>

                    <td>
                      <button onClick={() => startEdit(item)}>
                        Edit
                      </button>

                      {" "}

                      <button onClick={() => deleteItem(item._id)}>
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Items;
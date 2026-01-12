import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddProduct({ products, setProducts }) {
  const navigate = useNavigate();

  // ✅ FIXED STATE
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    qty: "",
    subtotal: 0
  });

  // ✅ SAFE CHANGE HANDLER
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedProduct = {
      ...product,
      [name]: value
    };

    if (name === "price" || name === "qty") {
      const price = Number(updatedProduct.price || 0);
      const qty = Number(updatedProduct.qty || 0);
      updatedProduct.subtotal = price * qty;
    }

    setProduct(updatedProduct);
  };

  // ✅ SAFE SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !product.name.trim() ||
      !product.category.trim() ||
      product.price === "" ||
      product.qty === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    const price = Number(product.price);
    const qty = Number(product.qty);
    const subtotal = price * qty;

    const existingIndex = products.findIndex(
      (p) => p.name === product.name && p.category === product.category
    );

    let updatedProducts;

    if (existingIndex >= 0) {
      const existingProduct = products[existingIndex];
      const newQty = existingProduct.qty + qty;
      const newSubtotal = existingProduct.price * newQty;

      updatedProducts = [...products];
      updatedProducts[existingIndex] = {
        ...existingProduct,
        qty: newQty,
        subtotal: newSubtotal
      };
    } else {
      const newProduct = {
        id: Date.now(),
        name: product.name,
        category: product.category,
        price,
        qty,
        subtotal
      };

      updatedProducts = [...products, newProduct];
    }

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create Product</h2>

      <form onSubmit={handleSubmit}>
        <table width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>No</td>

              <td>
                <input
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </td>

              <td>
                <input
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Category"
                />
              </td>

              <td>
                <input
                  name="price"
                  type="number"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Price"
                />
              </td>

              <td>
                <input
                  name="qty"
                  type="number"
                  value={product.qty}
                  onChange={handleChange}
                  placeholder="Qty"
                />
              </td>

              <td>
                <input
                  name="subtotal"
                  type="number"
                  value={product.subtotal}
                  readOnly
                />
              </td>

              <td>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate("/")}>
                  Cancel
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

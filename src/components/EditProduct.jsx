import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function EditProduct({ products, setProducts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));

  // ✅ Always controlled inputs
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    qty: "",
    subtotal: 0
  });

  // ✅ Load product safely
  useEffect(() => {
    if (product) {
      setForm({
        name: product.name ?? "",
        category: product.category ?? "",
        price: product.price ?? "",
        qty: product.qty ?? "",
        subtotal: (Number(product.price) || 0) * (Number(product.qty) || 0)
      });
    }
  }, [product]);

  // ✅ Safe input handling (NO NaN)
  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value
    };

    if (name === "price" || name === "qty") {
      const price = Number(updatedForm.price || 0);
      const qty = Number(updatedForm.qty || 0);
      updatedForm.subtotal = price * qty;
    }

    setForm(updatedForm);
  };

  // ✅ Update product
  const handleUpdate = (e) => {
    e.preventDefault();

    const updatedProducts = products.map(p =>
      p.id === Number(id)
        ? {
            ...form,
            price: Number(form.price || 0),
            qty: Number(form.qty || 0),
            subtotal: Number(form.subtotal || 0)
          }
        : p
    );

    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    navigate("/");
  };

  if (!product) return <p>Product not found</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>
        <table border="1" width="100%" cellPadding="8">
          <tbody>
            <tr>
              <td>Name</td>
              <td>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Category</td>
              <td>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Price</td>
              <td>
                <input
                  name="price"
                  type="number"
                  value={form.price}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Quantity</td>
              <td>
                <input
                  name="qty"
                  type="number"
                  value={form.qty}
                  onChange={handleChange}
                />
              </td>
            </tr>

            <tr>
              <td>Subtotal</td>
              <td>
                <input
                  name="subtotal"
                  type="number"
                  value={form.subtotal}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit">Update</button>
        <button type="button" onClick={() => navigate("/")}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProduct;

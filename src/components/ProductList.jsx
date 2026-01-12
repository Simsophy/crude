import { Link } from "react-router-dom";

function ProductList({ products, setProducts }) {

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updated = products.filter(p => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated)); // Save immediately
    }
  };
  return (
    <div style={container}>
      <h2 style={title}>Product List</h2>
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>#</th>
            <th style={th}>Name</th>
            <th style={th}>Category</th>
            <th style={th}>Price</th>
            <th style={th}>Quantity</th>
            <th style={th}>Subtotal</th>
            <th style={th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id} style={index % 2 === 0 ? trEven : trOdd}>
              <td style={td}>{index + 1}</td>
              <td style={td}>{product.name}</td>
              <td style={td}>{product.category}</td>
              <td style={td}>${product.price}</td>
              <td style={td}>{product.qty || product.quantity}</td>
              <td style={td}>${product.subtotal}</td>
              <td style={td}>
                <Link to={`/view/${product.id}`}><button style={btnView}>View</button></Link>
                <Link to={`/edit/${product.id}`}><button style={btnEdit}>Edit</button></Link>
                <button style={btnDelete} onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Styles
const container = {
  padding: "20px",
  maxWidth: "900px",
  margin: "20px auto",
  backgroundColor: "#fdfdfd",
  borderRadius: "8px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
};

const title = {
  textAlign: "center",
  marginBottom: "20px",
  color: "#333"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
};

const th = {
  border: "1px solid #ddd",
  padding: "12px",
  backgroundColor: "#007bff",
  color: "white",
  textAlign: "left"
};

const td = {
  border: "1px solid #ddd",
  padding: "12px",
  textAlign: "left"
};

const trEven = {
  backgroundColor: "#f9f9f9"
};

const trOdd = {
  backgroundColor: "#ffffff"
};

// Button styles
const btnView = {
  backgroundColor: "#17a2b8",
  color: "white",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px",
  borderRadius: "4px",
  cursor: "pointer"
};

const btnEdit = {
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  padding: "5px 10px",
  marginRight: "5px",
  borderRadius: "4px",
  cursor: "pointer"
};

const btnDelete = {
  backgroundColor: "#dc3545",
  color: "white",
  border: "none",
  padding: "5px 10px",
  borderRadius: "4px",
  cursor: "pointer"
};

export default ProductList;

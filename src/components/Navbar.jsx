import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{ background: "#0d6efd", padding: "10px" }}>
      <h2 style={{ color: "white", display: "inline" }}>Product Management</h2>

      <Link to="/add">
        <button style={{ float: "right" }}>Add Product</button>
      </Link>
    </div>
  );
}

export default Navbar;

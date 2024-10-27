import { NavLink } from "react-router-dom";
import "./css/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1>Welcome to PocketTailer</h1>
      <p>Manage your tailoring services effortlessly with our platform.</p>

      <ul
        style={{ listStyle: "none", display: "flex", flexDirection: "column" }}
        className="features"
      ></ul>

      <NavLink to="/addorder">addorder</NavLink>
      <NavLink to="/add-client">addcustomer</NavLink>
    </div>
  );
};

export default HomePage;

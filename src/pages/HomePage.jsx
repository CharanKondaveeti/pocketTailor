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
      >
        <li>
          <NavLink to="/measurements">Measurements</NavLink>
        </li>
        <li>
          <NavLink to="/profile">profile</NavLink>
        </li>
        <li>
          <NavLink to="/order">order</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/choosecustomer">view</NavLink>
        </li>
        <li></li>
      </ul>

      <NavLink to="/addorder">addorder</NavLink>
    </div>
  );
};

export default HomePage;

import { Navigate, useNavigate } from "react-router-dom";
import "./css/OrderSuccessful.css";

function OrderSuccessful() {
  const navigate = useNavigate();

  function backToHome() {
    navigate("/homepage");
  }

  return (
    <div className="order-success-container">
      <div className="checkmark">&#10004;</div>
      <h2>Order Successfully Placed!</h2>
      <button onClick={backToHome} className="view-orders-button">
        View All Orders
      </button>
    </div>
  );
}

export default OrderSuccessful;

import "./css/OrdersAdded.css";
import { MdOutlineEdit } from "react-icons/md";
function OrdersAdded({ allOrders }) {
  return (
    <div className="orders-added">
      <h2 className="heading--secondary">Orders Added</h2>
      {allOrders.map((eachOrder, index) => {
        return (
          <div key={index} className="orderBrief">
            <p> {eachOrder.garmentType}</p>
            <span className="edit-order">
              <MdOutlineEdit size={20} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default OrdersAdded;

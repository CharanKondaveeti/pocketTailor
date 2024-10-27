import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TitleBar from "../UI/TitleBar/TitleBar";
import MeasurementOptions from "../features/MeasurementOptions";
import OrdersAdded from "../features/OrdersAdded";
import { useMutation } from "@tanstack/react-query";
import "./css/OrderPage.css";
import { confirmOrders } from "../api/customers";
import OrderSuccessful from "../features/OrderSuccessful";

const OrderPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [orderSucess, setOrderSucess] = useState(false);
  const { customerId, userName, phoneNumber, photo } = state || {};
  const [selectedOpt, setSelectedOpt] = useState("");
  const [selectedID, setSelectedID] = useState(0);
  const [addOrder, setAddOrder] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const [currOrder, setCurrOrder] = useState({
    deliveryDate: "",
    garmentType: "",
    measurementId: "",
    isPaid: false,
  });

  const garmentTypes = ["Shirt", "Pants", "Dress", "Skirt"];

  function whenOptionClicked(e, selectedObj) {
    setCurrOrder({ ...currOrder, ["measurementId"]: selectedObj?.id });
    setSelectedOpt(selectedObj?.category || "");
  }
  function whenGivingInput(e) {
    const { name, value } = e.target;
    setCurrOrder({ ...currOrder, [name]: value });
  }

  function whenSubmitClicked(e) {
    e.preventDefault();
    setAllOrders([...allOrders, currOrder]);
    setCurrOrder({
      deliveryDate: "",
      garmentType: "",
      measurementId: "",
      isPaid: false,
    });
    setAddOrder(false);
  }

  const confirmOrdersMutation = useMutation({
    mutationFn: confirmOrders,
    onSuccess: () => {
      // navigate("/choosecustomer");
      setOrderSucess(true);
    },
  });

  function whenConfirmClicked(e) {
    e.preventDefault();
    const generateDealId = () => `${Math.floor(Math.random() * 100000)}`;
    const dealId = generateDealId();
    const formattedOrders = allOrders.map((order) => ({
      dealId,
      customerId,
      garmentType: order.garmentType,
      totalPrice: 0,
      measurementId: order.measurementId,
      isPaid: order.isPaid,
      deliveryDate: order.deliveryDate,
    }));

    console.log(formattedOrders);

    confirmOrdersMutation.mutate(formattedOrders);
  }

  return (
    <div>
      {!orderSucess ? (
        <section className="order-page section">
          <TitleBar title={"Order Page"} />
          <div className="customer-info">
            <img src={photo} alt="image" />
            <p>{userName}</p>
          </div>

          {addOrder ? (
            <div className="order-entry">
              <div className="form-group">
                <label>Type of Garment:</label>
                <select
                  name="garmentType"
                  value={currOrder.garmentType}
                  onChange={whenGivingInput}
                >
                  <option value="">Select</option>
                  {garmentTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Delivery Date:</label>
                <input
                  name="deliveryDate"
                  type="date"
                  value={currOrder.deliveryDate}
                  onChange={whenGivingInput}
                />
              </div>

              <MeasurementOptions
                measurementId={currOrder.measurementId}
                customerId={customerId}
                onMeasurementChange={whenOptionClicked}
                selectedOpt={selectedOpt}
              />
              <div className="btns">
                <button onClick={whenSubmitClicked}>Submit Order</button>
                <button onClick={() => setAddOrder(false)}>back</button>
              </div>
            </div>
          ) : (
            <div>
              {allOrders.length > 0 && <OrdersAdded allOrders={allOrders} />}
              <div className="btn-container">
                <button
                  className="open-button"
                  onClick={() => setAddOrder(true)}
                >
                  + Add Order
                </button>
                <button className="open-button" onClick={whenConfirmClicked}>
                  Confirm Orders
                </button>
              </div>
            </div>
          )}
        </section>
      ) : (
        <OrderSuccessful />
      )}
    </div>
  );
};

export default OrderPage;

import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import TitleBar from "../UI/TitleBar/TitleBar";
import MeasurementOptions from "../features/MeasurementOptions";
import OrdersAdded from "../features/OrdersAdded";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./css/OrderPage.css";
import { confirmOrders } from "../api/customers";
import OrderSuccessful from "../features/OrderSuccessful";
import { getMeasurements } from "../api/customers";
import { PostContext } from "../App";
import { queryOptions } from "@tanstack/react-query";

const OrderPage = () => {
  const { state } = useLocation();
  const { selectedCustomer, setSelectedCustomer } = useContext(PostContext);
  // const { id:customerId, name:userName, phoneNumber, photo } = state || {};
  // const { customerId, userName, phoneNumber, photo } = selectedCustomer || {};
  const {
    id: customerId,
    name: userName,
    phoneNumber,
    photo,
  } = JSON.parse(localStorage.getItem("selectedCustomer")) || {};

  const navigate = useNavigate();
  const [orderSucess, setOrderSucess] = useState(false);
  const [selectedMeasurement, setSelectedMeasurement] = useState([]);
  const [addOrder, setAddOrder] = useState(true);
  const [allOrders, setAllOrders] = useState([]);
  const [currOrder, setCurrOrder] = useState({
    deliveryDate: "",
    garmentType: "",
    measurementId: "",
    isPaid: false,
  });

  const {
    data: measurements = [],
    error,
    isLoading,
  } = useQuery({
    querykey: ["measurements"],
    queryFn: () => getMeasurements(customerId),
  });

  const garmentTypes = ["Shirt", "Pants", "Dress", "Skirt"];

  function whenGivingInput(e) {
    const { name, value } = e.target;

    if (name === "measurementId" && value === "new") {
      navigate("/addmeasurements", {
        state: {
          customerId,
        },
      });
    } else if (name === "measurementId" && value !== "new") {
      setCurrOrder({ ...currOrder, [name]: value });
      const measurementjson = measurements.find((each) => each.id == value);

      if (measurementjson) {
        setSelectedMeasurement(measurementjson);
      }
    } else {
      setCurrOrder({ ...currOrder, [name]: value });
    }
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

              <div className="form-group pp">
                <label>Measurement Option:</label>
                <select
                  name="measurementId"
                  value={currOrder.measurementId}
                  onChange={whenGivingInput}
                >
                  <option value="">Select</option>
                  <option value="new">➕ Add New</option>
                  {measurements.map((eachObj) => (
                    <option key={eachObj.category} value={eachObj.id}>
                      {eachObj.category}
                    </option>
                  ))}
                </select>
              </div>

              {selectedMeasurement.length > 0 && (
                <div className="showcase--measurement">
                  {selectedMeasurement.category && (
                    <>
                      <h4>{selectedMeasurement.category}</h4>
                      <ul>
                        {selectedMeasurement.data.map((measurement, index) => (
                          <>
                            {Object.entries(measurement).map(([key, value]) => (
                              <li key={`${index}-${key}`}>
                                <span>{key}</span>
                                <span>{value}</span>
                              </li>
                            ))}
                          </>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              )}

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

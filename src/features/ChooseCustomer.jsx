import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FiUserPlus } from "react-icons/fi";
import { getCustomers } from "../api/customers";
import TitleBar from "../UI/TitleBar/TitleBar";
import Input from "../UI/Input/Input";
import "./css/ViewCustomers.css";
import { PostContext } from "../App";

function RandomAvatar() {
  const avatarCount = 12;
  const randomIndex = Math.floor(Math.random() * avatarCount) + 1;
  return (
    <img
      className="avatar"
      src={`src/assets/avatars/avatar${randomIndex}.png`}
      alt="avatar"
    />
  );
}

const ChooseCustomer = () => {
  const { selectedCustomer, setSelectedCustomer } = useContext(PostContext);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const tailorId = JSON.parse(localStorage.getItem("tailorData"))?.id;
  console.log(tailorId);

  const {
    data: customers = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["customers", tailorId],
    queryFn: () => getCustomers(tailorId),
    enabled: !!tailorId,
  });

  const AddClient = () => navigate("/add-client");

  useEffect(() => {
    localStorage.removeItem("selectedCustomer");
  }, []);

  const handleCustomerSelect = (customer) => {
    localStorage.setItem("selectedCustomer", JSON.stringify(customer));
    setSelectedCustomer(customer);
    navigate("/order", {
      state: {
        customerId: customer.id,
        userName: customer.name,
        phoneNumber: customer.phone,
        photo: customer.photo,
      },
    });
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.gender.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="chooseCustomer-section section">
      <TitleBar title={"Customer"} />

      <Input
        mode={"search"}
        setter={setSearchQuery}
        value={searchQuery}
        placeholder={"Enter a Name or Numner"}
      />

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {/* recent */}
          <h3 className="heading--secondary">Recent</h3>
          <ul className="recent-customer--ul">
            <li
              className="recent-customer--li"
              // onClick={() => handleCustomerSelect(customer)}
            >
              <i>
                <RandomAvatar />
              </i>
              <p>charan</p>
            </li>
            <li
              className="recent-customer--li"
              // onClick={() => handleCustomerSelect(customer)}
            >
              <i>
                <RandomAvatar />
              </i>
              <p>vennela</p>
            </li>
            <li
              className="recent-customer--li"
              // onClick={() => handleCustomerSelect(customer)}
            >
              <i>
                <RandomAvatar />
              </i>
              <p>chinnu</p>
            </li>
            <li
              className="recent-customer--li"
              // onClick={() => handleCustomerSelect(customer)}
            >
              <i>
                <RandomAvatar />
              </i>
              <p>Ammulu</p>
            </li>
          </ul>
          {/* recent end */}
          <ul className="customer--ul">
            <h3 className="heading--secondary">Select Contacts</h3>
            <li className="customer--li" onClick={AddClient}>
              <i className="addcustomer--avatar">
                <FiUserPlus fill="#030870" size={20} />
              </i>
              <p>add customer</p>
            </li>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <li
                  key={customer.id}
                  className="customer--li"
                  onClick={() => handleCustomerSelect(customer)}
                >
                  <i>
                    <img className="avatar" src={customer.photo} alt="" />
                  </i>
                  <p>{customer.name}</p>
                </li>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-customers">
                  No matching customers found. Click on Add Client.
                </td>
              </tr>
            )}
            {/*  */}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ChooseCustomer;

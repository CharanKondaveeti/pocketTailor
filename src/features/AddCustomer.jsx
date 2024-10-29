import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Select from "react-select";
import { addCustomer } from "../api/customers";
import "./css/AddCustomer.css";
import maleAvatar from "../UI/MaleAvatar";
import femaleAvatar from "../UI/FemaleAvatar";
import TitleBar from "../UI/TitleBar/TitleBar";
import Input from "../UI/Input/Input";

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const AddCustomer = () => {
  const [clientName, setClientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addClientMutation = useMutation({
    mutationFn: addCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries(["customers"]);
      navigate("/choosecustomer");
    },
    onError: (error) => {
      console.error("Error adding client:", error);
    },
  });

  const tailorData = JSON.parse(localStorage.getItem("tailorData"));
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newClient = {
      tailorId: tailorData?.id,
      name: clientName,
      phone: phoneNumber,
      gender: gender?.value,
      photo: gender?.value === "Male" ? maleAvatar() : femaleAvatar(),
    };

    addClientMutation.mutate(newClient);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "#007bff",
      boxShadow: "none",
      "&:hover": { borderColor: "#0056b3" },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "#007bff",
      backgroundColor: state.isSelected ? "#007bff" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "#0056b3" : "#cce5ff",
        color: state.isSelected ? "white" : "#0056b3",
      },
    }),
  };

  return (
    <form className="client-container section" onSubmit={handleFormSubmit}>
      <TitleBar title={"Add Customer"} />
      <Input
        mode={"name"}
        setter={setClientName}
        value={clientName}
        placeholder={"Enter Name"}
      />
      <Input
        mode={"phoneNumber"}
        setter={setPhoneNumber}
        value={phoneNumber}
        placeholder={"Enter Number"}
      />
      <div className="gender-selection">
        <Select
          options={genderOptions}
          value={gender}
          onChange={setGender}
          placeholder="Select Gender"
          styles={customStyles}
          isSearchable={false}
        />
      </div>
      <div className="submit-button">
        <button type="submit" disabled={addClientMutation.isLoading}>
          {addClientMutation.isLoading ? "Adding..." : "Next"}
        </button>
      </div>
      {addClientMutation.isError && (
        <p className="error">
          Error adding client: {addClientMutation.error.message}
        </p>
      )}
    </form>
  );
};

export default AddCustomer;

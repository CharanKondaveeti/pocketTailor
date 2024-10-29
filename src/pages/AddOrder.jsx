import { createContext, useContext, useState } from "react";

import ChooseCustomer from "../features/ChooseCustomer";
// import { PostContext } from "../App";

export default function AddOrder() {
  // const { selectedCustomer, setSelectedCustomer } = useContext(PostContext);
  return (
    <div className="addorder">
      <ChooseCustomer />
    </div>
  );
}

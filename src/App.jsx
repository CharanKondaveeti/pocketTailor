import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile/Profile";
import OrderPage from "./pages/OrderPage/OrderPage";
import ViewCustomers from "./pages/ViewCustomers/ViewCustomers";
import AddClient from "./pages/AddClient/AddClient";

import MeasurementsInput from "./pages/MeasurementsInput";
import Experiments from "./Experiments";

const options = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/order" element={<OrderPage/>} />

          <Route path="/view" element={<ViewCustomers />} />
          <Route path="/add-client" element={<AddClient />} />
          <Route path="/measurements" element={<MeasurementsInput />} />
          <Route path="/exp" element={<Experiments options={options} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

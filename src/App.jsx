import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Profile from "./pages/Profile/Profile";
import ViewCustomers from "./pages/ViewCustomers/ViewCustomers";
import AddClient from "./pages/AddClient/AddClient";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view" element={<ViewCustomers />} />
          <Route path="/add-client" element={<AddClient />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

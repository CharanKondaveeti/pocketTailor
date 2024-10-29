import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";

import AddOrder from "./pages/AddOrder";
import Profile from "./features/Profile";
import OrderPage from "./pages/OrderPage";
import ChooseCustomer from "./features/ChooseCustomer";
import AddClient from "./features/AddCustomer";
import Dashboard from "./features/Dashboard";
import MeasurementsInput from "./features/AddMesaurements";
import Experiments from "./Experiments";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loginregister from "./features/LoginRegister";
import Main from "./pages/Main";
import { createContext, useState } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
    },
  },
});

export const PostContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: "homepage",
        element: <Dashboard />,
      },
      {
        path: "addorder",
        element: <AddOrder />,
      },

      {
        path: "login",
        element: <Loginregister />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "addmeasurements",
        element: <MeasurementsInput />,
      },
      {
        path: "order",
        element: <OrderPage />,
      },
      {
        path: "choosecustomer",
        element: <ChooseCustomer />,
      },
      {
        path: "add-client",
        element: <AddClient />,
      },
      {
        path: "exp",
        element: <Experiments />,
      },
    ],
  },
]);

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [tailor, setTailor] = useState({});

  return (
    <QueryClientProvider client={queryClient}>
      <PostContext.Provider
        value={{ tailor, setTailor, selectedCustomer, setSelectedCustomer }}
      >
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </PostContext.Provider>
    </QueryClientProvider>
  );
}

export default App;

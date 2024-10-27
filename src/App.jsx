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
import ViewCustomers from "./features/ChooseCustomer";
import AddClient from "./features/AddCustomer";
import Dashboard from "./features/Dashboard";
import MeasurementsInput from "./features/AddMesaurements";
import Experiments from "./Experiments";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loginregister from "./features/LoginRegister";
import Main from "./pages/Main";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Navigate to="/homepage" />,
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
        element: <ViewCustomers />,
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
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

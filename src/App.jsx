import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";


import AddOrder from "./pages/AddOrder";
import Profile from "./features/Profile/Profile";
import OrderPage from "./features/OrderPage/OrderPage";
import ViewCustomers from "./features/ViewCustomers/ChooseCustomer";
import View from "./features/View/View";
import AddClient from "./features/AddClient/AddCustomer";
import Dashboard from "./features/Dashboard/Dashboard";
import MeasurementsInput from "./features/AddMesaurements";
import Experiments from "./Experiments";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loginregister from "./features/LoginRegister.css/LoginRegister";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/homepage" />,
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/addorder",
    element: <AddOrder />,
  },
  {
    path: "/login",
    element: <Loginregister />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/addmeasurements",
    element: <MeasurementsInput />,
  },
  {
    path: "/order",
    element: <OrderPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/choosecustomer",
    element: <ViewCustomers />,
  },
  {
    path: "/view",
    element: <View />,
  },
  {
    path: "/add-client",
    element: <AddClient />,
  },
  {
    path: "/exp",
    element: <Experiments />,
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

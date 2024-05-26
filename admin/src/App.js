import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, roomColumns, userColumns } from "./datatablesource";
import Login from "./pages/admin/login/Login";
import Register from "./pages/admin/register/register";
import Home from "./pages/admin/home/Home";
import { List } from "@mui/material";
import Single from "./pages/admin/single/Single";
import New from "./pages/admin/new/New";
import Users from "./pages/admin/users/users";
import NewHotel from "./pages/admin/newHotel/NewHotel";
import Hostels from "./pages/admin/hostels/hostels";
import NewRoom from "./pages/admin/newRoom/NewRoom";
import Rooms from "./pages/admin/rooms/rooms";
import ServiceProviderHome from "./pages/serviceProvider/home/home";
import Orders from "./pages/serviceProvider/orders/order";
import AdminOrders from "./pages/admin/order/order";
import Subscriptions from "./pages/admin/subscription/subscription";
import NewSubscription from "./pages/admin/newSubscription/newSubscription.jsx";
import UserSubscriptions from "./pages/admin/usersubscriptions/usersubscriptions.jsx";
import Subscription from "./pages/serviceProvider/subscription/subscription.jsx";
import ServiceProviderSubscriptions from "./pages/admin/serviceProviderSubscriptions/serviceProvidersubscriptions.jsx";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="hotels">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all"
                element={
                  <ProtectedRoute>
                    <Hostels />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="rooms">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewRoom />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all"
                element={
                  <ProtectedRoute>
                    <Rooms />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="subscriptions">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":productId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewSubscription />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all"
                element={
                  <ProtectedRoute>
                    <Subscriptions />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="orders">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all"
                element={
                  <ProtectedRoute>
                    <AdminOrders />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="userSubscriptions">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all"
                element={
                  <ProtectedRoute>
                    <UserSubscriptions />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="serviceProviderSubscriptions">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={roomColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="all"
                element={
                  <ProtectedRoute>
                    <ServiceProviderSubscriptions />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Route>
          <Route path="/serviceProvider">
            <Route index element={<ServiceProviderHome />} />
            <Route path="payment" element={<Orders />} />
            <Route path="subscriptions" element={<Subscription />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

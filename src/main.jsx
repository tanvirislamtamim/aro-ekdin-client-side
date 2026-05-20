import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from "./Components/Home/Home";
import PlayerDetails from "./Layout/PlayerDetails/PlayerDetails";

import About from "./Layout/About/About";
import Gallery from "./Layout/Gallery/Gallery";
import Players from "./Layout/Players/Players";
import ErrorPage from "./Layout/Error/ErrorPage";
import AuthLayout from "./Layout/AuthLayout/AuthLayout";
import Login from "./Layout/Login/Login";
import Register from "./Layout/Register/Register";
import AuthProvider from "./Context/AuthContext/AuthProvider";
import ForgotPassword from "./Layout/ForgotPassword/ForgotPassword";
import PrivateRoute from "./Routes/PrivateRoute";
import DashBoardLayout from "./Layout/Dashboard/DashboardLayout";
import MakeAdmin from "./Layout/Dashboard/MakeAdmin";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UpdatePlayer from "./Layout/Dashboard/UpdatePlayer";
import AddPlayer from "./Layout/Dashboard/AddPlayer";
import Rules from "./Layout/Dashboard/Rules";
import Photos from "./Layout/Dashboard/Photos";
import AdminRoute from "./Routes/AdminRoute";
import DeveloperRoute from "./Routes/DeveloperRoute";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "players",
        Component: Players,
        
      },

      {
        path: "players/:id",
        Component: PlayerDetails,
        
      },

      {
        path: "about",
        Component: About,
      },
      {
        path: "gallery",
        Component: Gallery,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        path: "rules",
        Component: Rules,
        
      },
      {
        path: "photos",
        element: <AdminRoute><Photos></Photos></AdminRoute>
      },
      {
        path: "makeAdmin",
        element: <DeveloperRoute><MakeAdmin></MakeAdmin></DeveloperRoute>
      },
      {
        path: "addPlayer",
        element: <AdminRoute><AddPlayer></AddPlayer></AdminRoute>
      },
      {
        path: "updatePlayer",
        element: <AdminRoute><UpdatePlayer></UpdatePlayer></AdminRoute>
      }
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "forgotPassword",
        Component: ForgotPassword,
      },
    ],
  },
]);
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);

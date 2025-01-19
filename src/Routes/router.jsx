import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home";
import Login from "../Pages/Authentication/Login";
import SignUp from "../Pages/Authentication/SignUp";
import Teach from "../Pages/Teach";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";

export  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path:'login',
            element: <Login></Login>
        },
        {
            path:'signup',
            element:<SignUp></SignUp>
        },
        {
          path: 'teach',
          element: <PrivateRoute> <Teach></Teach> </PrivateRoute>

        }
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          
        }
      ]
    }
  ]);  
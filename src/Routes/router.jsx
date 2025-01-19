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
import AllUsers from "../Pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import TeachApplications from "../Pages/Dashboard/TeacherRequest/TeachApplication";

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

        // ADMIN ROUTES
        {
          path: 'users',
          element:<AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: 'requests',
          element: <TeachApplications></TeachApplications>
        }
      ]
    }
  ]);  
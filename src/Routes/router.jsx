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
import Profile from "../Pages/Dashboard/Profile/Profile";
import AddClass from "../Pages/Dashboard/Teacher Dashboard/AddClass";
import AllClasses from "../Pages/Dashboard/AllClasses/AllClasses";
import AllApprovedClasses from "../Pages/AllApprovedClasses/AllApprovedClasses";
import MyClasses from "../Pages/Dashboard/Teacher Dashboard/MyClasses";
import UpdateClass from "../Pages/Dashboard/Teacher Dashboard/UpdateClass";
import ClassDetails from "../Pages/Dashboard/Teacher Dashboard/ClassDetails";
import ApprovedClassDetails from "../Pages/AllApprovedClasses/ApprovedClassDetails/ApprovedClassDetails";

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

        },
        {
          path: 'classes',
          element: <AllApprovedClasses></AllApprovedClasses>
        },
        {
          path: "classes/:id",
          element: <ApprovedClassDetails></ApprovedClassDetails>
        },
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
        },
        {
          path: 'profile',
          element: <Profile></Profile>
        },
        {
          path: 'allClasses',
          element: <AllClasses></AllClasses>
        },

        // Teacher Routes
        {
          path: 'add-class',
          element: <AddClass></AddClass>
        },
        {
          path:'my-classes',
          element: <MyClasses></MyClasses>
        },
        {
          path: 'my-class/:classId',
          element: <ClassDetails></ClassDetails>
        },
        {
          path:'update-class/:id',
          element: <UpdateClass></UpdateClass>
        },
      ]
    }
  ]);  
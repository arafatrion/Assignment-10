import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import MainLayout from "../Layouts/MainLayout";
import AddRecipe from "../pages/AddRecipe";
import MyRecipe from "../pages/MyRecipe";
import RecipeDetails from "../pages/RecipeDetails";
import ErrorPage from "../pages/ErrorPage";
import { Component } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";
import AuthLayout from "../Layouts/AuthLayout";
import PrivateRoute from "../Components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element:<MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>

      },
      {
        path: '/add-recipes',
        element: <PrivateRoute>
          <AddRecipe></AddRecipe>
        </PrivateRoute>
      },
      {
        path: '/my-recipes',
        element: <PrivateRoute>
          <MyRecipe></MyRecipe>
        </PrivateRoute>
      },
      {
        path: '/recipe-details/:id',
        element: <PrivateRoute>
          <RecipeDetails></RecipeDetails>
        </PrivateRoute>
      }
    ]
  },
  {
    path: '/auth',
    element:<AuthLayout></AuthLayout>,
      children: [
        {
          path: '/auth/login',
          element: <Login></Login>
        },
        {
          path: '/auth/register',
          element:<Register></Register>
        },
      ],
  }
])
export default router
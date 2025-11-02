import { createBrowserRouter } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import Home from "../../Pages/Home/Home";
import Products from "../../Pages/Products/Products";

createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element :<Home/>
      }, 
      {
        path:'/products', 
        element : <Products/>
      }

    ],
  },
]);

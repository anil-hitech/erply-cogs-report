import { createBrowserRouter } from "react-router-dom";
import { routes } from ".";
import Layout from "../layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: routes,
  },
]);

import Dashboard from "../pages/Dashboard";

export const routes = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/erply-cost-of-goods-report/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/*",
    element: <Dashboard />,
  },
];

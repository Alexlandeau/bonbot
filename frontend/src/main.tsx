import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import "./variables.css";
import "@fontsource/poppins";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import BonBotView from "./views/BonBot/BonBot";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/bonbot",
        element: <BonBotView />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

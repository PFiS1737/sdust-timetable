import React from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import "mdui/mdui.css"

import "./App.css"
import { App } from "./App"

import { Edit } from "./routers/edit"
import { RouteError } from "./routers/error"
import { Settings } from "./routers/settings"
import { Timetables } from "./routers/timetables"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        index: true,
        element: <Timetables />,
      },
      {
        path: "week",
        element: <Timetables />,
      },
      {
        path: "week/:week",
        element: <Timetables />,
      },
      {
        path: "edit/*",
        element: <Edit />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

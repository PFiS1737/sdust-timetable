import { Outlet } from "react-router-dom"

import { Navigation } from "./components/Navigation"

export function App() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Navigation />
    </>
  )
}

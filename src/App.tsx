import { useEffect } from "react"
import { Outlet, useLocation, useNavigate } from "react-router-dom"

import { snackbar } from "mdui"

import { Navigation } from "./components/Navigation"
import { settings } from "./libs/settings"

export function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    ;(async () => {
      const { username, password } = (await settings.getAll()) ?? {}
      if ((!username || !password) && location.pathname !== "/settings") {
        snackbar({
          message: "Can't find account, please login first.",
          placement: "top-end",
        })
        navigate("/settings#login")
      }
    })()
  })

  return (
    <>
      <main>
        <Outlet />
      </main>
      <Navigation />
    </>
  )
}

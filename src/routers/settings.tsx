import { useLocation } from "react-router-dom"

import "mdui/components/list.js"

import { Login } from "@/components/settings/Login"

export function Settings() {
  const location = useLocation()

  return (
    <mdui-list>
      <Login open={location.hash === "#login"} />
    </mdui-list>
  )
}

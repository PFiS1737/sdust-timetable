import { useLiveQuery } from "dexie-react-hooks"
import { type FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import "mdui/components/list-item"
import "mdui/components/text-field"

import type { TextField } from "mdui/components/text-field"
import { snackbar } from "mdui/functions/snackbar"

import { useDialog } from "@/hooks/useDialog"
import { api } from "@/libs/api/index"
import { settings } from "@/libs/settings/index"

export function Login() {
  const loggedInUser = useLiveQuery(() => settings.get("username")) as string

  const navigate = useNavigate()
  const location = useLocation()

  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { Dialog, setIsOpen, dialog } = useDialog({
    headline: loggedInUser ? "Change Account" : "Login",
    open: location.hash === "#login",
    loading,
    children: (
      <>
        <mdui-text-field
          name="username"
          autocomplete="username"
          label="Username"
          className="py-2"
          variant="outlined"
          onChange={({ currentTarget }: FormEvent<TextField>) =>
            setUsername(currentTarget.value)
          }
        />
        <mdui-text-field
          name="password"
          type="password"
          autocomplete="current-password"
          label="Password"
          className="py-2"
          variant="outlined"
          toggle-password
          onChange={({ currentTarget }: FormEvent<TextField>) =>
            setPassword(currentTarget.value)
          }
        />
      </>
    ),
    onOk: () => {
      if (!username || !password) {
        alert("Username or password is empty.")
        return
      }

      setLoading(true)

      api
        .login(username, password)
        .then((api) => api.getStudentInfo())
        .then((info) => {
          snackbar({
            placement: "top-end",
            message: `Logged in as ${info.name} (${info.id})`,
          })

          settings.set("username", username)
          settings.set("password", password)

          dialog.current?.addEventListener("closed", () => navigate("/"), {
            once: true,
          })

          setIsOpen(false)
        })
        .catch((error) => {
          snackbar({
            message: error.message,
          })
        })
        .finally(() => setLoading(false))
    },
  })

  return (
    <>
      <mdui-list-item
        icon="people"
        end-icon="login"
        onClick={() => setIsOpen(true)}
      >
        {loggedInUser ? (
          <>
            Logged in as: {loggedInUser}
            <span slot="description" className="text-gray-600">
              Click to change account
            </span>
          </>
        ) : (
          "Click to login"
        )}
      </mdui-list-item>

      {Dialog}
    </>
  )
}

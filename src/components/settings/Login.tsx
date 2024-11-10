import { useLiveQuery } from "dexie-react-hooks"
import { type FormEvent, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useNavigate } from "react-router-dom"

import "mdui/components/button.js"
import "mdui/components/dialog.js"
import "mdui/components/list-item.js"
import "mdui/components/text-field.js"

import type { Dialog } from "mdui/components/dialog.js"
import type { TextField } from "mdui/components/text-field.js"
import { snackbar } from "mdui/functions/snackbar.js"

import { api } from "@/libs/api/index"
import { settings } from "@/libs/settings/index"

export function Login({ open = false }: { open?: boolean } = {}) {
  const loggedInUser = useLiveQuery(() => settings.get("username")) as string

  const navigate = useNavigate()

  const dialog = useRef<Dialog>(null)

  const [isOpen, setIsOpen] = useState(open)
  const [loading, setLoading] = useState(false)

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    dialog.current?.addEventListener("close", () => setIsOpen(false))
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

      {createPortal(
        <mdui-dialog
          close-on-esc
          close-on-overlay-click
          open={isOpen}
          ref={dialog}
          className="[&::part(panel)]:w-1/2"
        >
          <span slot="headline">
            {loggedInUser ? "Change Account" : "Login"}
          </span>
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
          <mdui-button
            slot="action"
            variant="text"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </mdui-button>
          <mdui-button
            slot="action"
            variant="filled"
            loading={loading}
            onClick={() => {
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

                  dialog.current?.addEventListener(
                    "closed",
                    () => navigate("/"),
                    {
                      once: true,
                    }
                  )

                  setIsOpen(false)
                })
                .catch((error) => {
                  snackbar({
                    message: error.message,
                  })
                })
                .finally(() => setLoading(false))
            }}
          >
            Ok
          </mdui-button>
        </mdui-dialog>,
        document.body
      )}
    </>
  )
}

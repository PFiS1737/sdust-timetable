import { useState } from "react"

import { settings } from "@/libs/settings/index"
import { useLiveQuery } from "dexie-react-hooks"

export function SettingsListItemText(props: {
  title: string
  description?: string
  keyPath: keyof AllSettings
}) {
  const _value = useLiveQuery(() => settings.get(props.keyPath)) as string

  const [value, setValue] = useState<string>("")

  return (
    <>
      <p>{props.title}</p>
      {props.description && <p>{props.description}</p>}
      <input
        type="text"
        name={props.keyPath}
        placeholder={_value}
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
        onKeyUp={({ key }) => {
          if (key === "Enter" && value) {
            settings.set(props.keyPath, value)
          }
        }}
      />
    </>
  )
}

import { SettingsListItemText } from "./SettingsListItemText"

export function SettingsList() {
  return (
    <div className="w-full flex-shrink-0 bg-red-200">
      <p>Settings</p>
      <SettingsListItemText title="Username" keyPath="username" />
      <SettingsListItemText title="Password" keyPath="password" />
    </div>
  )
}

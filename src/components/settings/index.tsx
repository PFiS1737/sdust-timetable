import "mdui/components/button.js"
import "mdui/components/dialog.js"
import "mdui/components/list.js"
import "mdui/components/list-item.js"

import { Login } from "./Login"

export function SettingsList() {
  return (
    <>
      <div className="w-full flex-shrink-0">
        <mdui-list>
          <Login />
        </mdui-list>
      </div>
    </>
  )
}

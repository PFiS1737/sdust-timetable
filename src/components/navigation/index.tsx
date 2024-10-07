import type { SyntheticEvent } from "react"

import "mdui/components/navigation-bar"
import type { NavigationBar } from "mdui/components/navigation-bar"
import "mdui/components/navigation-bar-item"

const navigationBarItems = [
  {
    value: "timetable",
    icon: "calendar_month",
  },
  {
    value: "edit",
    icon: "edit",
  },
  {
    value: "settings",
    icon: "settings",
  },
]
const navigationValues = navigationBarItems.map((item) => item.value)

export function Navigation({
  defaultIndex,
  onChange,
}: {
  defaultIndex: number
  onChange: (index: number) => void
}) {
  // TODO: 响应式布局, 桌面端使用 NavigationRail
  return (
    <mdui-navigation-bar
      value={navigationValues[defaultIndex]}
      onChange={({ currentTarget }: SyntheticEvent<NavigationBar>) => {
        onChange(navigationValues.indexOf(currentTarget.value!))
      }}
    >
      {navigationBarItems.map((item) => (
        <mdui-navigation-bar-item
          key={item.value}
          value={item.value}
          icon={`${item.icon}--outlined`}
          active-icon={item.icon}
        >
          {item.value.replace(/^\w/, (c) => c.toUpperCase())}
        </mdui-navigation-bar-item>
      ))}
    </mdui-navigation-bar>
  )
}

import { useLocation, useNavigate } from "react-router-dom"

import "mdui/components/navigation-bar"
import "mdui/components/navigation-bar-item"

const navigationItems = [
  {
    id: "timetable",
    icon: "calendar_month",
    route: "/",
  },
  {
    id: "edit",
    icon: "edit",
    route: "/edit",
  },
  {
    id: "settings",
    icon: "settings",
    route: "/settings",
  },
]

export function Navigation() {
  const navigate = useNavigate()
  const location = useLocation()

  // TODO: 响应式布局, 桌面端使用 NavigationRail
  return (
    <mdui-navigation-bar
      value={navigationItems.find((e) => e.route === location.pathname)?.id}
    >
      {navigationItems.map((item) => (
        <mdui-navigation-bar-item
          key={item.id}
          value={item.id}
          icon={`${item.icon}--outlined`}
          active-icon={item.icon}
          onClick={() => navigate(item.route)}
        >
          {item.id.replace(/^\w/, (c) => c.toUpperCase())}
        </mdui-navigation-bar-item>
      ))}
    </mdui-navigation-bar>
  )
}

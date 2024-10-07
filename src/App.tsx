import { useEffect, useRef, useState } from "react"

import { Navigation } from "./components/navigation"
import { SettingsList } from "./components/settings"
import { Timetable } from "./components/timetable"

export default function App() {
  const [navigationBarIndex, setNavigationBarIndex] = useState(0)

  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // FIXME: 或许有更好的方法?
    const updateAppHeight = () => {
      if (mainRef.current) {
        // mainRef.current.style.height = `${window}.innerHeight - 80px`
      }
    }
    updateAppHeight()

    window.addEventListener("resize", updateAppHeight)

    return () => {
      window.removeEventListener("resize", updateAppHeight)
    }
  }, [])

  return (
    <>
      <div className="relative overflow-x-hidden">
        <div
          ref={mainRef}
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${navigationBarIndex * 100}%)`,
          }}
        >
          <Timetable />
          <div className="w-full flex-shrink-0 bg-green-200">Test</div>
          <SettingsList />
        </div>
      </div>
      <Navigation
        defaultIndex={navigationBarIndex}
        onChange={(index) => setNavigationBarIndex(index)}
      />
    </>
  )
}

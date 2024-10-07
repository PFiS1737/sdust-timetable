import { useLiveQuery } from "dexie-react-hooks"
import { useEffect, useState } from "react"

import "mdui/components/card"

import { Api } from "@/libs/api/Api.class"
import type { ClassesOfWeek } from "@/libs/api/ClassesOfWeek.class"
import { CLASS_PERIODS, WEEKDAYS } from "@/libs/config"
import { settings } from "@/libs/settings/index"

export function Timetable() {
  const [classes, setClasses] = useState<ClassesOfWeek>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const { username, password } = useLiveQuery(() => settings.getAll()) ?? {}

  useEffect(() => {
    const getClassInfo = async () => {
      try {
        const api = await new Api().tryLogin(username, password)

        const info = api && (await api.getClassesInfoOfWeek())

        setClasses(info)
      } catch (error) {
        setError(error as Error)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getClassInfo()
  }, [username, password])

  return (
    <div className="w-full flex-shrink-0">
      {loading ? (
        // TODO: add styles
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="space-y-4 bg-gray-800 p-2">
          <div className="grid grid-cols-8 gap-2">
            <mdui-card className="col-span-1 grid py-2 text-center">
              第 {classes?.weekInfo.weekNumber} 周
            </mdui-card>
            {WEEKDAYS.map((day, index) => (
              <mdui-card
                key={index}
                className="col-span-1 grid py-2 text-center"
              >
                {day}
              </mdui-card>
            ))}
          </div>

          {CLASS_PERIODS.map((part, partIndex) => {
            return (
              <div key={partIndex} className="grid grid-cols-8 gap-2">
                <div className="col-span-1 grid gap-2">
                  {part.map((period, periodIndex) => (
                    <mdui-card key={periodIndex} className="py-4 text-center">
                      {`第${"一二三四五六七八九十"[periodIndex]}节`}
                      <br />
                      <span className="text-xs">{period}</span>
                    </mdui-card>
                  ))}
                </div>
                {WEEKDAYS.map((_, weekdayIndex) => (
                  <div
                    key={weekdayIndex}
                    // HACK: 对可能用到的类进行导入, 因为 tailwindcss 无法识别动态类名
                    //       grid-rows-2 grid-rows-4
                    className={`col-span-1 grid grid-rows-${part.length} gap-2`}
                  >
                    {new Array(part.length / 2).fill(0).map((_, index) => {
                      const classPeriodIndex = partIndex * 2 + index
                      const classInfo =
                        classes?.flatToDays()[weekdayIndex][classPeriodIndex]

                      return (
                        <mdui-card
                          key={index}
                          className="row-span-2 p-4 text-center"
                        >
                          {classInfo?.toReactNode() ?? ""}
                        </mdui-card>
                      )
                    })}
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

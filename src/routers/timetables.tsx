import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/scss"

import { api } from "@/libs/api/index"

import { Table } from "@/components/timetable/Table"

export function Timetables() {
  const navigate = useNavigate()
  const { week } = useParams()
  const weekNumber = week ? Number.parseInt(week) : undefined

  // const [currentWeek, setCurrentWeek] = useState(weekNumber)
  //
  // useEffect(() => {
  //   setCurrentWeek(weekNumber)
  // }, [weekNumber])

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    ;(async () => {
      if (!weekNumber) {
        if (await api.hasAnyCachedWeekInfo()) {
          navigate(`/week/${(await api.getCurrentWeekInfo()).weekNumber}`)
          return
        }

        await api.tryLogin()
        navigate(`/week/${(await api.getCurrentWeekInfo()).weekNumber}`)
      }
    })()
  }, [weekNumber, navigate])

  return (
    weekNumber && (
      <Swiper
        initialSlide={weekNumber - 1}
        onSlideChangeTransitionEnd={(swiper) => {
          const _activeIndex = swiper.activeIndex

          const weekNumber = (
            swiper.slides[_activeIndex]?.children?.[0] as HTMLElement
          )?.dataset?.weekNumber

          if (weekNumber) {
            navigate(`/week/${weekNumber}`)
            setActiveIndex(_activeIndex)
          }
        }}
      >
        {new Array(20)
          .fill(0)
          .map((_, i) => i + 1)
          .map((e) => (
            <SwiperSlide key={e}>
              <Table weekNumber={e} isActive={activeIndex + 1 === e} />
            </SwiperSlide>
          ))}
      </Swiper>
    )
  )
}

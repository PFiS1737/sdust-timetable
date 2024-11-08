import { ClassPeriod } from "./ClassPeriod.class"
import { ClassroomInfo } from "./ClassroomInfo.class"

export interface IClassInfo {
  /** 课程名称 */
  name: string
  /** 教师姓名 */
  teacher: string
  /** 上课教室 */
  room: ClassroomInfo
  /** 上课周次 */
  weeks: number[]
  /** 上课时间 */
  periodInfo: ClassPeriod
}

export interface IClassInfoStorable {
  name: string
  teacher: string
  room: string
  weeks: number[]
  period: string
}

export class ClassInfo implements IClassInfo {
  name: string
  teacher: string
  room: ClassroomInfo
  weeks: number[]
  periodInfo: ClassPeriod

  static from(info: IClassInfoStorable) {
    return new ClassInfo({
      kcmc: info.name,
      jsxm: info.teacher,
      jsmc: info.room,
      kkzc: info.weeks.join(","),
      kcsj: info.period,
    })
  }

  constructor(info: ClassInfoRaw) {
    this.name = info.kcmc
    this.teacher = info.jsxm
    this.room = new ClassroomInfo(info.jsmc)

    this.weeks = info.kkzc.split(",").flatMap((week) => {
      if (!week.includes("-")) return [Number.parseInt(week)]

      const [start, end] = week.split("-")
      return Array.from(
        { length: Number.parseInt(end) - Number.parseInt(start) + 1 },
        (_, i) => i + Number.parseInt(start)
      )
    })

    this.periodInfo = new ClassPeriod(info.kcsj)
  }

  toStorable(): IClassInfoStorable {
    return {
      name: this.name,
      teacher: this.teacher,
      room: this.room.fullname,
      weeks: this.weeks,
      period: this.periodInfo.toRaw(),
    }
  }

  toReactNode() {
    return (
      <>
        {this.name}
        <br />
        {this.teacher}
        <br />
        {this.room.toRaw()}
      </>
    )
  }
}

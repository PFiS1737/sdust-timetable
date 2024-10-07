import { ClassInfo, type IClassInfoStorable } from "./ClassInfo.class"
import { type IWeekInfo, WeekInfo } from "./WeekInfo.class"

export interface IClassesOfWeekStorable {
  weekInfo: IWeekInfo
  classes: IClassInfoStorable[]
}

export class ClassesOfWeek {
  weekInfo: WeekInfo
  classes: ClassInfo[]

  static from(storage: IClassesOfWeekStorable) {
    return new ClassesOfWeek(
      WeekInfo.from(storage.weekInfo),
      storage.classes.map((classInfo) => ClassInfo.from(classInfo))
    )
  }

  constructor(weekInfo: WeekInfo, classes: ClassInfo[]) {
    this.weekInfo = weekInfo
    this.classes = classes
  }

  toStorable() {
    return {
      weekInfo: this.weekInfo.toStorable(),
      classes: this.classes.map((classInfo) => classInfo.toStorable()),
    }
  }

  flatToDays() {
    const days: Array<Array<ClassInfo | null>> = new Array(7)
      .fill(null)
      .map(() => new Array(5).fill(null))

    for (const classInfo of this.classes) {
      const weekdayIndex = classInfo.periodInfo.weekday - 1
      const periodIndex = classInfo.periodInfo.period - 1

      days[weekdayIndex][periodIndex] = classInfo
    }

    return days
  }
}

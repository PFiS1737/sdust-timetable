import Dexie, { type Table } from "dexie"

import { calculaterSemesterInfo } from "./Api.class"
import {
  ClassesOfWeek,
  type IClassesOfWeekStorable,
} from "./ClassesOfWeek.class"
import { type IWeekInfo, WeekInfo } from "./WeekInfo.class"

let DB: ApiCacheDatabase

export class ApiCache {
  private db: ApiCacheDatabase

  constructor() {
    this.db = DB ?? new ApiCacheDatabase()
  }

  async setWeekInfo(data: WeekInfo) {
    await this.db.weeks.put(data.toStorable())
  }
  async setClassesOfWeek(data: ClassesOfWeek) {
    await this.db.classes.put(data.toStorable())
  }

  async getClassesInfoOfWeek(weekInfo: WeekInfo) {
    const classesInfo = await this.db.classes.get(weekInfo.weekNumber)

    if (classesInfo) return ClassesOfWeek.from(classesInfo)
  }
  async getCurrentWeekInfo() {
    const weekInfo = (await this.db.weeks.toArray())[0]

    if (weekInfo)
      return calculaterSemesterInfo(WeekInfo.from(weekInfo)).getCurrentWeek()
  }
}

class ApiCacheDatabase extends Dexie {
  weeks!: Table<IWeekInfo, number>
  classes!: Table<IClassesOfWeekStorable, number>

  constructor() {
    super("ApiCache")

    this.version(1).stores({
      weeks: "weekNumber",
      classes: "weekInfo.weekNumber",
    })

    DB = this
  }
}

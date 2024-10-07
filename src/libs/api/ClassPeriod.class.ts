export class ClassPeriod {
  /** 该课程排在星期几 */
  weekday: number
  /** 该课程排在第几节 (以大节记) */
  period: number

  /**
   * @param periodStr - 表示节数的字符串, 格式见 [ClassInfoRaw.kcsj]
   */
  constructor(periodStr: string) {
    const [weekday, period] = periodStr
      .match(/^(.)..(..)$/)!
      .slice(1)
      .map((n) => Number.parseInt(n)) as [number, number]

    this.weekday = weekday
    this.period = period / 2
  }

  toRaw() {
    return `${this.weekday}${String(this.period * 2 - 1).padStart(2, "0")}${String(this.period * 2).padStart(2, "0")}`
  }
}

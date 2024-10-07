interface IStudentInfo {
  /** 姓名 */
  name: string
  /** 学号 */
  id: number
  /** 班级 */
  class: string
}

export class StudentInfo implements IStudentInfo {
  name: string
  id: number
  class: string

  constructor(info: StudentInfoRaw) {
    this.name = info.xm
    this.id = Number.parseInt(info.xh)
    this.class = info.bj
  }
}

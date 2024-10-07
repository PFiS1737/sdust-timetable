export class ClassroomInfo {
  /** 教室全称 */
  fullname: string
  /** 教学楼号 */
  building?: string
  /** 房间号 */
  room?: string

  constructor(name: string) {
    this.fullname = name

    if (name.includes("-")) {
      const [building, room] = name.split("-")
      this.building = building
      this.room = room.replace("室", "")
    }
  }

  toRaw() {
    return this.fullname
  }
}

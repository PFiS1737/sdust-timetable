import axios from "axios"
import { format } from "date-fns"

import { ClassInfo } from "./ClassInfo.class"
import { ClassesOfWeek } from "./ClassesOfWeek.class"
import { StudentInfo } from "./StudentInfo.class"
import { WeekInfo } from "./WeekInfo.class"

/**
 * 教务系统 API 接口
 *
 * @see https://github.com/WindRunnerMax/SHST
 */
export class Api {
  private url: string

  private username?: string

  private _token?: string
  set token(token: string) {
    this._token = token
  }
  get token() {
    if (!this._token) {
      throw new Error("Token not found, please login first.")
    }

    return this._token
  }

  constructor(url?: string) {
    // NOTE: 使用 Serverless 代理的 API, 因为大部分学校的教务系统都没开 CORS
    //
    // @see /api/index.js
    this.url = url?.replace(/\/$/, "") ?? "/api"
  }

  private async get(params: {
    method: string
    [key: string]: string
  }) {
    return (
      await axios.get(this.url, {
        headers: {
          token: this.username && this.token,
        },
        params,
      })
    ).data
  }

  /**
   * @param username - 用户名 (学号)
   * @param password - 密码
   */
  async login(username: string, password: string) {
    if (this._token) return this

    const res = (await this.get({
      method: "authUser",
      xh: username, // 学号
      pwd: password, // 密码
    })) as LoginResponseRaw

    if (res.flag === "1") {
      this.token = res.token
      this.username = username
    } else {
      throw new Error(`Failed to login: ${res.msg}`)
    }

    return this
  }

  async getStudentInfo() {
    const info = (await this.get({
      method: "getUserInfo",
      xh: this.username!, // 学号
    })) as StudentInfoRaw

    return new StudentInfo(info)
  }

  async getCurrentWeekInfo() {
    const info = new WeekInfo(
      (await this.get({
        method: "getCurrentTime",
        currDate: format(new Date(), "yyyy-MM-dd"),
      })) as WeekInfoRaw
    )

    return info
  }

  async getClassesInfoOfWeek(weekInfo: WeekInfo) {
    const res = (await this.get({
      method: "getKbcxAzc",
      xh: this.username!, // 学号
      xnxqid: weekInfo.semester, // 学年学期 ID
      zc: `${weekInfo.weekNumber}`, // 周次
    })) as ClassInfoRaw[]

    const classes = res
      .map((item) => {
        if (item) return new ClassInfo(item)
      })
      .filter((e) => e !== undefined)

    return new ClassesOfWeek(weekInfo, classes as ClassInfo[])
  }
}

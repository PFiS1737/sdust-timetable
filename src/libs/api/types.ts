type LoginResponseRaw = {
  msg: string
  /**
   * "0": 失败
   * "1": 成功
   */
  flag: string
  /**
   * "-1": 失败
   * other: 成功
   */
  token: string

  // userrealname: string
  // userdwmc: string // 不清楚, 我的是我专业院系名称 (单位名称?)
  // usertype: string  // 不知道怎么分的, 我是 "2"
}

type StudentInfoRaw = {
  /** 姓名 */
  xm: string
  /** 学号 */
  xh: string
  /** 班级 */
  bj: string
  /** 院系名称 */
  // yxmc: string
  /** 电话号码 */
  // dh: string | null
  /** 邮箱 */
  // email: string | null
  /** QQ 账号 */
  // qq: string | null
  /** 性别 */
  // xb: string
  /** 考生号 */
  // ksh: string
  /** 年级 */
  // nj: string
  /** 专业名称 */
  // zymc: string
  /** 入学年份 */
  // rxnf: string

  // dqszj: string // 不清楚, 我是 "2024" (当前所在级?)
  // fxzy: string // 不清楚, 我是 "无" (辅修专业?)
  // usertype: string  // 不知道怎么分的, 我是 "2"
  // xz: number // 不清楚, 我是 4
}

type WeekInfoRaw = {
  /** 当前周次 */
  zc: number
  /** 当前周次的开始日期 */
  s_time: string
  /** 当前周次的结束日期 */
  e_time: string
  /** 学年学期号 */
  xnxqh: string
}

type ClassInfoRaw = {
  /** 课程名称 */
  kcmc: string
  /** 教师姓名 */
  jsxm: string
  /** 教室名称 */
  jsmc: string
  /** 开课周次 */
  kkzc: string
  /**
   * 课程时间
   *
   * 为 5 位数字, 第一位非零
   *
   * 1. 第 1 位: 星期几 (1-7)
   * 2. 第 2 - 3 位: 第一节课 (以小节记, 一条共 10 节, 下同)
   * 3. 第 4 - 5 位: 最二节课
   *
   * 例:
   * - "10304" 表示周一第 3 4 节 (上午第二大节)
   * - "20910" 表示周二第 9 10 节 (晚上)
   */
  kcsj: string
  /** 开始时间 */
  // kssj: string
  /** 结束时间 */
  // jssj: string

  // sjbz: string // 不清楚, 全是 "0"
}

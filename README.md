# SDUST TimeTable

## Status

> 缓慢开发中...

~咱学校的教务系统 API 没开 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)，导致这个项目根本没法用，虽然可以靠[浏览器插件](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)解决，但这也不是个办法，而且手机也没法用浏览器插件。~

尝试使用 Serverless Function 代理请求，发现确实可以，于是决定重启这个项目。

虽然学业繁忙，但是我会尽量抽时间开发的。

## Features

> 按照优先级排序

- [x] 新建文件夹
- [x] 一个能看的 UI
- [x] 从教务系统导入课表, 支持缓存
- [ ] 优化运行逻辑
  - [x] 若没有登录信息也没有缓存, 则提示用户登录
  - [ ] 支持切换显示的周次
  - [ ] 总是自动同步教务系统课表 OR 手动同步
  - [ ] 若课表已配置完成, 进入网站后先显示一个当天课程概括, 再选择查看详细课表
- [ ] 豪看的 UI 设计
  - [ ] Material You 风格
  - [ ] 课程颜色填充
- [ ] 基于 PWA 的网页应用, 支持离线使用
- [ ] 支持手动添加课程, 快捷编辑 (临时调课等)
- [ ] 快速填充课程 (如晚自习等),  快速调课 (按课程或按天)
- [ ] 基于 OCR 的 PU 日程导入
- [ ] 基于 Worker Service 的后台任务, 消息推送等
- [ ] PC 端
  - [ ] 响应式布局
- [ ] 支持作业管理

## ChangeLog

自己看 commit 记录吧 (逃

# SDUST TimeTable

## Status

> 消极开发中...

咱学校的教务系统 API 没开 [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)，导致这个项目根本没法用，虽然可以靠[浏览器插件](https://chromewebstore.google.com/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)解决，但这也不是个办法，而且手机也没法用浏览器插件。

一个备选方案是直接开发 APP，但问题是，我只会写 Android 软件，但我目前的主力机是 iPhone，虽然可以学，但写 iPhone 软件需要 Mac，而我又没有，所以这个方案也不行。

虽然我对这个项目的定位是一个练手的项目，作为我的第一个 React 项目用来熟悉技术栈和踩坑的，但我不想做一个没法用的东西，所以我决定暂时搁置这个项目，等我有时间和精力再来继续。

## Features

> 按照优先级排序

- [x] 新建文件夹
- [x] 一个能看的 UI
- [x] 从教务系统导入课表, 支持缓存
- [ ] 优化运行逻辑
  - [ ] 若没有登录信息也没有缓存, 则提示用户登录
  - [ ] 支持切换显示的周次
  - [ ] 总是自动同步教务系统课表 OR 手动同步
  - [ ] 若课表已配置完成, 进入网站后先显示一个当天课程概括, 再选择查看详细课表
- [ ] 豪看的 UI 设计
  - [ ] Material You 风格
  - [ ] 响应式布局
  - [ ] 课程颜色填充
- [ ] 基于 PWA 的网页应用, 支持离线使用
- [ ] 支持手动添加课程, 快捷编辑 (临时调课等)
- [ ] 快速填充课程 (如晚自习等),  快速调课 (按课程或按天)
- [ ] 基于 OCR 的 PU 日程导入
- [ ] 基于 Worker Service 的后台任务, 消息推送等
- [ ] 支持作业管理

## ChangeLog

自己看 commit 记录吧 (逃

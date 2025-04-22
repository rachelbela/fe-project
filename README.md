# 技术栈

- 包管理器：pnpm
- 构建工具：Vite
- 框架：React、TS
- 样式：TailwindCSS
- UI 库：Shadcn/ui
- icon: Iconify
- 状态管理：zustand
- 路由： react-router
- 请求库: axios
- 请求状态管理： @tanstack/react-query

# 文件目录结构

- public
  - main.wasm  加密模块
  - mockServiceWorker.js 用于前端模拟数据，拦截请求并代理
- src  项目主目录
   - _mock      mock数据
   - api        axios请求、请求响应公共拦截器
   - assets     图片/图标等静态资源
   - components 组件
       - ui     小组件，如button等
       - ...    业务相关的公用组件
   - hooks      公共hooks
   - layout     布局组件
   - lib        常用函数和方法
   - locales    多语言文件
   - pages      存放路由对应的页面
   - router     路由相关的DATA
   - store      全局数据及获取方法
   - types      ts类型


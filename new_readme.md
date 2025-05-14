# 🔖 前端书签 | Web Bookmark

一个美观实用的前端资源收藏工具，帮助开发者整理、分类和快速访问常用的开发资源。基于Vue3+Vite+Pinia+Tailwind CSS开发。

## ✨ 特性

- 🚀 **高效收藏**：一键保存和整理您的开发资源
- 📂 **分类管理**：多维度分类系统，快速定位所需资源
- 🔍 **智能搜索**：支持标题、URL、标签等多种搜索方式
- 📱 **响应式设计**：完美适配各种设备屏幕
- 🌙 **暗黑模式**：护眼模式，提供舒适的浏览体验
- ⚡ **极速体验**：基于Vite构建，加载迅速
- 💾 **本地存储**：使用浏览器本地存储，无需担心数据隐私

## 🛠️ 技术栈

- **前端框架**：Vue3
- **状态管理**：Pinia
- **打包工具**：Vite
- **CSS处理**：Tailwind CSS + Sass
- **代码规范**：ESLint + Prettier
- **HTTP请求**：Axios

## 📚 相关文档

- Vue3：https://cn.vuejs.org/
- Ant Design：https://antdv.com/components/overview-cn
- 代码规范：https://standardjs.com/rules-zhcn
- Eslint规则：https://zh-hans.eslint.org/docs/latest/rules
- Prettier规则：https://www.prettier.cn/docs/options.html

## 🔧 环境要求

* Node: 16.0 或更高版本

## 📋 目录结构

* src
  * api   接口
  * assets 静态资源
    * styles 样式
      * variables.scss 全局变量
      * main.scss 公共样式
      * normalize.scss 样式重置
    * images 图片
  * components  组件
  * hooks 自定义Hook
  * router  路由
  * store  pinia状态管理
  * views 页面视图
  * App.vue 根组件
  * main.js   程序入口
* .eslintrc.cjs  ESlint规则配置
* .gitignore   git文件包含规则
* .prettierrc.json Prettier规则配置
* index.html
* vite.config.js        vite配置

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发环境运行

```bash
npm run dev
```

### 生产环境构建

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

### 代码检查与修复

```bash
# ESLint检查并自动修复
npm run lint

# Prettier格式化
npm run format
```

## 🔌 VSCode推荐插件

为获得最佳开发体验，推荐安装以下VSCode插件：

- **ESLint**：代码格式和代码质量校验
- **Prettier - Code formatter**：代码格式化
- **Prettier ESLint**：解决ESLint和Prettier冲突问题
- **Volar**：Vue 3的官方IDE支持
- **Tailwind CSS IntelliSense**：Tailwind CSS智能提示

## 🤝 贡献指南

1. Fork 本仓库
2. 创建您的特性分支：`git checkout -b feature/AmazingFeature`
3. 提交您的更改：`git commit -m \"Add some AmazingFeature\"`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 开启一个Pull Request

## 📝 开源协议

本项目遵循 MIT 许可证开源。

## 📮 联系方式

- 作者：安耀奇
- 博客：[www.anyaoqi.com](https://www.anyaoqi.com)
- Email：anyaoqi@126.com

---

如果您觉得这个项目对您有帮助，请给它一个⭐️！

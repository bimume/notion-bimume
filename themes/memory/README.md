# NotionNext Theme: Memory

> 基于 [hexo-theme-memory](https://github.com/artchen/hexo-theme-memory) by Art Chen 的 NotionNext 主题移植

一个极简、优雅的 NotionNext 主题，复刻了 Memory 主题的核心视觉特征：单栏白卡片流、悬挂黑块 Logo、右侧抽屉侧边栏、`#` 号绿色标题前缀、Orange/Teal 双主色暗色互换。

---

## 安装

### 方式一：直接复制

将整个 `memory` 文件夹复制到你的 NotionNext 项目的 `themes/` 目录下：

```bash
cp -r themes/memory /path/to/your/NotionNext/themes/
```

### 方式二：Git Clone

```bash
cd /path/to/your/NotionNext/themes
git clone https://github.com/your-repo/notionnext-theme-memory.git memory
```

## 启用主题

在 `blog.config.js` 中修改：

```js
const BLOG = {
  THEME: 'memory',
  // ... 其他配置
}
```

或通过环境变量：

```bash
NEXT_PUBLIC_THEME=memory
```

NotionNext 会自动扫描 `themes/` 目录，切换后即时生效。

---

## 设计特征

本主题忠实复刻了 hexo-theme-memory 的以下招牌特征：

| 特征 | 说明 |
|------|------|
| **单栏居中布局** | 主内容最大宽度 820px，白卡片垂直堆叠 |
| **悬挂黑块 Logo** | 导航栏顶部居中黑色方块（160×82px），含站点标题与描述 |
| **右侧抽屉侧边栏** | 280px 宽，默认隐藏，点击汉堡按钮滑入，主内容同步左移 |
| **`#` 号绿色标题前缀** | 正文所有标题前自动添加绿色 `#` 号 |
| **Orange/Teal 双主色** | 亮色：橙(#ff9800)主色 + 青(#009688)强调；暗色：青主色 + 橙强调（**互换**） |
| **绿色引用左边框** | `border-left: 4px solid #4caf50` |
| **顶部加载条** | 2px 高，品牌色，路由切换时进度动画 |
| **标签 `#` 前缀** | 标签前自带 `#` 号，hover 变品牌色 |
| **极简分页** | 仅 Prev / Next，无页码 |
| **卡片轻阴影** | `box-shadow: 0 0 3px rgba(0,0,0,0.15)` |

---

## 配置项

所有配置在 `config.js` 中，可被 Notion 配置表覆盖（优先级：Notion 配置表 > 主题 config.js > blog.config.js）。

### 配色

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `MEMORY_COLOR_BG` | `#EBECEE` | 页面背景（亮色） |
| `MEMORY_COLOR_TEXT` | `#414141` | 正文文字（亮色） |
| `MEMORY_COLOR_BRAND` | `#ff9800` | 品牌主色（橙） |
| `MEMORY_COLOR_ACCENT` | `#009688` | 强调色（青） |
| `MEMORY_COLOR_GREY` | `#828282` | 次要文字 |
| `MEMORY_COLOR_GREEN` | `#4caf50` | 标题前缀、引用边框 |
| `MEMORY_COLOR_BG_DARK` | `#0e141d` | 页面背景（暗色） |
| `MEMORY_COLOR_TEXT_DARK` | `#c9d1d9` | 正文文字（暗色） |
| `MEMORY_COLOR_BRAND_DARK` | `#009688` | 品牌主色（暗色，与亮色互换） |
| `MEMORY_COLOR_ACCENT_DARK` | `#ff9800` | 强调色（暗色，与亮色互换） |
| `MEMORY_COLOR_CARD_DARK` | `#15202b` | 卡片背景（暗色） |

### 布局

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `MEMORY_CONTENT_WIDTH` | `820px` | 主内容最大宽度 |
| `MEMORY_SIDEBAR_WIDTH` | `280px` | 侧边栏宽度 |

### 开关

| 配置项 | 默认值 | 说明 |
|--------|--------|------|
| `MEMORY_POST_LIST_COVER` | `true` | 列表卡片显示封面图 |
| `MEMORY_POST_LIST_SUMMARY` | `true` | 列表卡片显示摘要 |
| `MEMORY_POST_LIST_COVER_FORCE` | `false` | 无封面时用站点封面兜底 |
| `MEMORY_SIDEBAR_ENABLED` | `true` | 侧边栏开关 |
| `MEMORY_MENU_CATEGORY` | `true` | 侧边栏显示分类 |
| `MEMORY_MENU_TAG` | `true` | 侧边栏显示标签 |
| `MEMORY_MENU_ARCHIVE` | `true` | 侧边栏显示归档 |
| `MEMORY_SIDEBAR_TOC` | `true` | 侧边栏显示文章目录 |
| `MEMORY_LOADING_BAR` | `true` | 顶部加载条 |
| `MEMORY_LOGO_TEXT` | `''` | Logo 文字（留空用站点标题） |
| `MEMORY_SITE_DESC` | `''` | Logo 下方描述（留空用站点描述） |

---

## 文件结构

```
themes/memory/
├── index.js                  # 主题入口，导出 9 个 Layout 函数
├── config.js                 # 主题配置
├── style.js                  # 全局样式（styled-jsx，复刻 SCSS 设计系统）
└── components/
    ├── Header.js             # 顶部导航 + 悬挂黑块 Logo + 汉堡按钮
    ├── Sidebar.js            # 右侧抽屉侧边栏（Bio/菜单/分类/标签/TOC/暗色切换）
    ├── Footer.js             # 底部（搜索 + 社交 + 版权）
    ├── LoadingBar.js         # 顶部 2px 加载进度条
    ├── BlogCard.js           # 文章列表卡片
    ├── BlogListPage.js       # 分页文章列表
    ├── BlogListScroll.js     # 滚动加载文章列表（兼容 POST_LIST_STYLE）
    ├── Pagination.js         # Prev/Next 分页器
    ├── TagItem.js            # 标签项（# 前缀）
    ├── ArchiveItem.js        # 归档项（按年分组）
    ├── ArticleDetail.js      # 文章详情（NotionPage 渲染）
    ├── ArticleLock.js        # 加密文章密码锁
    └── ArticleAround.js      # 上下篇导航
```

---

## 与原 hexo-theme-memory 的差异

由于 Hexo 和 NotionNext 的技术栈不同，部分实现方式有调整：

| 方面 | 原版 (Hexo) | 本主题 (NotionNext) |
|------|-------------|---------------------|
| 模板引擎 | EJS | React (Next.js) |
| 样式 | SCSS | styled-jsx + CSS 变量 |
| 暗色模式 | `prefers-color-scheme` 媒体查询 | NotionNext 的 `class` 模式（`html.dark`）+ 手动切换 |
| 正文渲染 | Markdown → HTML | Notion API → react-notion-x |
| 图标 | icomoon 自定义字体 | Font Awesome（NotionNext 内置） |
| 搜索 | universal-search (Google/Algolia/Azure) | NotionNext 内置搜索 + AlgoliaSearchModal |
| jQuery | 依赖 jQuery 2.1.4 | 纯 React，无 jQuery |
| 加载动画 | jQuery 驱动的 loading-bar | React state + CSS transition |
| 社交链接 | `_config.yml` 的 `social` 数组 | NotionNext 的 `CONTACT_*` 配置 |
| 侧边栏触发 | jQuery toggle `body.menu-open` | React state 管理 |
| 评论 | Disqus / 多说 | NotionNext 的 Comment 组件（支持多种） |

### 保留的核心视觉

- ✅ 820px 单栏白卡片流
- ✅ 悬挂黑块 Logo
- ✅ 右侧 280px 抽屉侧边栏
- ✅ `#` 号绿色标题前缀
- ✅ Orange/Teal 双主色暗色互换
- ✅ 绿色引用左边框
- ✅ 顶部加载条
- ✅ 标签 `#` 前缀
- ✅ 极简 Prev/Next 分页

---

## 依赖

本主题依赖 NotionNext 内置的以下组件和模块：

- `@/components/NotionPage` — Notion 文章渲染
- `@/components/Comment` — 评论系统
- `@/components/ShareBar` — 分享栏
- `@/components/SmartLink` — SPA 链接
- `@/components/LazyImage` — 懒加载图片
- `@/components/NotionIcon` — Notion 图标
- `@/components/DarkModeButton` — 暗色模式切换
- `@/components/Mark` — 搜索结果高亮
- `@/lib/config` — `siteConfig` 配置读取
- `@/lib/global` — `useGlobal` 全局状态
- `@/lib/themeConsoleStyle` — CSS 变量生成
- `@headlessui/react` — Transition 动画

无需额外安装任何依赖。

---

## 致谢

- 原始设计：[Art Chen](https://github.com/artchen) — [hexo-theme-memory](https://github.com/artchen/hexo-theme-memory)
- 主题框架：[NotionNext](https://github.com/tangly1024/NotionNext) by tangly1024

> 请保留底部 "Theme Memory designed by Art Chen" 的作者信息链接。

---

## License

遵循原 hexo-theme-memory 的许可。

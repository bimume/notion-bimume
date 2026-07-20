/* eslint-disable react/no-unknown-property */
import CONFIG from './config'
import { themeConsoleStyle } from '@/lib/themeConsoleStyle'

/**
 * Memory 主题全局样式
 * 复刻 hexo-theme-memory 的 SCSS 设计系统
 * 注意：此处不支持 tailwindCSS 的 @apply 语法，只写原始 CSS
 */
const Style = () => {
  return (
    <style jsx global>{`
      /* ========== 主题 CSS 变量（亮色）========== */
      #theme-memory {
        --memory-bg: ${CONFIG.MEMORY_COLOR_BG};
        --memory-text: ${CONFIG.MEMORY_COLOR_TEXT};
        --memory-brand: ${CONFIG.MEMORY_COLOR_BRAND};
        --memory-accent: ${CONFIG.MEMORY_COLOR_ACCENT};
        --memory-grey: ${CONFIG.MEMORY_COLOR_GREY};
        --memory-black: ${CONFIG.MEMORY_COLOR_BLACK};
        --memory-white: ${CONFIG.MEMORY_COLOR_WHITE};
        --memory-green: ${CONFIG.MEMORY_COLOR_GREEN};
        --memory-card-bg: ${CONFIG.MEMORY_COLOR_WHITE};
        --memory-content-width: ${CONFIG.MEMORY_CONTENT_WIDTH};
        --memory-sidebar-width: ${CONFIG.MEMORY_SIDEBAR_WIDTH};
        --memory-shadow: 0 1px 4px rgba(0, 0, 0, 0.15);
      }

      /* ========== 主题 CSS 变量（暗色）========== */
      /* memory 特色：暗色下 brand 与 accent 互换 */
      .dark #theme-memory {
        --memory-bg: ${CONFIG.MEMORY_COLOR_BG_DARK};
        --memory-text: ${CONFIG.MEMORY_COLOR_TEXT_DARK};
        --memory-brand: ${CONFIG.MEMORY_COLOR_BRAND_DARK};
        --memory-accent: ${CONFIG.MEMORY_COLOR_ACCENT_DARK};
        --memory-grey: ${CONFIG.MEMORY_COLOR_GREY_DARK};
        --memory-card-bg: ${CONFIG.MEMORY_COLOR_CARD_DARK};
        --memory-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
      }

      /* ========== 基础 ========== */
      body {
        background-color: var(--memory-bg);
        color: var(--memory-text);
        font-family: 'Roboto', Helvetica, Arial, 'Hiragino Sans GB',
          'Microsoft YaHei', sans-serif;
        transition: background-color 0.3s ease, color 0.3s ease;
      }

      #theme-memory {
        min-height: 100vh;
        background-color: var(--memory-bg);
      }

      #theme-memory #site-wrapper {
        background-color: var(--memory-bg);
        min-height: 100vh;
      }

      /* ========== 主内容容器 ========== */
      #theme-memory #main {
        max-width: var(--memory-content-width);
        margin: 0 auto;
        padding: 30px 20px;
      }

      /* ========== 顶部加载条 ========== */
      #theme-memory #loading-bar-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        z-index: 100;
        pointer-events: none;
      }
      #theme-memory #loading-bar {
        height: 2px;
        background: var(--memory-brand);
        width: 0;
        transition: width 0.5s ease, opacity 0.3s ease;
      }

      /* ========== 顶部导航 + 悬挂 logo ========== */
      #theme-memory #header-wrapper {
        position: relative;
        height: 70px;
        background: var(--memory-white);
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
        border-top: 2px solid var(--memory-black);
      }
      .dark #theme-memory #header-wrapper {
        background: var(--memory-card-bg);
        border-top-color: var(--memory-text);
      }

      /* 悬挂黑块 logo：绝对定位居中，高度超出导航栏 */
      #theme-memory #logo {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        background: var(--memory-black);
        color: #fff;
        width: 160px;
        height: 82px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 10;
        text-decoration: none;
      }
      .dark #theme-memory #logo {
        background: var(--memory-text);
        color: var(--memory-bg);
      }
      #theme-memory #logo:hover {
        background: var(--memory-black);
      }
      #theme-memory #logo .logo-text {
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 1px;
      }
      #theme-memory #logo .site-desc {
        font-size: 12px;
        opacity: 0.7;
        margin-top: 4px;
        font-weight: 300;
      }

      /* 汉堡按钮 */
      #theme-memory #site-nav-switch {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        cursor: pointer;
        font-size: 22px;
        color: var(--memory-text);
        z-index: 11;
        padding: 8px;
      }
      #theme-memory #site-nav-switch:hover {
        color: var(--memory-brand);
      }

      /* ========== 侧边栏（右侧抽屉）========== */
      #theme-memory #site-sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: var(--memory-sidebar-width);
        height: 100vh;
        background: #1a1a1a;
        color: #c0c0c0;
        transform: translateX(var(--memory-sidebar-width));
        transition: transform 0.3s ease;
        z-index: 50;
        overflow-y: auto;
        padding: 24px 20px;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.3);
      }
      #theme-memory.menu-open #site-sidebar {
        transform: translateX(0);
      }
      #theme-memory #site-wrapper {
        transition: transform 0.3s ease;
      }
      #theme-memory.menu-open #site-wrapper {
        transform: translateX(calc(-1 * var(--memory-sidebar-width)));
      }
      #theme-memory .overlay {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        z-index: 40;
      }
      #theme-memory.menu-open .overlay {
        display: block;
      }

      /* 侧边栏内部样式 */
      #theme-memory #site-sidebar .sidebar-avatar {
        width: 96px;
        height: 96px;
        border-radius: 50%;
        margin: 0 auto 12px;
        display: block;
        object-fit: cover;
        border: 3px solid rgba(255, 255, 255, 0.1);
      }
      #theme-memory #site-sidebar .sidebar-bio {
        text-align: center;
        margin-bottom: 20px;
      }
      #theme-memory #site-sidebar .sidebar-bio h3 {
        font-size: 16px;
        color: #fff;
        margin: 0 0 4px;
      }
      #theme-memory #site-sidebar .sidebar-bio p {
        font-size: 12px;
        color: #888;
        margin: 0;
      }
      #theme-memory #site-sidebar .sidebar-section {
        margin-bottom: 24px;
      }
      #theme-memory #site-sidebar .sidebar-section-title {
        font-size: 11px;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #666;
        margin-bottom: 10px;
        padding-bottom: 6px;
        border-bottom: 1px solid #333;
      }
      #theme-memory #site-sidebar .sidebar-menu a {
        display: block;
        padding: 8px 0;
        color: #b0b0b0;
        text-decoration: none;
        font-size: 14px;
        border-bottom: 1px solid #2a2a2a;
        transition: all 0.2s ease;
      }
      #theme-memory #site-sidebar .sidebar-menu a:hover {
        color: var(--memory-brand);
        padding-left: 6px;
      }
      #theme-memory #site-sidebar .sidebar-tags,
      #theme-memory #site-sidebar .sidebar-categories {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      #theme-memory #site-sidebar .sidebar-tag,
      #theme-memory #site-sidebar .sidebar-category {
        font-size: 12px;
        padding: 3px 8px;
        background: rgba(255, 255, 255, 0.06);
        color: #999;
        border-radius: 2px;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      #theme-memory #site-sidebar .sidebar-tag:hover,
      #theme-memory #site-sidebar .sidebar-category:hover {
        background: var(--memory-brand);
        color: #fff;
      }
      #theme-memory #site-sidebar .sidebar-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid #000;
        color: #b0b0b0;
        width: 32px;
        height: 32px;
        cursor: pointer;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      #theme-memory #site-sidebar .sidebar-close:hover {
        background: var(--memory-brand);
        color: #fff;
      }
      #theme-memory #site-sidebar .sidebar-social {
        display: flex;
        justify-content: center;
        gap: 12px;
        font-size: 18px;
      }
      #theme-memory #site-sidebar .sidebar-social a {
        color: #888;
        transition: all 0.2s ease;
      }
      #theme-memory #site-sidebar .sidebar-social a:hover {
        color: var(--memory-brand);
        transform: scale(1.2);
      }

      /* 侧边栏目录 TOC */
      #theme-memory #site-sidebar .sidebar-toc {
        max-height: 40vh;
        overflow-y: auto;
      }
      #theme-memory #site-sidebar .sidebar-toc a {
        display: block;
        padding: 4px 0 4px 12px;
        font-size: 13px;
        color: #999;
        text-decoration: none;
        border-left: 2px solid transparent;
        transition: all 0.2s ease;
        line-height: 1.5;
      }
      #theme-memory #site-sidebar .sidebar-toc a:hover {
        color: var(--memory-brand);
        border-left-color: var(--memory-brand);
      }

      /* ========== 文章卡片 ========== */
      #theme-memory .memory-post {
        background: var(--memory-card-bg);
        box-shadow: var(--memory-shadow);
        padding: 40px;
        margin-bottom: 30px;
        transition: box-shadow 0.24s ease;
      }
      #theme-memory .memory-post:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
      }
      .dark #theme-memory .memory-post:hover {
        box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
      }
      @media (max-width: 820px) {
        #theme-memory .memory-post {
          padding: 24px 20px;
        }
      }

      /* 文章标题：居中 */
      #theme-memory .memory-post .post-title {
        font-size: 22px;
        font-weight: 700;
        margin: 0 0 8px;
        line-height: 1.4;
        text-align: center;
      }
      #theme-memory .memory-post .post-title a {
        color: var(--memory-text);
        text-decoration: none;
      }
      #theme-memory .memory-post .post-title a:hover {
        color: var(--memory-accent);
      }

      /* 文章时间：居中 */
      #theme-memory .memory-post .post-time {
        display: block;
        font-size: 13px;
        color: var(--memory-grey);
        margin-bottom: 16px;
        text-align: center;
      }

      /* 文章摘要：与原版 .content 一致，左右留白 30px */
      #theme-memory .memory-post .post-summary {
        font-size: 14px;
        line-height: 1.75;
        color: var(--memory-text);
        margin-bottom: 12px;
        padding: 0 30px;
      }
      @media (max-width: 820px) {
        #theme-memory .memory-post .post-summary {
          padding: 0 20px;
        }
      }

      /* readmore */
      #theme-memory .memory-post .readmore {
        display: inline-block;
        font-size: 13px;
        color: var(--memory-brand);
        text-decoration: none;
        margin-top: 20px;
        padding: 0 30px;
      }
      #theme-memory .memory-post .readmore:hover {
        background: rgba(255, 152, 0, 0.1);
      }

      /* 文章封面图 */
      #theme-memory .memory-post .post-cover {
        width: 100%;
        margin-bottom: 16px;
        border-radius: 2px;
        overflow: hidden;
      }
      #theme-memory .memory-post .post-cover img {
        width: 100%;
        height: auto;
        display: block;
      }

      /* ========== 正文排版（NotionPage + 通用）========== */
      #theme-memory .article-entry,
      #theme-memory #notion-article {
        font-size: 15px;
        line-height: 1.75;
        color: var(--memory-text);
      }
      #theme-memory .article-entry p,
      #theme-memory #notion-article p {
        margin: 1em 0;
      }

      /* 标题 # 前缀（memory 招牌特征）*/
      #theme-memory .article-entry h1,
      #theme-memory .article-entry h2,
      #theme-memory .article-entry h3,
      #theme-memory .article-entry h4,
      #theme-memory .article-entry h5,
      #theme-memory .article-entry h6,
      #theme-memory #notion-article h1,
      #theme-memory #notion-article h2,
      #theme-memory #notion-article h3,
      #theme-memory #notion-article h4,
      #theme-memory #notion-article h5,
      #theme-memory #notion-article h6 {
        position: relative;
        font-weight: 700;
        margin: 1.4em 0 0.8em;
      }
      #theme-memory .article-entry h1::before,
      #theme-memory .article-entry h2::before,
      #theme-memory .article-entry h3::before,
      #theme-memory .article-entry h4::before,
      #theme-memory .article-entry h5::before,
      #theme-memory .article-entry h6::before,
      #theme-memory #notion-article h1::before,
      #theme-memory #notion-article h2::before,
      #theme-memory #notion-article h3::before,
      #theme-memory #notion-article h4::before,
      #theme-memory #notion-article h5::before,
      #theme-memory #notion-article h6::before {
        content: '#';
        color: var(--memory-green);
        position: absolute;
        left: -20px;
        font-weight: 400;
      }
      @media (max-width: 820px) {
        #theme-memory .article-entry h1::before,
        #theme-memory .article-entry h2::before,
        #theme-memory .article-entry h3::before,
        #theme-memory .article-entry h4::before,
        #theme-memory .article-entry h5::before,
        #theme-memory .article-entry h6::before,
        #theme-memory #notion-article h1::before,
        #theme-memory #notion-article h2::before,
        #theme-memory #notion-article h3::before,
        #theme-memory #notion-article h4::before,
        #theme-memory #notion-article h5::before,
        #theme-memory #notion-article h6::before {
          left: -12px;
        }
      }

      /* 引用块：绿色左边框 */
      #theme-memory .article-entry blockquote,
      #theme-memory #notion-article .notion-quote,
      #theme-memory #notion-article blockquote {
        border-left: 4px solid var(--memory-green);
        padding: 0 20px;
        margin: 1em 0;
        color: var(--memory-grey);
      }

      /* 行内 code */
      #theme-memory .article-entry code,
      #theme-memory #notion-article code {
        color: var(--memory-brand);
        background: rgba(0, 0, 0, 0.05);
        padding: 3px 5px;
        border-radius: 2px;
        font-family: 'Inconsolata', Consolas, monospace;
        font-size: 0.9em;
      }
      .dark #theme-memory .article-entry code,
      .dark #theme-memory #notion-article code {
        background: rgba(255, 255, 255, 0.08);
      }

      /* 代码块 */
      #theme-memory .article-entry pre,
      #theme-memory #notion-article pre {
        background: rgba(0, 0, 0, 0.04);
        padding: 16px;
        border-radius: 4px;
        overflow-x: auto;
        margin: 1em 0;
      }
      .dark #theme-memory .article-entry pre,
      .dark #theme-memory #notion-article pre {
        background: rgba(255, 255, 255, 0.05);
      }
      #theme-memory .article-entry pre code,
      #theme-memory #notion-article pre code {
        background: transparent;
        color: var(--memory-text);
        padding: 0;
      }

      /* 列表 */
      #theme-memory .article-entry ul,
      #theme-memory .article-entry ol,
      #theme-memory #notion-article ul,
      #theme-memory #notion-article ol {
        padding-left: 24px;
        margin: 1em 0;
      }

      /* 表格 */
      #theme-memory .article-entry table,
      #theme-memory #notion-article table {
        width: 100%;
        border-collapse: collapse;
        margin: 1em 0;
        font-size: 14px;
      }
      #theme-memory .article-entry th,
      #theme-memory .article-entry td,
      #theme-memory #notion-article th,
      #theme-memory #notion-article td {
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 8px 12px;
      }
      .dark #theme-memory .article-entry th,
      .dark #theme-memory .article-entry td,
      .dark #theme-memory #notion-article th,
      .dark #theme-memory #notion-article td {
        border-color: rgba(255, 255, 255, 0.1);
      }
      #theme-memory .article-entry th,
      #theme-memory #notion-article th {
        background: rgba(0, 0, 0, 0.03);
        font-weight: 700;
      }
      .dark #theme-memory .article-entry th,
      .dark #theme-memory #notion-article th {
        background: rgba(255, 255, 255, 0.05);
      }

      /* 图片 */
      #theme-memory .article-entry img,
      #theme-memory #notion-article img {
        max-width: 100%;
        height: auto;
      }

      /* ========== 链接 ========== */
      #theme-memory a {
        color: var(--memory-brand);
        transition: all 0.2s ease;
      }
      #theme-memory a:hover {
        background: rgba(255, 152, 0, 0.1);
      }
      .dark #theme-memory a:hover {
        background: rgba(0, 150, 136, 0.15);
      }

      /* ========== 标签 ========== */
      #theme-memory .memory-tag {
        display: inline-block;
        padding: 4px 10px 4px 18px;
        background: rgba(0, 0, 0, 0.06);
        font-size: 12px;
        color: var(--memory-grey);
        position: relative;
        margin: 2px;
        border-radius: 2px;
        text-decoration: none;
        transition: all 0.2s ease;
      }
      #theme-memory .memory-tag::before {
        content: '#';
        position: absolute;
        left: 6px;
      }
      #theme-memory .memory-tag:hover {
        color: #fff;
        background: var(--memory-brand);
      }
      .dark #theme-memory .memory-tag {
        background: rgba(255, 255, 255, 0.08);
      }

      /* ========== 分页 ========== */
      #theme-memory .memory-pagination {
        display: flex;
        justify-content: space-between;
        margin: 30px 0;
        font-size: 13px;
      }
      #theme-memory .memory-pagination a {
        padding: 8px 24px;
        border: 1px solid var(--memory-grey);
        color: var(--memory-text);
        text-decoration: none;
        transition: all 0.2s ease;
      }
      #theme-memory .memory-pagination a:hover {
        background: var(--memory-text);
        color: var(--memory-white);
      }
      #theme-memory .memory-pagination .invisible {
        visibility: hidden;
      }

      /* ========== 页面标题（分类/标签/归档）========== */
      #theme-memory .page-header {
        text-align: center;
        font-size: 14px;
        color: var(--memory-grey);
        margin: 30px 0;
        letter-spacing: 2px;
      }
      #theme-memory .page-header::before {
        content: '- ';
      }
      #theme-memory .page-header::after {
        content: ' -';
      }

      /* ========== 归档 ========== */
      #theme-memory .archive-year {
        font-size: 24px;
        font-weight: 700;
        margin: 30px 0 10px;
        color: var(--memory-text);
      }
      #theme-memory .archive-post {
        display: flex;
        align-items: baseline;
        padding: 8px 0;
        border-bottom: 1px dashed rgba(0, 0, 0, 0.08);
        text-decoration: none;
      }
      .dark #theme-memory .archive-post {
        border-bottom-color: rgba(255, 255, 255, 0.08);
      }
      #theme-memory .archive-post time {
        font-size: 13px;
        color: var(--memory-grey);
        margin-right: 16px;
        min-width: 50px;
      }
      #theme-memory .archive-post .archive-title {
        color: var(--memory-text);
        font-size: 14px;
      }
      #theme-memory .archive-post:hover .archive-title {
        color: var(--memory-accent);
      }

      /* ========== Footer ========== */
      #theme-memory #footer {
        max-width: var(--memory-content-width);
        margin: 40px auto 0;
        padding: 30px 20px;
        text-align: center;
        font-size: 13px;
        color: var(--memory-grey);
      }
      #theme-memory #footer .footer-search {
        margin-bottom: 16px;
      }
      #theme-memory #footer .footer-search input {
        background: transparent;
        border: none;
        border-bottom: 1px solid var(--memory-grey);
        color: var(--memory-text);
        padding: 6px 0;
        font-size: 14px;
        width: 200px;
        outline: none;
        text-align: center;
      }
      #theme-memory #footer .footer-search input::placeholder {
        color: var(--memory-grey);
      }
      #theme-memory #footer .footer-social {
        display: flex;
        justify-content: center;
        gap: 16px;
        font-size: 18px;
        margin-bottom: 16px;
      }
      #theme-memory #footer .footer-social a {
        color: var(--memory-grey);
      }
      #theme-memory #footer .footer-social a:hover {
        color: var(--memory-brand);
      }
      #theme-memory #footer .footer-copy {
        line-height: 1.8;
      }
      #theme-memory #footer .footer-copy a {
        color: var(--memory-grey);
      }

      /* ========== 404 ========== */
      #theme-memory .memory-404 {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
      #theme-memory .memory-404 h2 {
        font-size: 48px;
        font-weight: 700;
        color: var(--memory-text);
        margin: 0 0 12px;
      }
      #theme-memory .memory-404 p {
        color: var(--memory-grey);
      }

      /* ========== 文章详情元信息 ========== */
      #theme-memory .post-meta time {
        display: block;
        font-size: 13px;
        color: var(--memory-grey);
        margin-bottom: 20px;
      }
      #theme-memory .post-meta .post-category {
        font-size: 13px;
        margin-right: 12px;
      }

      /* ========== 上下篇导航 ========== */
      #theme-memory .article-around {
        display: flex;
        justify-content: space-between;
        margin: 30px 0;
        font-size: 13px;
      }
      #theme-memory .article-around a {
        color: var(--memory-text);
        text-decoration: none;
        max-width: 48%;
      }
      #theme-memory .article-around a:hover {
        color: var(--memory-accent);
      }
      #theme-memory .article-around .around-label {
        display: block;
        font-size: 11px;
        color: var(--memory-grey);
        margin-bottom: 4px;
      }

      /* ========== 文章密码锁 ========== */
      #theme-memory .article-lock {
        text-align: center;
        padding: 60px 20px;
      }
      #theme-memory .article-lock input {
        padding: 8px 16px;
        border: 1px solid var(--memory-grey);
        background: transparent;
        color: var(--memory-text);
        font-size: 14px;
        outline: none;
        margin-right: 8px;
      }
      #theme-memory .article-lock button {
        padding: 8px 20px;
        background: var(--memory-black);
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 14px;
      }
      .dark #theme-memory .article-lock button {
        background: var(--memory-text);
        color: var(--memory-bg);
      }

      /* ========== 选中色 ========== */
      #theme-memory ::selection {
        background: rgba(255, 152, 0, 0.5);
        color: #fff;
      }
      .dark #theme-memory ::selection {
        background: rgba(0, 150, 136, 0.5);
        color: #fff;
      }

      /* ========== 滚动条 ========== */
      #theme-memory #site-sidebar::-webkit-scrollbar {
        width: 4px;
      }
      #theme-memory #site-sidebar::-webkit-scrollbar-thumb {
        background: #444;
      }

      /* ========== 分类/标签云 ========== */
      #theme-memory .category-cloud,
      #theme-memory .tag-cloud {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        padding: 20px 0;
      }

      ${themeConsoleStyle('memory', CONFIG)}
    `}</style>
  )
}

export { Style }

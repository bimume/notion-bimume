/**
 * Memory 主题配置
 * 基于 hexo-theme-memory by Art Chen
 *
 * 所有配置均可被 Notion 配置表覆盖（优先级：Notion > 此处 > blog.config.js）
 * 读取方式：siteConfig('MEMORY_XXX', defaultValue, CONFIG)
 */

const CONFIG = {
  // ========== 配色（亮色）==========
  MEMORY_COLOR_BG: '#EBECEE', // 页面背景
  MEMORY_COLOR_TEXT: '#414141', // 正文文字
  MEMORY_COLOR_BRAND: '#ff9800', // 品牌主色（material orange）
  MEMORY_COLOR_ACCENT: '#009688', // 强调色（material teal）
  MEMORY_COLOR_GREY: '#828282', // 次要文字
  MEMORY_COLOR_BLACK: '#000000', // logo 块、顶边
  MEMORY_COLOR_WHITE: '#ffffff', // 卡片背景
  MEMORY_COLOR_GREEN: '#4caf50', // 标题#前缀、引用左边框

  // ========== 配色（暗色）==========
  // memory 原版特色：暗色下 brand 与 accent 互换
  // 亮色 orange 主色 + teal 强调 → 暗色 teal 主色 + orange 强调
  MEMORY_COLOR_BG_DARK: '#0e141d',
  MEMORY_COLOR_TEXT_DARK: '#c9d1d9',
  MEMORY_COLOR_BRAND_DARK: '#009688', // 暗色下 teal 做主色
  MEMORY_COLOR_ACCENT_DARK: '#ff9800', // 暗色下 orange 做强调
  MEMORY_COLOR_GREY_DARK: '#8b949e',
  MEMORY_COLOR_CARD_DARK: '#15202b',

  // ========== 布局尺寸 ==========
  MEMORY_CONTENT_WIDTH: '820px', // 主内容最大宽度
  MEMORY_SIDEBAR_WIDTH: '280px', // 侧边栏宽度

  // ========== 开关 ==========
  MEMORY_POST_LIST_COVER: true, // 列表卡片显示封面图
  MEMORY_POST_LIST_SUMMARY: true, // 列表卡片显示摘要
  MEMORY_POST_LIST_COVER_FORCE: false, // 无封面时用站点封面兜底
  MEMORY_SIDEBAR_ENABLED: true, // 侧边栏开关
  MEMORY_MENU_CATEGORY: true, // 侧边栏显示分类
  MEMORY_MENU_TAG: true, // 侧边栏显示标签
  MEMORY_MENU_ARCHIVE: true, // 侧边栏显示归档
  MEMORY_LOADING_BAR: true, // 顶部加载条
  MEMORY_LOGO_TEXT: '', // logo 文字，留空则用站点标题
  MEMORY_SITE_DESC: '', // logo 下方描述，留空则用站点描述
  MEMORY_DARK_MODE_BRAND_SWAP: true, // 暗色下 brand/accent 互换
  MEMORY_SIDEBAR_TOC: true // 侧边栏显示文章目录
}

export default CONFIG

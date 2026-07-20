import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 顶部导航栏
 * 复刻 memory 主题招牌：70px 白底导航 + 居中悬挂黑块 logo + 右侧汉堡按钮
 * @param {Object} props
 * @param {Function} props.onToggleSidebar - 切换侧边栏开关
 */
export const Header = ({ onToggleSidebar }) => {
  const logoText =
    siteConfig('MEMORY_LOGO_TEXT', '', CONFIG) || siteConfig('TITLE')
  const siteDesc =
    siteConfig('MEMORY_SITE_DESC', '', CONFIG) || siteConfig('DESCRIPTION')

  return (
    <header id='header-wrapper'>
      {/* 悬挂黑块 logo */}
      <SmartLink href='/' passHref legacyBehavior>
        <a id='logo' href='/'>
          <span className='logo-text'>{logoText}</span>
          {siteDesc && <span className='site-desc'>{siteDesc}</span>}
        </a>
      </SmartLink>

      {/* 汉堡按钮（触发右侧抽屉侧边栏）*/}
      <button
        id='site-nav-switch'
        aria-label='menu'
        onClick={onToggleSidebar}>
        <i className='fas fa-bars' />
      </button>
    </header>
  )
}

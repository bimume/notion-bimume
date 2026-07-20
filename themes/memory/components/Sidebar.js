import DarkModeButton from '@/components/DarkModeButton'
import LazyImage from '@/components/LazyImage'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

/**
 * 右侧抽屉侧边栏
 * 复刻 memory 主题：固定右侧 280px，默认隐藏，点击汉堡按钮滑入
 * 包含：关闭按钮、博主信息、菜单、目录(TOC)、社交、暗色切换
 * @param {Object} props
 * @param {boolean} props.open - 是否打开
 * @param {Function} props.onClose - 关闭回调
 */
export const Sidebar = ({ open, onClose, ...props }) => {
  const {
    siteInfo,
    customNav,
    customMenu,
    post
  } = props

  const showArchive = siteConfig('MEMORY_MENU_ARCHIVE', null, CONFIG)
  const showToc = siteConfig('MEMORY_SIDEBAR_TOC', null, CONFIG)

  // 基础菜单：仅首页 + 可选归档（分类/标签已移除）
  let links = [
    { name: 'Home', href: '/', show: true },
    {
      name: 'Archive',
      href: '/archive',
      show: showArchive
    }
  ]
  if (customNav) {
    links = links.concat(customNav)
  }
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu || []
  }
  links = (links || []).filter(l => l.show !== false)

  // 社交链接（已移除 RSS feed）
  const socials = [
    { key: 'GITHUB', icon: 'fab fa-github', url: siteConfig('CONTACT_GITHUB') },
    {
      key: 'TWITTER',
      icon: 'fab fa-twitter',
      url: siteConfig('CONTACT_TWITTER')
    },
    { key: 'WEIBO', icon: 'fab fa-weibo', url: siteConfig('CONTACT_WEIBO') },
    {
      key: 'EMAIL',
      icon: 'fas fa-envelope',
      url: siteConfig('CONTACT_EMAIL')
        ? `mailto:${siteConfig('CONTACT_EMAIL')}`
        : null
    }
  ].filter(s => s.url)

  const avatar = siteConfig('AVATAR') || siteInfo?.icon
  const siteTitle = siteConfig('TITLE') || siteInfo?.title
  const siteDesc = siteConfig('DESCRIPTION') || siteInfo?.description

  // 目录树：post.toc
  const toc = post?.toc || []

  return (
    <>
      <div className='overlay' onClick={onClose} />
      <aside id='site-sidebar'>
        {/* 关闭按钮 */}
        <button className='sidebar-close' onClick={onClose} aria-label='close'>
          <i className='fas fa-times' />
        </button>

        {/* 博主信息 */}
        <div className='sidebar-bio'>
          {avatar && (
            <LazyImage
              src={avatar}
              alt={siteTitle}
              className='sidebar-avatar'
            />
          )}
          {siteTitle && <h3>{siteTitle}</h3>}
          {siteDesc && <p>{siteDesc}</p>}
        </div>

        {/* 菜单 */}
        <div className='sidebar-section'>
          <div className='sidebar-section-title'>Menu</div>
          <nav className='sidebar-menu'>
            {links.map((link, i) => (
              <SmartLink
                key={i}
                href={link.href}
                passHref
                legacyBehavior>
                <a href={link.href}>{link.name}</a>
              </SmartLink>
            ))}
          </nav>
        </div>

        {/* 文章目录 */}
        {showToc && toc.length > 0 && (
          <div className='sidebar-section'>
            <div className='sidebar-section-title'>Table of Contents</div>
            <div className='sidebar-toc'>
              {toc.map((item, i) => (
                <a
                  key={i}
                  href={item.id || item.slug || `#${item.text}`}
                  style={{ paddingLeft: `${(item.depth || 1) * 12 + 12}px` }}
                  onClick={onClose}>
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 社交链接 */}
        {socials.length > 0 && (
          <div className='sidebar-section'>
            <div className='sidebar-section-title'>Social</div>
            <div className='sidebar-social'>
              {socials.map(s => (
                <a
                  key={s.key}
                  href={s.url}
                  target={s.key === 'EMAIL' ? undefined : '_blank'}
                  rel='noreferrer'
                  title={s.key.toLowerCase()}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 暗色模式切换 */}
        <div className='sidebar-section' style={{ textAlign: 'center' }}>
          <DarkModeButton />
        </div>
      </aside>
    </>
  )
}

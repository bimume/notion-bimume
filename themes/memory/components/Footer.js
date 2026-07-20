import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { useState } from 'react'

/**
 * 底部
 * 复刻 memory 主题：搜索框 + 社交链接 + 版权
 */
export const Footer = () => {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')

  const handleSearch = e => {
    e.preventDefault()
    if (keyword.trim()) {
      router.push(`/search/${encodeURIComponent(keyword.trim())}`)
    }
  }

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
    },
    {
      key: 'RSS',
      icon: 'fas fa-rss',
      url: siteConfig('ENABLE_RSS') ? '/rss/feed.xml' : null
    }
  ].filter(s => s.url)

  const title = siteConfig('TITLE')
  const author = siteConfig('AUTHOR') || title
  const year = new Date().getFullYear()
  const startYear = siteConfig('SINCE') || year

  return (
    <footer id='footer'>
      {/* 搜索 */}
      <div className='footer-search'>
        <form onSubmit={handleSearch}>
          <input
            type='text'
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder='Search'
          />
        </form>
      </div>

      {/* 社交 */}
      {socials.length > 0 && (
        <div className='footer-social'>
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
      )}

      {/* 版权 */}
      <div className='footer-copy'>
        <div>
          &copy; {startYear === year ? year : `${startYear} - ${year}`}{' '}
          {author}
        </div>
        <div>
          Theme Memory designed by{' '}
          <a
            href='https://github.com/artchen/hexo-theme-memory'
            target='_blank'
            rel='noreferrer'>
            Art Chen
          </a>{' '}
          · NotionNext port
        </div>
      </div>
    </footer>
  )
}

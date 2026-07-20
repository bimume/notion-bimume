'use client'

import replaceSearchResult from '@/components/Mark'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ArchiveItem from './components/ArchiveItem'
import ArticleDetail from './components/ArticleDetail'
import ArticleLock from './components/ArticleLock'
import BlogListPage from './components/BlogListPage'
import BlogListScroll from './components/BlogListScroll'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { LoadingBar } from './components/LoadingBar'
import { Sidebar } from './components/Sidebar'
import TagItem from './components/TagItem'
import CONFIG from './config'
import { Style } from './style'

/**
 * 基础布局框架
 * 复刻 hexo-theme-memory 的 layout.ejs 主结构：
 *   - 顶部 2px 加载条
 *   - 70px 导航栏 + 居中悬挂黑块 logo + 汉堡按钮
 *   - 820px 居中单栏主内容（白卡片流）
 *   - 右侧 280px 抽屉侧边栏
 *   - 底部搜索 + 社交 + 版权
 *
 * @returns {JSX.Element}
 */
const LayoutBase = props => {
  const { children } = props
  const { onLoading, fullWidth } = useGlobal()
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  // 路由切换时关闭侧边栏
  useEffect(() => {
    const handleRouteChange = () => setMenuOpen(false)
    router.events.on('routeChangeStart', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router])

  // 菜单打开时禁止 body 滚动
  useEffect(() => {
    if (isBrowser) {
      document.body.style.overflow = menuOpen ? 'hidden' : ''
    }
    return () => {
      if (isBrowser) document.body.style.overflow = ''
    }
  }, [menuOpen])

  const sidebarEnabled = siteConfig('MEMORY_SIDEBAR_ENABLED', null, CONFIG)

  return (
    <div
      id='theme-memory'
      className={`${siteConfig('FONT_STYLE') || ''} ${menuOpen ? 'menu-open' : ''}`}>
      <Style />

      {/* 顶部加载条 */}
      <LoadingBar />

      {/* 主体容器（侧边栏打开时左移）*/}
      <div id='site-wrapper'>
        {/* 顶部导航 */}
        <Header onToggleSidebar={() => setMenuOpen(!menuOpen)} />

        {/* 主内容 */}
        <main id='main'>
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-500 transform'
            enterFrom='opacity-0 translate-y-4'
            enterTo='opacity-100 translate-y-0'
            leave='transition ease-in-out duration-200 transform'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
            unmount={false}>
            <div
              style={{
                maxWidth: fullWidth ? '100%' : 'var(--memory-content-width)',
                margin: '0 auto'
              }}>
              {props.slotTop}
              {children}
            </div>
          </Transition>
        </main>

        {/* 底部 */}
        <Footer />
      </div>

      {/* 右侧抽屉侧边栏 */}
      {sidebarEnabled && (
        <Sidebar
          {...props}
          open={menuOpen}
          onClose={() => setMenuOpen(false)}
        />
      )}

      {/* 回顶按钮 */}
      <div
        className='fixed right-4 bottom-4 z-30'
        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div
          title='Top'
          className='cursor-pointer p-2 text-center'
          style={{
            background: 'var(--memory-card-bg)',
            boxShadow: 'var(--memory-shadow)',
            color: 'var(--memory-text)',
            borderRadius: '2px'
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className='fas fa-angle-up' />
        </div>
      </div>
    </div>
  )
}

/**
 * 首页 = 文章列表
 */
const LayoutIndex = props => {
  return <LayoutPostList {...props} />
}

/**
 * 文章列表
 * 根据 POST_LIST_STYLE 配置选择分页或滚动加载
 */
const LayoutPostList = props => {
  const { category, tag } = props
  const POST_LIST_STYLE = siteConfig('POST_LIST_STYLE')

  return (
    <>
      {/* 分类/标签标题 */}
      {category && <div className='page-header'>{category}</div>}
      {tag && <div className='page-header'>#{tag}</div>}

      {POST_LIST_STYLE === 'scroll' ? (
        <BlogListScroll {...props} />
      ) : (
        <BlogListPage {...props} />
      )}
    </>
  )
}

/**
 * 文章详情页
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector(
            '#article-wrapper #notion-article'
          )
          if (!article) {
            router.push('/404')
          }
        }
      }, waiting404)
    }
  }, [post])

  return (
    <>
      {lock ? (
        <ArticleLock validPassword={validPassword} />
      ) : (
        post && <ArticleDetail {...props} />
      )}
    </>
  )
}

/**
 * 归档页
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <div className='memory-post'>
      <h1 className='page-header' style={{ fontSize: '20px' }}>
        Archives
      </h1>
      {archivePosts &&
        Object.keys(archivePosts).map(archiveTitle => (
          <ArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            posts={archivePosts[archiveTitle]}
          />
        ))}
    </div>
  )
}

/**
 * 分类列表页
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props
  return (
    <div className='memory-post'>
      <h1 className='page-header' style={{ fontSize: '20px' }}>
        Categories
      </h1>
      <div className='category-cloud'>
        {categoryOptions?.map(category => (
          <TagItem
            key={category.name}
            tag={{ name: `${category.name}(${category.count})` }}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 标签列表页
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <div className='memory-post'>
      <h1 className='page-header' style={{ fontSize: '20px' }}>
        Tags
      </h1>
      <div className='tag-cloud'>
        {tagOptions?.map(tag => (
          <TagItem key={tag.name} tag={tag} />
        ))}
      </div>
    </div>
  )
}

/**
 * 搜索页
 */
const LayoutSearch = props => {
  const { keyword } = props
  const router = useRouter()

  useEffect(() => {
    if (isBrowser) {
      const container = document.getElementById('posts-wrapper')
      if (keyword && container) {
        replaceSearchResult({
          doms: container,
          search: keyword,
          target: {
            element: 'span',
            className: 'text-red-500 border-b border-dashed'
          }
        })
      }
    }
  }, [router])

  return (
    <>
      <div className='page-header'>Search: {keyword}</div>
      <LayoutPostList {...props} />
    </>
  )
}

/**
 * 404 页
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/')
      }
    }, 3000)
  }, [])

  return (
    <div className='memory-404'>
      <h2>404</h2>
      <p>Page not found. Redirecting to home...</p>
    </div>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  CONFIG as THEME_CONFIG
}

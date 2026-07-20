import { useState } from 'react'
import BlogCard from './BlogCard'
import { useGlobal } from '@/lib/global'

/**
 * 滚动加载文章列表
 * memory 原版是分页式，这里提供兼容 POST_LIST_STYLE='scroll' 的实现
 * 点击"加载更多"追加显示
 * @param {Array} posts - 全部文章
 */
const BlogListScroll = ({ posts = [] }) => {
  const { fullWidth } = useGlobal()
  const PAGE_SIZE = 10
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (!posts || posts.length === 0) {
    return (
      <div className='memory-post'>
        <p style={{ textAlign: 'center', color: 'var(--memory-grey)' }}>
          No posts found.
        </p>
      </div>
    )
  }

  const visiblePosts = posts.slice(0, visibleCount)
  const hasMore = visibleCount < posts.length

  return (
    <div
      id='posts-wrapper'
      style={{
        maxWidth: fullWidth ? '100%' : 'var(--memory-content-width)',
        margin: '0 auto'
      }}>
      {visiblePosts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
      {hasMore && (
        <div style={{ textAlign: 'center', margin: '20px 0' }}>
          <button
            onClick={() => setVisibleCount(visibleCount + PAGE_SIZE)}
            className='memory-pagination'
            style={{
              display: 'inline-block',
              border: '1px solid var(--memory-grey)',
              padding: '8px 24px',
              cursor: 'pointer',
              background: 'transparent',
              color: 'var(--memory-text)',
              fontSize: '13px'
            }}>
            Load more
          </button>
        </div>
      )}
    </div>
  )
}

export default BlogListScroll

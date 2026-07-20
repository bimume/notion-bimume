import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import BlogCard from './BlogCard'
import Pagination from './Pagination'

/**
 * 分页文章列表
 * 复刻 memory 主题：单列白卡片流 + prev/next 分页
 * @param {number} page - 当前页
 * @param {Array} posts - 文章列表
 * @param {number} postCount - 文章总数
 */
const BlogListPage = ({ page = 1, posts = [], postCount }) => {
  const { NOTION_CONFIG, fullWidth } = useGlobal()
  const postsPerPage = siteConfig('POSTS_PER_PAGE', 10, NOTION_CONFIG)
  const totalPage = Math.ceil(postCount / postsPerPage)
  const showNext = page < totalPage

  if (!posts || posts.length === 0) {
    return (
      <div className='memory-post'>
        <p style={{ textAlign: 'center', color: 'var(--memory-grey)' }}>
          No posts found.
        </p>
      </div>
    )
  }

  return (
    <div
      id='posts-wrapper'
      style={{
        maxWidth: fullWidth ? '100%' : 'var(--memory-content-width)',
        margin: '0 auto'
      }}>
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
      <Pagination page={page} showNext={showNext} />
    </div>
  )
}

export default BlogListPage

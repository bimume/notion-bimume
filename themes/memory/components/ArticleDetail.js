import Comment from '@/components/Comment'
import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import ArticleAround from './ArticleAround'
import TagItem from './TagItem'

/**
 * 文章详情
 * 复刻 memory 主题 article.post.white-box 结构
 * 标题 + 时间 + 正文(NotionPage) + 标签 + 上下篇 + 评论
 * @param {Object} post - 文章对象
 * @param {Object} prev - 上一篇
 * @param {Object} next - 下一篇
 */
const ArticleDetail = props => {
  const { post, prev, next } = props
  const { locale, fullWidth } = useGlobal()

  if (!post) return null

  const showTitleIcon = siteConfig('POST_TITLE_ICON')

  return (
    <div
      id='container'
      style={{
        maxWidth: fullWidth ? '100%' : 'var(--memory-content-width)',
        margin: '0 auto'
      }}>
      {/* 封面图 */}
      {post?.pageCover && post?.type !== 'Page' && (
        <div className='memory-post' style={{ padding: 0, overflow: 'hidden' }}>
          <LazyImage
            alt={post.title}
            src={post.pageCover}
            className='post-cover-img'
          />
        </div>
      )}

      <article className='memory-post'>
        {/* 标题 */}
        <h1
          className='post-title'
          style={{ fontSize: '26px', marginBottom: '8px' }}>
          {showTitleIcon && <NotionIcon icon={post.pageIcon} />} {post.title}
        </h1>

        {/* 元信息 */}
        <div className='post-meta'>
          {post?.category && (
            <SmartLink
              href={`/category/${post.category}`}
              passHref
              legacyBehavior
              className='post-category'>
              <a href={`/category/${post.category}`} className='post-category'>
                <i className='fas fa-folder-open' /> {post.category}
              </a>
            </SmartLink>
          )}
          {post?.publishDay && <time>{post.publishDay}</time>}
        </div>

        {/* 正文 */}
        <section id='article-wrapper' className='article-entry'>
          <NotionPage post={post} />
        </section>

        {/* 标签 */}
        {post.tagItems && post.tagItems.length > 0 && (
          <div className='post-tags' style={{ marginTop: '24px' }}>
            {post.tagItems.map(tag => (
              <TagItem key={tag.name} tag={tag} />
            ))}
          </div>
        )}

        {/* 分享 */}
        <div style={{ marginTop: '24px' }}>
          <ShareBar post={post} />
        </div>
      </article>

      {/* 上下篇 */}
      {post?.type === 'Post' && <ArticleAround prev={prev} next={next} />}

      {/* 评论 */}
      <div className='memory-post'>
        <Comment frontMatter={post} />
      </div>
    </div>
  )
}

export default ArticleDetail

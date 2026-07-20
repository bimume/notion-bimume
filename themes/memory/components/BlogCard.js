import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import TagItem from './TagItem'

/**
 * 文章列表卡片
 * 复刻 memory 主题 .post 结构：标题 + 时间 + 摘要 + readmore + 标签
 * @param {Object} post - 文章对象
 */
const BlogCard = ({ post }) => {
  if (!post) return null

  const showCover = siteConfig('MEMORY_POST_LIST_COVER', null, CONFIG) && post.pageCoverThumbnail
  const showSummary = siteConfig('MEMORY_POST_LIST_SUMMARY', null, CONFIG)
  const showTitleIcon = siteConfig('POST_TITLE_ICON')

  return (
    <article className='memory-post'>
      {/* 封面图 */}
      {showCover && (
        <SmartLink href={post.href} passHref legacyBehavior>
          <a href={post.href} className='post-cover'>
            <LazyImage
              src={post.pageCoverThumbnail}
              alt={post.title}
              className='post-cover-img'
            />
          </a>
        </SmartLink>
      )}

      {/* 标题 */}
      <h2 className='post-title'>
        <SmartLink href={post.href} passHref legacyBehavior>
          <a href={post.href}>
            {showTitleIcon && <NotionIcon icon={post.pageIcon} />} {post.title}
          </a>
        </SmartLink>
      </h2>

      {/* 时间 */}
      <time className='post-time'>{post.publishDay || ''}</time>

      {/* 摘要 */}
      {showSummary && post.summary && (
        <div className='post-summary'>{post.summary}</div>
      )}

      {/* readmore */}
      <SmartLink href={post.href} passHref legacyBehavior className='readmore'>
        <a href={post.href} className='readmore'>
          Read more →
        </a>
      </SmartLink>

      {/* 标签 */}
      {post.tagItems && post.tagItems.length > 0 && (
        <div className='post-tags' style={{ marginTop: '12px' }}>
          {post.tagItems.map(tag => (
            <TagItem key={tag.name} tag={tag} />
          ))}
        </div>
      )}
    </article>
  )
}

export default BlogCard

import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import CONFIG from '../config'
import TagItem from './TagItem'

/**
 * 安全截断摘要：去除 HTML 标签后限制字数
 * @param {string} raw - 原始摘要，可能是 HTML 或纯文本
 * @param {number} maxLength - 最大字符数
 * @returns {string}
 */
const stripAndTruncate = (raw, maxLength = 120) => {
  if (!raw) return ''
  const text = String(raw)
    .replace(/<[^>]+>/g, ' ') // 去掉 HTML 标签
    .replace(/\s+/g, ' ') // 合并空白
    .trim()
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).replace(/\s+\S*$/, '') + ' …'
}

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

  const summary = stripAndTruncate(post.summary, 120)

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
      {showSummary && summary && (
        <div className='post-summary'>{summary}</div>
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

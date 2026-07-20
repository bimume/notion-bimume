import SmartLink from '@/components/SmartLink'

/**
 * 归档项：按年分组的文章列表
 * 复刻 memory 主题 .archive 结构：年份标题 + 时间+标题列表
 * @param {string} archiveTitle - 年份
 * @param {Array} posts - 该年份的文章
 */
const ArchiveItem = ({ archiveTitle, posts = [] }) => {
  if (!posts || posts.length === 0) return null

  return (
    <div className='archive-group'>
      <h3 className='archive-year'>{archiveTitle}</h3>
      {posts.map(post => (
        <SmartLink
          key={post.id}
          href={post.href}
          passHref
          legacyBehavior>
          <a href={post.href} className='archive-post'>
            <time>{post.publishDay || ''}</time>
            <span className='archive-title'>{post.title}</span>
          </a>
        </SmartLink>
      ))}
    </div>
  )
}

export default ArchiveItem

import SmartLink from '@/components/SmartLink'

/**
 * 标签项
 * 复刻 memory 主题：# 前缀 + 灰背景，hover 变品牌色
 * @param {Object} tag - { name, color, count }
 */
const TagItem = ({ tag }) => {
  if (!tag) return null
  return (
    <SmartLink
      href={`/tag/${encodeURIComponent(tag.name)}`}
      passHref
      legacyBehavior>
      <a href={`/tag/${encodeURIComponent(tag.name)}`} className='memory-tag'>
        {tag.name}
        {tag.count ? `(${tag.count})` : ''}
      </a>
    </SmartLink>
  )
}

export default TagItem

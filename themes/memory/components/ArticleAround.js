import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'

/**
 * 上下篇导航
 * @param {Object} prev - 上一篇
 * @param {Object} next - 下一篇
 */
const ArticleAround = ({ prev, next }) => {
  const { locale } = useGlobal()

  return (
    <div className='memory-post'>
      <nav className='article-around'>
        <div>
          {prev && (
            <SmartLink href={prev.href} passHref legacyBehavior>
              <a href={prev.href}>
                <span className='around-label'>
                  ← {locale?.PAGINATION?.PREV || 'Previous'}
                </span>
                <span>{prev.title}</span>
              </a>
            </SmartLink>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          {next && (
            <SmartLink href={next.href} passHref legacyBehavior>
              <a href={next.href}>
                <span className='around-label'>
                  {locale?.PAGINATION?.NEXT || 'Next'} →
                </span>
                <span>{next.title}</span>
              </a>
            </SmartLink>
          )}
        </div>
      </nav>
    </div>
  )
}

export default ArticleAround

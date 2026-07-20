import SmartLink from '@/components/SmartLink'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'

/**
 * 简易分页器
 * 复刻 memory 主题：仅 prev/next，无页码
 * @param {number} page - 当前页码
 * @param {boolean} showNext - 是否有下一页
 */
const Pagination = ({ page = 1, showNext = false }) => {
  const { locale } = useGlobal()
  const router = useRouter()
  const currentPage = +page
  const pagePrefix = router.asPath
    .split('?')[0]
    .replace(/\/page\/[1-9]\d*/, '')
    .replace(/\/$/, '')

  const prevHref =
    currentPage === 2
      ? `${pagePrefix}/`
      : `${pagePrefix}/page/${currentPage - 1}`
  const nextHref = `${pagePrefix}/page/${currentPage + 1}`
  const query = router.query.s ? { s: router.query.s } : {}

  return (
    <div className='memory-pagination'>
      <SmartLink
        href={{ pathname: prevHref, query }}
        passHref
        rel='prev'
        className={currentPage === 1 ? 'invisible' : ''}>
        ← {locale?.PAGINATION?.PREV || 'Prev'}
      </SmartLink>
      <SmartLink
        href={{ pathname: nextHref, query }}
        passHref
        rel='next'
        className={showNext ? '' : 'invisible'}>
        {locale?.PAGINATION?.NEXT || 'Next'} →
      </SmartLink>
    </div>
  )
}

export default Pagination

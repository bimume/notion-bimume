import { useGlobal } from '@/lib/global'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { siteConfig } from '@/lib/config'

/**
 * 顶部加载条
 * 复刻 memory 主题：固定顶部 2px 进度条，用 brand 色
 * 路由切换时触发：20% → 60% → 100% → 淡出
 */
export const LoadingBar = () => {
  const { onLoading } = useGlobal()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)
  const enabled = siteConfig('MEMORY_LOADING_BAR', null, CONFIG)

  useEffect(() => {
    if (!enabled) return

    if (onLoading) {
      setVisible(true)
      setWidth(20)
      timerRef.current = setTimeout(() => setWidth(60), 200)
    } else {
      setWidth(100)
      const hideTimer = setTimeout(() => {
        setVisible(false)
        setWidth(0)
      }, 400)
      return () => clearTimeout(hideTimer)
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [onLoading, enabled])

  if (!enabled || !visible) return null

  return (
    <div id='loading-bar-wrapper'>
      <div
        id='loading-bar'
        style={{ width: `${width}%`, opacity: visible ? 1 : 0 }}
      />
    </div>
  )
}

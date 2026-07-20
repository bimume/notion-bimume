import { useState } from 'react'

/**
 * 文章密码锁
 * 加密文章显示密码输入框
 * @param {Function} validPassword - 验证密码函数
 */
const ArticleLock = ({ validPassword }) => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    if (validPassword(password)) {
      setError(false)
    } else {
      setError(true)
    }
  }

  return (
    <div className='memory-post article-lock'>
      <i
        className='fas fa-lock'
        style={{ fontSize: '32px', color: 'var(--memory-grey)', marginBottom: '16px' }}
      />
      <h3 style={{ marginBottom: '16px' }}>This post is password protected</h3>
      <form onSubmit={handleSubmit}>
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Enter password'
          autoFocus
        />
        <button type='submit'>Unlock</button>
      </form>
      {error && (
        <p style={{ color: 'var(--memory-brand)', marginTop: '12px', fontSize: '13px' }}>
          Wrong password, please try again.
        </p>
      )}
    </div>
  )
}

export default ArticleLock

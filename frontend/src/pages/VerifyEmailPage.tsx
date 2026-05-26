import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail } from '../api'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')

  useEffect(() => {
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    if (!email || !token) {
      setStatus('error')
      setMessage('Verification link is invalid or incomplete.')
      return
    }

    verifyEmail(email, token)
      .then((result) => {
        setStatus('success')
        setMessage(result.message || 'Email verified successfully. You can now log in.')
      })
      .catch((err) => {
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Email verification failed')
      })
  }, [searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--color-page-bg)' }}>
      <div className="card w-full max-w-md text-center">
        <h1 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>
          Email Verification
        </h1>

        <p
          className="text-body-sm mb-6"
          style={{ color: status === 'error' ? '#b42318' : 'var(--color-text-muted)' }}
        >
          {message}
        </p>

        <button
          type="button"
          className="btn-primary w-full"
          onClick={() => navigate('/login')}
          disabled={status === 'loading'}
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

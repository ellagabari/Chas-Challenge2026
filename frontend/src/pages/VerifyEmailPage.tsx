import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { verifyEmail, resendVerification } from '../api'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Verifying your email...')
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const email = searchParams.get('email')

  useEffect(() => {
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

  async function handleResend() {
    if (!email) return
    setResendStatus('sending')
    try {
      await resendVerification(email)
    } finally {
      setResendStatus('sent')
    }
  }

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

        {status === 'error' && email && (
          <div className="mb-4">
            {resendStatus === 'sent' ? (
              <p className="text-body-sm mb-4" style={{ color: 'var(--color-green-dark)' }}>
                A new verification email has been sent. Check your inbox and spam folder.
              </p>
            ) : (
              <button
                type="button"
                className="btn-secondary w-full mb-3"
                onClick={handleResend}
                disabled={resendStatus === 'sending'}
              >
                {resendStatus === 'sending' ? 'Sending…' : 'Resend verification email'}
              </button>
            )}
          </div>
        )}

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

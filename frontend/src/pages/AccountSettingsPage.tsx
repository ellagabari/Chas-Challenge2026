import { useNavigate } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { Button, Input } from '../components/ui'
import { useAuth } from '../hooks/useAuth'

export function AccountSettingsPage() {
  const navigate = useNavigate()
  const { authState } = useAuth()
  const user = authState.status === 'authenticated' ? authState.user : null

  if (!user) return null

  const displayUsername = user.username ?? `User${user.id}`

  return (
    <PageShell>
      <div className="flex flex-col gap-6 mt-2 mx-4 mb-8">
        <button
          type="button"
          onClick={() => navigate('/profile')}
          className="self-start text-base font-medium transition-colors hover:opacity-80"
          style={{ color: 'var(--color-text-body)' }}
        >
          ← Back
        </button>

        <header className="text-center">
          <h1 className="mb-2">Account settings</h1>
          <p className="text-base" style={{ color: 'var(--color-text-muted)' }}>
            Update your profile photo, username, and password.
          </p>
        </header>

        <section className="card flex flex-col gap-4">
          <h2 className="mb-0">Profile photo</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Upload a photo for your profile and the leaderboard.
          </p>
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0"
              style={{ backgroundColor: 'var(--color-green-dark)' }}
            >
              {displayUsername.charAt(0).toUpperCase()}
            </div>
            <Button variant="secondary" type="button" disabled>
              Change photo
            </Button>
          </div>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Coming in a later step.
          </p>
        </section>

        <section className="card flex flex-col gap-4">
          <h2 className="mb-0">Username</h2>
          <Input
            label="Username"
            value={user.username ?? ''}
            readOnly
            disabled
            placeholder="Your username"
          />
          <Button variant="primary" type="button" fullWidth disabled>
            Save username
          </Button>
        </section>

        <section className="card flex flex-col gap-4">
          <h2 className="mb-0">Password</h2>
          <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Signed in as {user.email}
          </p>
          <Input label="Current password" type="password" disabled placeholder="••••••••" />
          <Input label="New password" type="password" disabled placeholder="••••••••" />
          <Input label="Confirm new password" type="password" disabled placeholder="••••••••" />
          <Button variant="primary" type="button" fullWidth disabled>
            Save password
          </Button>
        </section>
      </div>
    </PageShell>
  )
}

import { useMemo } from 'react'

type Props = {
  status: 'idle' | 'saving' | 'saved' | 'error'
  savedAt?: number | null
}

export default function SaveStatus({ status, savedAt }: Props) {
  const label = useMemo(() => {
    if (status === 'saving') return 'Saving…'
    if (status === 'saved')
      return savedAt
        ? `Saved ${new Date(savedAt).toLocaleTimeString()}`
        : 'Saved'
    if (status === 'error') return 'Save failed'
    return 'Idle'
  }, [status, savedAt])

  const icon =
    status === 'saving'
      ? '⏳'
      : status === 'saved'
        ? '✅'
        : status === 'error'
          ? '⚠️'
          : '•'

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 12,
        color: status === 'error' ? '#b00020' : '#555',
      }}
      aria-live="polite"
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  )
}

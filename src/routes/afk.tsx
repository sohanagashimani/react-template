import { createFileRoute } from '@tanstack/react-router'
import { useIdleTimer } from '@/hooks/useIsIdleTimer'

export const Route = createFileRoute('/afk')({
  component: RouteComponent,
})

function RouteComponent() {
  const { isIdle } = useIdleTimer({
    timeout: 100, // 30 sec
    onIdle: () => console.warn('User went idle! 🚨'),
    onActive: () => console.log('User is back ✅'),
  })

  return (
    <div>
      <h3>Assessment in Progress</h3>
      <p>Status: {isIdle ? '🚨 Idle' : '🟢 Active'}</p>
    </div>
  )
}

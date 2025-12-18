import { useEffect, useRef, useState } from 'react'

type IdleTimerOptions = {
  /** Time in ms after which user is considered idle */
  timeout?: number
  /** Callback when user goes idle */
  onIdle?: () => void
  /** Callback when user becomes active again */
  onActive?: () => void
}

export function useIdleTimer({
  timeout = 60_000,
  onIdle,
  onActive,
}: IdleTimerOptions = {}) {
  const [isIdle, setIsIdle] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const onIdleRef = useRef(onIdle)
  const onActiveRef = useRef(onActive)

  // Keep refs up to date
  useEffect(() => {
    onIdleRef.current = onIdle
    onActiveRef.current = onActive
  })

  useEffect(() => {
    let hasTriggeredActive = false

    const resetTimer = () => {
      setIsIdle((prevIsIdle) => {
        if (prevIsIdle && !hasTriggeredActive) {
          hasTriggeredActive = true
          onActiveRef.current?.()
          // Reset the flag after a short delay to allow for new idle/active cycles
          setTimeout(() => {
            hasTriggeredActive = false
          }, 100)
        }
        return false
      })

      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        setIsIdle(true)
        hasTriggeredActive = false
        onIdleRef.current?.()
      }, timeout)
    }

    // Listen for activity
    window.addEventListener('mousemove', resetTimer)
    window.addEventListener('keydown', resetTimer)
    window.addEventListener('mousedown', resetTimer)
    window.addEventListener('touchstart', resetTimer)

    // Start timer
    resetTimer()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      window.removeEventListener('mousemove', resetTimer)
      window.removeEventListener('keydown', resetTimer)
      window.removeEventListener('mousedown', resetTimer)
      window.removeEventListener('touchstart', resetTimer)
    }
  }, [timeout])

  return { isIdle }
}

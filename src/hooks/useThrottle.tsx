import { useCallback, useRef } from 'react'

export function useThrottle<T extends (...args: Array<any>) => any>(
  callback: T,
  delay: number,
): T {
  const lastRunRef = useRef(0)

  const throttledCb = useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now()
      if (now - lastRunRef.current >= delay) {
        lastRunRef.current = now
        return callback(...args)
      }
    },
    [callback, delay],
  ) as T

  return throttledCb
}

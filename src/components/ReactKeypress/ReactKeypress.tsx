import React, {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ReactKeypressItem } from './ReactKeypressItem'
import type { ReactNode } from 'react'
import type {
  KeypressCombo,
  KeypressContextValue,
  KeypressListener,
  ShortcutConfig,
  ShortcutInfo,
} from './types'

const KeypressContext = createContext<KeypressContextValue | null>(null)

export const useKeypressContext = () => {
  const context = useContext(KeypressContext)
  if (!context) {
    throw new Error(
      'useKeypressContext must be used within ReactKeypress provider',
    )
  }
  return context
}

interface ReactKeypressProps {
  children: ReactNode
}

const ReactKeypressComponent: React.FC<ReactKeypressProps> = ({ children }) => {
  const listenerRef = useRef<KeypressListener | null>(null)
  const shortcutsRef = useRef<Map<KeypressCombo, ShortcutInfo>>(new Map())
  const [activeShortcuts, setActiveShortcuts] = useState<Array<ShortcutInfo>>(
    [],
  )
  const [isReady, setIsReady] = useState(false)

  useLayoutEffect(() => {
    if (
      typeof window !== 'undefined' &&
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      window.keypress
    ) {
      listenerRef.current = new window.keypress.Listener()
      listenerRef.current.listen()
      setIsReady(true)
    }

    return () => {
      if (listenerRef.current) {
        listenerRef.current.stop_listening()
        listenerRef.current.reset()
        listenerRef.current = null
      }
      shortcutsRef.current.clear()
    }
  }, [])

  const updateActiveShortcuts = useCallback(() => {
    const shortcuts: Array<ShortcutInfo> = Array.from(
      shortcutsRef.current.values(),
    ).filter((info) => info.enabled && info.visible !== false)
    setActiveShortcuts(shortcuts)
  }, [])

  const registerShortcut = useCallback(
    (config: ShortcutConfig): KeypressCombo | null => {
      if (!listenerRef.current) {
        return null
      }

      try {
        const combo = listenerRef.current.simple_combo(
          config.keys,
          config.callback,
        )

        const shortcutInfo = {
          keys: config.keys,
          description: config.description,
          componentId: config.componentId,
          enabled: config.enabled ?? true,
          visible: config.visible ?? true,
        }

        shortcutsRef.current.set(combo, shortcutInfo)
        updateActiveShortcuts()

        return combo
      } catch (error) {
        console.error('Failed to register shortcut:', error)
        return null
      }
    },
    [updateActiveShortcuts],
  )

  const updateShortcutVisibility = useCallback(
    (combo: KeypressCombo, visible: boolean) => {
      const info = shortcutsRef.current.get(combo)
      if (info) {
        info.visible = visible
        updateActiveShortcuts()
      }
    },
    [updateActiveShortcuts],
  )

  const unregisterShortcut = useCallback(
    (combo: KeypressCombo): void => {
      if (!listenerRef.current) {
        return
      }

      try {
        listenerRef.current.unregister_combo(combo)
        shortcutsRef.current.delete(combo)
        updateActiveShortcuts()
      } catch (error) {
        console.error('Failed to unregister shortcut:', error)
      }
    },
    [updateActiveShortcuts],
  )

  const contextValue: KeypressContextValue = useMemo(
    () => ({
      listener: listenerRef.current,
      registerShortcut,
      unregisterShortcut,
      updateShortcutVisibility,
      activeShortcuts,
    }),
    [
      registerShortcut,
      unregisterShortcut,
      updateShortcutVisibility,
      activeShortcuts,
    ],
  )

  if (!isReady) {
    return null
  }

  return (
    <KeypressContext.Provider value={contextValue}>
      {children}
    </KeypressContext.Provider>
  )
}

export const ReactKeypress = Object.assign(ReactKeypressComponent, {
  Item: ReactKeypressItem,
})

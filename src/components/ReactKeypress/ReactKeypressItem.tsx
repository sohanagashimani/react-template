import React, { useEffect, useRef } from 'react'
import { useKeypressContext } from './ReactKeypress'
import type { KeypressCombo } from './types'

interface ReactKeypressItemProps {
  keys: string
  onPress: () => void
  description: string
  componentId?: string
  enabled?: boolean
  visible?: boolean
  children: React.ReactNode
}

export const ReactKeypressItem: React.FC<ReactKeypressItemProps> = ({
  keys,
  onPress,
  description,
  componentId,
  enabled = true,
  visible = true,
  children,
}) => {
  const { registerShortcut, unregisterShortcut, updateShortcutVisibility } =
    useKeypressContext()
  const comboRef = useRef<KeypressCombo | null>(null)

  useEffect(() => {
    const combo = registerShortcut({
      keys,
      callback: onPress,
      description,
      componentId: componentId || `item-${keys}`,
      enabled: enabled,
      visible: visible,
    })

    if (combo) {
      comboRef.current = combo
    }

    return () => {
      if (comboRef.current) {
        unregisterShortcut(comboRef.current)
        comboRef.current = null
      }
    }
  }, [
    keys,
    description,
    componentId,
    onPress,
    registerShortcut,
    unregisterShortcut,
  ])

  useEffect(() => {
    if (comboRef.current) {
      updateShortcutVisibility(comboRef.current, visible)
    }
  }, [visible, updateShortcutVisibility])

  return <>{children}</>
}

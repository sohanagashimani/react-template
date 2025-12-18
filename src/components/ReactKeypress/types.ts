// Type definitions for keypress.js Combo object
export interface KeypressCombo {
  keys: Array<string>
  on_keydown?: () => void
  on_keyup?: () => void
  on_release?: () => void
  [key: string]: any
}

declare global {
  interface Window {
    keypress: {
      Listener: new (
        element?: HTMLElement | null,
        defaults?: any,
      ) => KeypressListener
      debug: boolean
    }
  }
}

export interface KeypressListener {
  simple_combo: (keys: string, callback: () => void) => KeypressCombo
  unregister_combo: (combo: KeypressCombo | string) => boolean
  get_registered_combos: () => Array<KeypressCombo>
  listen: () => void
  stop_listening: () => void
  reset: () => void
}

export interface ShortcutConfig {
  keys: string
  callback: () => void
  description: string
  componentId: string
  enabled?: boolean
  visible?: boolean
}

export interface ShortcutInfo {
  keys: string
  description: string
  componentId: string
  enabled: boolean
  visible?: boolean
}

// Context value interface
export interface KeypressContextValue {
  listener: KeypressListener | null
  registerShortcut: (config: ShortcutConfig) => KeypressCombo | null
  unregisterShortcut: (combo: KeypressCombo) => void
  updateShortcutVisibility: (combo: KeypressCombo, visible: boolean) => void
  activeShortcuts: Array<ShortcutInfo>
}

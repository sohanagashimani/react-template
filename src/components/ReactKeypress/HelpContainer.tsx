import React from 'react'
import { useKeypressContext } from './ReactKeypress'

interface HelpContainerProps {
  className?: string
}

export const HelpContainer: React.FC<HelpContainerProps> = ({
  className = '',
}) => {
  const { activeShortcuts } = useKeypressContext()

  const formatKeys = (keys: string): string => {
    return keys.toLowerCase()
  }

  if (activeShortcuts.length === 0) {
    return null
  }

  return (
    <div className={`text-white ${className}`}>
      {activeShortcuts.map((shortcut, index) => {
        const componentName = shortcut.componentId
          .replace(/^panel-/, '')
          .replace(/^item-/, '')
          .toUpperCase()
        const formattedKeys = formatKeys(shortcut.keys)

        return (
          <div
            key={`${shortcut.componentId}-${index}`}
            className="mb-2 text-sm"
          >
            Click {componentName} or Press{' '}
            <span className="font-semibold">{formattedKeys}</span> to{' '}
            {shortcut.description}
          </div>
        )
      })}
    </div>
  )
}

import React from 'react'
import { Panel } from './Panel'

interface PanelAProps {
  isVisible: boolean
  onToggle: () => void
}

export const PanelA: React.FC<PanelAProps> = ({ isVisible, onToggle }) => {
  return <Panel letter="A" isVisible={isVisible} onToggle={onToggle} />
}

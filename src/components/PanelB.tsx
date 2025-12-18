import React from 'react'
import { Panel } from './Panel'

interface PanelBProps {
  isVisible: boolean
  onToggle: () => void
}

export const PanelB: React.FC<PanelBProps> = ({ isVisible, onToggle }) => {
  return <Panel letter="B" isVisible={isVisible} onToggle={onToggle} />
}

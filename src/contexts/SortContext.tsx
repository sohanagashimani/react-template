import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

type SortBy = 'price' | 'rating' | 'date'

interface SortContextType {
  sortBy: SortBy
  setSortBy: (sort: SortBy) => void
}

const SortContext = createContext<SortContextType | undefined>(undefined)

export const SortProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sortBy, setSortBy] = useState<SortBy>('price')

  return (
    <SortContext.Provider value={{ sortBy, setSortBy }}>
      {children}
    </SortContext.Provider>
  )
}

export const useSort = () => {
  const context = useContext(SortContext)
  if (context === undefined) {
    throw new Error('useSort must be used within a SortProvider')
  }
  return context
}

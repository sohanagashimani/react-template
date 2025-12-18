import { useState } from 'react'

const useFilter = ({
  options,
}: {
  options: Array<{ label: string; value: string }>
}) => {
  const [filter, setFilter] = useState<Record<string, boolean>>(() => {
    console.log('initializing')
    return Object.fromEntries(
      options.map(({ value }) => [value, false]),
    ) as Record<string, boolean>
  })
  const handleFilterChange = (value: string) => {
    setFilter((prev) =>
      Object.fromEntries(Object.keys(prev).map((k) => [k, k === value])),
    )
  }

  return { filter, handleFilterChange }
}
export default useFilter

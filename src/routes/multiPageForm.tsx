import {
  Outlet,
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect } from 'react'
import type { NavigateOptions } from '@tanstack/react-router'
import { FormProvider } from '@/contexts/formContext'
import useFilter from '@/hooks/useFilter'

export const Route = createFileRoute('/multiPageForm')({
  component: RouteComponent,
})
type NavbarItem = {
  label: string
  value: string
  to: NavigateOptions['to']
}
const NAVBAR_ITEMS: Array<NavbarItem> = [
  { label: 'Personal', value: 'PERSONAL', to: '/multiPageForm/page1' },
  { label: 'Preference', value: 'PREFERENCE', to: '/multiPageForm/page2' },
  { label: 'Settings', value: 'SETTINGS', to: '/multiPageForm/page3' },
]

function RouteComponent() {
  const { filter, handleFilterChange } = useFilter({ options: NAVBAR_ITEMS })
  const navigate = useNavigate()
  const handleOnClick = (item: NavbarItem) => {
    handleFilterChange(item.value)
    navigate({ to: item.to })
  }
  const location = useLocation()

  useEffect(() => {
    const currentTab = NAVBAR_ITEMS.find((i) => {
      return i.to === location.pathname
    })
    if (currentTab && !filter[currentTab.value]) {
      handleFilterChange(currentTab.value)
    }
  }, [location.pathname])

  return (
    <div className="p-4">
      <FormProvider>
        <div className="flex gap-4 mb-2">
          {NAVBAR_ITEMS.map((item) => {
            return (
              <button
                type="button"
                className={`cursor-pointer p-2 border border-gray-800 rounded-md ${filter[item.value] ? 'bg-green-300' : ''}`}
                onClick={() => handleOnClick(item)}
                key={item.value}
              >
                {item.label}
              </button>
            )
          })}
        </div>
        <Outlet />
      </FormProvider>
    </div>
  )
}

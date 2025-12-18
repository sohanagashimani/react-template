import { createFileRoute, useNavigate } from '@tanstack/react-router'
import FieldContainer from '@/components/FieldContainer'
import { useFormData } from '@/contexts/formContext'

export const Route = createFileRoute('/multiPageForm/page2')({
  component: RouteComponent,
})

const INTEREST_OPTIONS = [
  { label: 'Football', value: 'FOOTBALL' },
  { label: 'Cricket', value: 'CRICKET' },
]

function RouteComponent() {
  const { data, setValues } = useFormData()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4">
      {INTEREST_OPTIONS.map((item) => {
        return (
          <div key={item.value}>
            <FieldContainer
              name={item.value}
              label={item.label}
              className="flex-row gap-2"
            >
              <input
                type="checkbox"
                name={item.value}
                id={item.value}
                onChange={(e) => {
                  setValues({
                    ...data,
                    [item.value]: e.target.checked,
                  })
                }}
              />
            </FieldContainer>
          </div>
        )
      })}
      <div className="flex gap-2">
        <button
          type="button"
          className="cursor-pointer border border-gray-500 p-2 rounded-md w-fit"
          onClick={() => {
            navigate({ to: '/multiPageForm/page1' })
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="cursor-pointer border border-gray-500 p-2 rounded-md w-fit"
          onClick={() => {
            navigate({ to: '/multiPageForm/page3' })
          }}
        >
          Next
        </button>
      </div>
    </div>
  )
}

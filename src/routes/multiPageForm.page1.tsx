import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useFormData } from '@/contexts/formContext'
import FieldContainer from '@/components/FieldContainer'

export const Route = createFileRoute('/multiPageForm/page1')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, setValues } = useFormData()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col gap-4">
      <FieldContainer {...{ name: 'firstName', label: 'First name' }}>
        <input
          type="text"
          className="border border-gray-500 w-fit"
          name="firstName"
          value={data.firstName ?? ''}
          onChange={(e) => {
            setValues({ firstName: e.target.value })
          }}
        />
      </FieldContainer>
      <FieldContainer {...{ name: 'lastName', label: 'Last name' }}>
        <input
          type="text"
          className="border border-gray-500 w-fit"
          name="lastName"
          value={data.lastName ?? ''}
          onChange={(e) => {
            setValues({ lastName: e.target.value })
          }}
        />
      </FieldContainer>
      <button
        type="button"
        className="cursor-pointer border border-gray-500 p-2 rounded-md w-fit"
        onClick={() => {
          navigate({ to: '/multiPageForm/page2' })
        }}
      >
        Next
      </button>
    </div>
  )
}

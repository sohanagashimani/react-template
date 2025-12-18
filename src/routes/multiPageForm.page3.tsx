import { createFileRoute, useNavigate } from '@tanstack/react-router'
import FieldContainer from '@/components/FieldContainer'
import { useFormData } from '@/contexts/formContext'

export const Route = createFileRoute('/multiPageForm/page3')({
  component: RouteComponent,
})

function RouteComponent() {
  const { data, setValues } = useFormData()
  const navigate = useNavigate()
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ theme: e.target.value })
  }
  return (
    <div className="flex flex-col gap-3">
      <FieldContainer name="theme" label="Light" className="flex-row gap-2">
        <input
          type="radio"
          name="theme"
          id="theme"
          value="light"
          checked={data.theme === 'light'}
          onChange={handleOnChange}
        />
      </FieldContainer>
      <FieldContainer name="theme" label="Dark" className="flex-row gap-2">
        <input
          type="radio"
          name="theme"
          id="theme"
          value="dark"
          onChange={handleOnChange}
          checked={data.theme === 'dark'}
        />
      </FieldContainer>

      <div className="flex gap-2">
        <button
          type="button"
          className="cursor-pointer border border-gray-500 p-2 rounded-md w-fit"
          onClick={() => {
            navigate({ to: '/multiPageForm/page2' })
          }}
        >
          Previous
        </button>
        <button
          type="button"
          className="cursor-pointer border border-gray-500 p-2 rounded-md w-fit"
          onClick={() => {
            console.log(data)
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

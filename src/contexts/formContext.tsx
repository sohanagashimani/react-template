import { createContext, useContext, useState } from 'react'

type FormDataType = {
  firstName?: string
  lastName?: string
  interests?: Array<string>
  theme?: string
}

type FormContextType = {
  data: FormDataType
  setValues: (partialData: Partial<FormDataType>) => void
  reset: () => void
}

const FormContext = createContext<FormContextType | null>(null)

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<FormDataType>({})
  const setValues = (partialData: Partial<FormDataType>) => {
    setData((prev) => ({ ...prev, ...partialData }))
  }
  const reset = () => {
    setData({})
  }

  return (
    <FormContext.Provider
      value={{
        data,
        setValues,
        reset,
      }}
    >
      {children}
    </FormContext.Provider>
  )
}

export const useFormData = () => {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useFormData to be used within FormProvider')
  return ctx
}

const FieldContainer = ({
  name,
  children,
  label,
  className,
}: {
  name: string
  children: React.ReactNode
  label: string
  className?: string
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={name}>{label}</label>
      {children}
    </div>
  )
}

export default FieldContainer

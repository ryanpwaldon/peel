import { UseFormRegisterReturn } from 'react-hook-form'

type InputTextProps = {
  label?: string
  field: UseFormRegisterReturn
  placeholder?: string
  className?: string
}

export default function InputText({ label, field, placeholder, className }: InputTextProps) {
  return (
    <div className={`grid gap-1 ${className}`}>
      {label && (
        <label className="text-sm text-gray-400" htmlFor={field.name}>
          {label}
        </label>
      )}
      <input
        className="w-full rounded-lg border-hairline border-gray-200 bg-white p-3 text-base outline-none placeholder:text-gray-400 focus:border-gray-200 focus:ring-0"
        placeholder={placeholder}
        {...field}
      />
    </div>
  )
}

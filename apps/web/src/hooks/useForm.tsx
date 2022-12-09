import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm, UseFormProps } from 'react-hook-form'

type Schema = ReturnType<typeof z.object>
type FormData<T extends Schema> = z.infer<T>

export const useForm = <T extends Schema, K extends FormData<T>>(schema: T, options: UseFormProps<K> = {}) => {
  return useReactHookForm<K>({ ...options, resolver: zodResolver(schema) })
}

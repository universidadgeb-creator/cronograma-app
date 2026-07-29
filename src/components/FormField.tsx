import type { ReactNode } from 'react'

export function FormField({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-bold text-[#4A1A6B]">
        {label} {required && <span className="text-[#F5A623]">*</span>}
      </span>
      {children}
    </label>
  )
}

export const inputClass =
  'w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-[#333333] focus:outline-none focus:ring-2 focus:ring-[#8B44B8] focus:border-transparent'

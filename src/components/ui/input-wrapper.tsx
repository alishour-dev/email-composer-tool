import type { ReactNode } from "react"

import { cn } from "@/utils/cn"

interface InputWrapperProps extends Partial<Record<"id" | "label", string>> {
	children: ReactNode
	className?: string
}

export const InputWrapper = ({ children, className, id, label }: InputWrapperProps) => (
	<div
		className={cn(
			"flex h-max w-full flex-col items-start justify-between gap-0.5 sm:flex-row sm:gap-1.5 sm:pl-0.5",
			className
		)}>
		{!!label?.length && (
			<label className='min-w-[56px] text-xs text-gray-800 sm:text-sm' htmlFor={id}>
				{label}:
			</label>
		)}
		{children}
	</div>
)

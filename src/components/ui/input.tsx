import { cn } from "@/utils/cn"
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react"
import { twMerge } from "tailwind-merge"

import { InputWrapper } from "./input-wrapper"

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	inputClassName?: string
	label?: string
	leftIcon?: ReactNode
	rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ className, inputClassName, label, leftIcon, rightIcon, ...props }, ref) => (
		<InputWrapper className={className} id={props?.id} label={label}>
			<div className='group !relative h-max w-full md:max-w-[30rem]'>
				{!!leftIcon && (
					<span
						className={twMerge(
							"pointer-events-none absolute inset-y-0 start-3 h-full w-max text-primary-400 transition-[color] duration-300 flex-center group-focus-within:text-primary-600",
							!!props?.value && "text-primary-600"
						)}>
						{leftIcon}
					</span>
				)}

				<input
					{...props}
					className={cn(
						"inline-block min-h-[40px] w-full overflow-hidden rounded-md !border-0 !bg-transparent !px-2 !py-1.5 !text-sm text-gray-800 !outline-none ring-1 !ring-inset ring-primary-300 transition-all duration-300 ease-in-out placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-primary-500 focus:ring-2 focus:ring-primary-500 active:ring-2 active:ring-primary-500",
						!!leftIcon && "!pl-10",
						!!rightIcon && "!pr-10",
						!!props?.value && "invalid:ring-2 invalid:ring-red-500",
						inputClassName
					)}
					ref={ref}
				/>

				{!!rightIcon && (
					<span
						className={twMerge(
							"pointer-events-none absolute inset-y-0 end-3 h-full w-max text-primary-400 transition-[color] duration-300 flex-center group-focus-within:!text-primary-600",
							!!props?.value && "text-primary-600"
						)}>
						{rightIcon}
					</span>
				)}
			</div>
		</InputWrapper>
	)
)

Input.displayName = "Input"

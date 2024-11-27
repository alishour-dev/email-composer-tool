"use client"

import { useState } from "react"
import { LuX } from "react-icons/lu"

import { InputWrapper } from "./input-wrapper"

interface MultiInputFieldProps
	extends Pick<React.InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "placeholder" | "type"> {
	label: string
	setValues: (vals: string[]) => void
	values: string[]
}

export const MultiInputField = ({ id, label, setValues, values, ...inputProps }: MultiInputFieldProps) => {
	const [inputValue, setInputValue] = useState<string>("")

	const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter" || event.key === ",") {
			event.preventDefault()

			addEmail(inputValue.trim())
		} else if (event.key === "Backspace" && inputValue === "" && values.length > 0) {
			const lastEmail = values[values.length - 1]

			removeEmail(lastEmail)
		}
	}

	const addEmail = (email: string) => {
		if (!email) return

		const emailExists = values.some((prevEmail) => prevEmail === email)

		const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

		const isValidEmail = emailRegex.test(email)

		if (!emailExists && !!isValidEmail) {
			setValues([...values, email])
			setInputValue("")
		}
	}

	const removeEmail = (emailToRemove: string) => setValues(values.filter((prevEmail) => prevEmail !== emailToRemove))

	return (
		<InputWrapper id={id} label={label}>
			<div
				className={`inline-flex min-h-[40px] w-full flex-wrap gap-1 overflow-hidden rounded-md !border-0 !bg-transparent px-2 py-1.5 text-sm text-gray-800 !outline-none ring-1 !ring-inset ring-indigo-300 transition-all duration-300 ease-in-out placeholder:text-gray-400 focus-within:ring-2 focus-within:ring-indigo-500 focus:ring-2 focus:ring-indigo-500 active:ring-2 active:ring-indigo-500 md:max-w-[30rem]`}>
				{values.map((email, index) => (
					// BADGE
					<div
						className='flex h-max max-w-full items-center gap-1 self-center truncate rounded-md border border-indigo-600 bg-indigo-300 bg-opacity-20 p-0.5 pl-1 text-gray-800'
						key={email + "-" + index}>
						<span className='truncate'>{email}</span>
						<button
							className='text-base filter transition-all duration-300 ease-in-out hover:!text-indigo-800 active:brightness-75'
							onClick={() => removeEmail(email)}
							type='button'>
							<LuX />
						</button>
					</div>
				))}

				<input
					id={id}
					{...inputProps}
					className='h-[26px] w-max flex-1 self-center overflow-hidden border-0 bg-transparent p-0 text-sm text-gray-500 outline-none ring-0 placeholder:text-gray-400 autofill:[-webkit-text-fill-color:rgba(0,0,0,0.4)] focus:ring-0'
					onChange={(e) => setInputValue(e.target.value)}
					onKeyDown={handleInputKeyDown}
					spellCheck={false}
					value={inputValue}
				/>
			</div>
		</InputWrapper>
	)
}

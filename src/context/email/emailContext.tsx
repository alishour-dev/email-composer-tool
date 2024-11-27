"use client"

import { createContext, useContext, useReducer } from "react"

import type { AppActions, Email } from "./types"

import { emailReducer } from "./reducer"

interface EmailContextValueType extends Email {
	dispatch: React.Dispatch<AppActions>
	onReset: () => void
}

const initialData: Email = {
	attachments: [],
	emailRequest: {
		bcc: [],
		cc: [],
		recipient: [],
		subject: ""
	},
	inline: []
}

const EmailContextProvider = createContext<EmailContextValueType>({
	...initialData,
	dispatch: () => {},
	onReset: () => {}
})

export const EmailContext = ({ children }: { children: React.ReactNode }) => {
	const [email, dispatch] = useReducer(emailReducer, initialData)

	return (
		<EmailContextProvider.Provider
			value={{ ...email, dispatch, onReset: () => dispatch({ payload: initialData, type: "RESET_EMAIL" }) }}>
			{children}
		</EmailContextProvider.Provider>
	)
}

export const useEmailContext = (): EmailContextValueType => useContext(EmailContextProvider)

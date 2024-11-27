export interface Email {
	attachments: File[]
	emailRequest: {
		bcc: string[]
		cc: string[]
		recipient: string[]
		subject: string
	}
	inline: File[]
}

export type AppActions =
	| { payload: Email; type: "RESET_EMAIL" }
	| { payload: File[]; type: "UPDATE_ATTACHMENTS" }
	| { payload: File[]; type: "UPDATE_INLINE" }
	| { payload: number; type: "REMOVE_ATTACHMENTS" }
	| { payload: number; type: "REMOVE_INLINE" }
	| { payload: Partial<Email["emailRequest"]>; type: "UPDATE_EMAIL_REQUEST" }

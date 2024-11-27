import type { AppActions, Email } from "./types"

export function emailReducer(state: Email, action: AppActions): Email {
	const { type } = action

	switch (type) {
		case "REMOVE_ATTACHMENTS":
			return { ...state, attachments: state.attachments.filter((_, index) => action.payload !== index) }

		case "REMOVE_INLINE":
			return { ...state, inline: state.inline.filter((_, index) => action.payload !== index) }

		case "RESET_EMAIL":
			return (state = action.payload)

		case "UPDATE_ATTACHMENTS":
			return { ...state, attachments: action.payload }

		case "UPDATE_EMAIL_REQUEST":
			return { ...state, emailRequest: { ...state.emailRequest, ...action.payload } }

		case "UPDATE_INLINE":
			return { ...state, inline: action.payload }

		default:
			throw new Error()
	}
}

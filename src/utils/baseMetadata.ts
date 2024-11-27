import type { Metadata } from "next"

/**
 * Base Metadata options to be sharod across apps. Make sure to pass unique title
 * @param param0 Metadata options
 * @returns Metadata configuration object, to be used in Next apps
 */
export const baseMetadata = ({ title, ...rest }: Metadata): Metadata => ({
	authors: [{ name: "alishour.dev" }],
	description: "A powerful tool to compose, manage, and send emails with ease and efficiency.",
	keywords: "email, composer, email management, email tool, email efficiency, email marketing, email automation",
	other: { "msapplication-TileColor": "#da532c" },
	title: {
		default: (title || "Email Composer Tool") as string,
		template: `%s | Email Composer Tool`
	},
	...rest
})

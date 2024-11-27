"use client"

import { ErrorCard } from "@/components/ui/error-card"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	// eslint-disable-next-line no-console
	console.log(`An error occurred: ${error.message}`)

	return <ErrorCard onClick={() => reset()} />
}

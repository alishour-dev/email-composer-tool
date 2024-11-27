/* eslint-disable no-console */
import { Component } from "react"

import { ErrorCard } from "./error-card"

interface Props {
	children: React.ReactNode
	className?: string
}

interface State {
	hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
	public state: State = {
		hasError: false
	}

	public static getDerivedStateFromError(): State {
		// Update state so the next render will show the fallback UI.
		return { hasError: true }
	}

	public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("Uncaught error:", error, errorInfo)
	}

	// Clearing Console when ErrorBoundary Component isn't mounted any more (ex. When used In Portals)
	public componentWillUnmount(): void {
		console.clear()
	}

	public render() {
		if (this.state.hasError)
			return <ErrorCard className={this.props.className} onClick={() => window.location.reload()} />

		return this.props.children
	}
}

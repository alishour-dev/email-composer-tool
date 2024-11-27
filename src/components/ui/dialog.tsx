"use client"

import { cn } from "@/utils/cn"
import {
	Close,
	Content,
	Description,
	type DialogContentProps,
	type DialogOverlayProps,
	type DialogPortalProps,
	type DialogProps,
	type DialogTriggerProps,
	Overlay,
	Portal,
	Dialog as RootDialog,
	Title,
	Trigger
} from "@radix-ui/react-dialog"
import { forwardRef, useState } from "react"
import { LuX } from "react-icons/lu"

export { DialogClose } from "@radix-ui/react-dialog"

export const Dialog = ({
	children,
	contentProps,
	overlayProps,
	portalProps,
	triggerProps,
	withCloseBtn,
	...rootDialogProps
}: {
	children: (closeDialog: () => void) => JSX.Element
	contentProps?: DialogContentProps
	overlayProps?: DialogOverlayProps
	portalProps?: DialogPortalProps
	triggerProps?: DialogTriggerProps
	withCloseBtn?: boolean
} & Omit<DialogProps, "children">) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<RootDialog onOpenChange={setIsOpen} open={isOpen} {...rootDialogProps}>
			<Trigger {...triggerProps} />

			<Portal {...portalProps}>
				<Overlay
					{...overlayProps}
					className={cn(
						"fixed inset-0 z-50 bg-white/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:bg-slate-950/80",
						overlayProps?.className
					)}
				/>

				<Content
					{...contentProps}
					className={cn(
						"fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] dark:border-slate-800 dark:bg-slate-950 sm:rounded-lg md:w-full",
						contentProps?.className
					)}>
					{children(() => setIsOpen(false))}

					{withCloseBtn && (
						<Close className='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 data-[state=open]:text-slate-500 dark:ring-offset-slate-950 dark:focus:ring-slate-300 dark:data-[state=open]:bg-slate-800 dark:data-[state=open]:text-slate-400'>
							<LuX className='h-4 w-4' />
							<span className='sr-only'>Close</span>
						</Close>
					)}
				</Content>
			</Portal>
		</RootDialog>
	)
}

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
)

DialogHeader.displayName = "DialogHeader"

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
)

DialogFooter.displayName = "DialogFooter"

export const DialogTitle = forwardRef<React.ElementRef<typeof Title>, React.ComponentPropsWithoutRef<typeof Title>>(
	({ className, ...props }, ref) => (
		<Title className={cn("text-lg font-semibold leading-none tracking-tight", className)} ref={ref} {...props} />
	)
)

DialogTitle.displayName = Title.displayName

export const DialogDescription = forwardRef<
	React.ElementRef<typeof Description>,
	React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => (
	<Description className={cn("text-sm text-slate-500 dark:text-slate-400", className)} ref={ref} {...props} />
))

DialogDescription.displayName = Description.displayName

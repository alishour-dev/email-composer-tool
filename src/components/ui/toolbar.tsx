import { cn } from "@/utils/cn"
import { Button, ToggleItem as Item, Root } from "@radix-ui/react-toolbar"
import { forwardRef } from "react"

export { Separator, ToggleGroup } from "@radix-ui/react-toolbar"

export const Toolbar = ({ children, className, ...props }: React.ComponentProps<typeof Root>) => (
	<Root
		className={cn(
			"glass flex w-full min-w-max overflow-hidden rounded-md bg-opacity-30 shadow-md ring-1 ring-gray-200",
			className
		)}
		{...props}>
		{children}
	</Root>
)

export const ToggleItem = forwardRef<React.ElementRef<typeof Item>, React.ComponentPropsWithoutRef<typeof Item>>(
	({ children, className, ...props }, ref) => (
		<Item className={cn(btnClassName, className)} ref={ref} {...props}>
			{children}
		</Item>
	)
)

export const ToolbarButton = forwardRef<
	React.ElementRef<typeof Button>,
	{ active?: boolean } & React.ComponentPropsWithoutRef<typeof Button>
>(({ active, className, type = "button", ...props }, ref) => (
	<Button ref={ref} type={type} {...props} className={cn(btnClassName, className)} data-state={active} />
))

Toolbar.displayName = "Toolbar"
ToggleItem.displayName = "ToggleItem"
ToolbarButton.displayName = "ToolbarButton"

const btnClassName =
	"inline-flex flex-shrink-0 flex-grow-0 basis-auto items-center justify-center bg-white bg-opacity-70 text-base leading-none text-gray-600 outline-none ring-0 transition-all duration-300 ease-in-out hover:bg-indigo-100 hover:text-indigo-700 focus:relative focus:ring-2 focus:ring-indigo-300 data-[state=true]:bg-indigo-200 data-[state=true]:text-indigo-800 data-[state=on]:bg-indigo-200 data-[state=on]:text-indigo-800 disabled:pointer-events-none disabled:opacity-30"

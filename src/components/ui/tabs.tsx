"use client"

import { cn } from "@/utils/cn"
import { Content, List, Trigger } from "@radix-ui/react-tabs"
import { forwardRef } from "react"

export { Root as Tabs } from "@radix-ui/react-tabs"

export const TabsList = forwardRef<React.ElementRef<typeof List>, React.ComponentPropsWithoutRef<typeof List>>(
	({ className, ...props }, ref) => (
		<List
			className={cn(
				"inline-flex h-10 items-center justify-center rounded-md bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
)

export const TabsTrigger = forwardRef<React.ElementRef<typeof Trigger>, React.ComponentPropsWithoutRef<typeof Trigger>>(
	({ className, ...props }, ref) => (
		<Trigger
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
)

export const TabsContent = forwardRef<React.ElementRef<typeof Content>, React.ComponentPropsWithoutRef<typeof Content>>(
	({ className, ...props }, ref) => (
		<Content
			className={cn(
				"mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
)

TabsList.displayName = List.displayName
TabsTrigger.displayName = Trigger.displayName
TabsContent.displayName = Content.displayName

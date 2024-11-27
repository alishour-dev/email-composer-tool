import { Button } from "@/components/ui/button"
import { cn } from "@/utils/cn"
import { RxReload } from "react-icons/rx"

interface ErrorCardProps {
	className?: string
	onClick: () => void
}

export const ErrorCard = ({ className, onClick }: ErrorCardProps) => (
	<div className={cn("flex h-full w-full items-center justify-center", className)}>
		<div className='flex !h-max w-max max-w-md flex-col items-center justify-center gap-4 rounded-md border border-red-800 bg-[rgba(255,0,0,0.03)] p-4'>
			<h1 className='text-center text-xl font-bold text-red-700'>Something Went Wrong!</h1>
			<Button className='bg-red-700 p-3 text-sm' onClick={onClick} size='icon' title='reload'>
				<RxReload />
			</Button>
		</div>
	</div>
)

"use client"

import { Toolbar, ToolbarButton } from "@/components/ui/toolbar"
import { FILE_ATTACHMENTS_MIME_TYPES } from "@/constants"
import { useEmailContext } from "@/context/email/emailContext"
import { validateFiles } from "@/utils/validateFiles"
import { memo } from "react"
import { RiAttachment2 } from "react-icons/ri"

interface MediaToolsProps {
	toggleTools: React.Dispatch<React.SetStateAction<Record<"showBcc" | "showCc", boolean>>>
}

export const MediaTools = memo<MediaToolsProps>(({ toggleTools }) => {
	const { attachments, dispatch } = useEmailContext()

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newFiles = e.target?.files

		if (!newFiles?.length) return

		// Merging all files --> Previously uploaded ones + newly uploaded ones
		const allFiles = [...attachments, ...Array(newFiles)]

		// returns validated and accepted files to be added
		const payload = validateFiles(allFiles as File[], FILE_ATTACHMENTS_MIME_TYPES)

		dispatch({ payload, type: "UPDATE_ATTACHMENTS" })
	}

	return (
		<Toolbar aria-label='Email tools' className='max-w-max ring-indigo-50'>
			<ToolbarButton className={buttonClassName} title='Attach File'>
				<span className='sr-only'>Attach Files</span>
				<label className='cursor-[inherit]' htmlFor='attachments-input'>
					<RiAttachment2 className='pointer-events-none' />
				</label>
				<input
					accept={FILE_ATTACHMENTS_MIME_TYPES.join(", ")}
					className='hidden'
					id='attachments-input'
					multiple
					onChange={onChange}
					type='file'
				/>
			</ToolbarButton>
			<ToolbarButton
				className={buttonClassName}
				onClick={() => toggleTools((prev) => ({ ...prev, showCc: !prev.showCc }))}
				title='add cc recipients'>
				CC
				<span className='sr-only'>Add cc recipients</span>
			</ToolbarButton>
			<ToolbarButton
				className={buttonClassName}
				onClick={() => toggleTools((prev) => ({ ...prev, showBcc: !prev.showBcc }))}
				title='add bcc recipients'>
				BCC
				<span className='sr-only'>Add bcc recipients</span>
			</ToolbarButton>
		</Toolbar>
	)
})

MediaTools.displayName = "MediaTools"

const buttonClassName = "p-2 border-0 border-e border-gray-200 last:border-0 px-3 !ring-0"

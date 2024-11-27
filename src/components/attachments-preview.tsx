"use client"

import { FilePreview, type FileType } from "@/components/file-preview"
import { ImagePreview } from "@/components/image-preview"
import { Button } from "@/components/ui/button"
import { IMAGE_MIME_TYPES } from "@/constants"
import { useEmailContext } from "@/context/email/emailContext"
import { formatBytes } from "@/utils/formatBytes"
import { LuX } from "react-icons/lu"

export const AttachmentsPreview = () => {
	const { attachments, dispatch } = useEmailContext()

	return (
		<div className='overflow-y-hidden'>
			<p className='mb-0.5 text-xs text-gray-800 sm:text-sm'>Attachments:</p>
			<div className='gradient-mask-b-9 flex h-full max-h-full w-full flex-col gap-1.5 overflow-y-auto rounded-md p-2 pb-8'>
				{attachments?.map((file, payload) => (
					<div
						className='relative flex w-full gap-2 rounded-md border border-indigo-600 bg-indigo-300 bg-opacity-20 p-1'
						key={file?.name + "-" + payload}>
						{IMAGE_MIME_TYPES?.includes(file.type as (typeof IMAGE_MIME_TYPES)[number]) ? (
							<ImagePreview className='max-w-[48px]' file={file} height={50} width={50} />
						) : (
							<FilePreview type={file.type as FileType} />
						)}

						<div className='flex h-full w-full max-w-[85%] flex-col gap-0.5 overflow-hidden text-ellipsis whitespace-nowrap text-xs'>
							<div className='flex w-full items-center gap-1'>
								<p className='font-bold text-indigo-800'>Name: </p>
								<p className='truncate'>{file?.name || "Uploaded File"}</p>
							</div>
							<div className='flex w-full items-center gap-1'>
								<p className='font-bold text-indigo-800'>Size: </p>
								<p className='truncate'>{formatBytes(file.size, 2)}</p>
							</div>
						</div>

						<Button
							className='absolute -right-1 -top-1 text-sm hover:text-indigo-100'
							onClick={() => dispatch({ payload, type: "REMOVE_ATTACHMENTS" })}
							size='icon'>
							<LuX />
						</Button>
					</div>
				))}
			</div>
		</div>
	)
}

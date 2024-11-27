"use client"

import { IMAGE_MIME_TYPES } from "@/constants"
import { validateFiles } from "@/utils/validateFiles"
import { memo, useCallback } from "react"
import { LuX } from "react-icons/lu"

import type { Tab } from "."

import { ImagePreview } from "../image-preview"
import { Button } from "../ui/button"
import { TabsContent } from "../ui/tabs"

interface ImagesTabProps {
	images: File[]
	label: string
	setImages: React.Dispatch<React.SetStateAction<File[]>>
	tabValue: Tab
}

export const ImagesTab = memo(({ images, label, setImages, tabValue }: ImagesTabProps) => {
	const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newFiles = e.target?.files as File[] | FileList

			if (!newFiles?.length) return

			// merging all files --> previously uploaded + newly uploaded
			const allNewFiles = [...images, ...(newFiles as File[])] as File[]

			// Only returns accepted files after validation
			const acceptedFiles = validateFiles(allNewFiles, IMAGE_MIME_TYPES)

			// Stores newly uploaded and validated files
			setImages(acceptedFiles)
		},
		[images, setImages]
	)

	return (
		<TabsContent value={tabValue}>
			<p className='mb-4 text-base text-gray-700'>{label}</p>

			<div className='flex w-full max-w-[420px] overflow-hidden rounded-md shadow-sm'>
				<label
					className='cursor-pointer bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out will-change-transform hover:border-indigo-400 hover:bg-opacity-80 focus:border-indigo-400 active:scale-[0.98] active:border-indigo-400'
					htmlFor={tabValue}>
					Choose Files
				</label>
				<div
					className='flex-1 truncate rounded-r-md border border-indigo-200 bg-indigo-50 px-2 text-sm leading-[36px] text-indigo-800 text-opacity-70 transition-all duration-300 ease-in-out data-[active=true]:border-indigo-400'
					data-active={!!images?.length}>
					{!images?.length
						? "No Images Selected"
						: images?.length > 1
							? `${images?.length} Images selected`
							: images[0]?.name}
				</div>
				<input
					accept={IMAGE_MIME_TYPES?.join(", ")}
					className='hidden'
					id={tabValue}
					multiple
					onChange={onChange}
					type='file'
				/>
			</div>

			<p className='ml-1 mt-1.5 text-xs text-gray-500 dark:text-gray-300' id='file_input_help'>
				SVG, PNG, JPG or GIF (MAX. 800x400px).
			</p>

			{!!images?.length && (
				<div className='flex h-max max-h-[250px] w-full max-w-full flex-1 flex-wrap gap-4 overflow-y-auto p-4'>
					{images?.map((file, idx) => (
						<div className='relative' key={file?.name + "-" + idx}>
							<ImagePreview file={file} height={100} width={100} />

							<Button
								className='absolute -right-1 -top-1 h-max w-max bg-indigo-500 p-1 text-xs'
								onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
								size='icon'>
								<LuX />
								<span className='sr-only'>Close</span>
							</Button>
						</div>
					))}
				</div>
			)}
		</TabsContent>
	)
})

ImagesTab.displayName = "ImagesTab"

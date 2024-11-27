"use client"

import { externalImgUrlsRegex } from "@/constants"
import { useEmailContext } from "@/context/email/emailContext"
import { ImageOptions } from "@/types"
import { useCallback, useState } from "react"

import { Button } from "../ui/button"
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { ImagesTab } from "./images-tab"

export type Tab = "attachments" | "inline" | "url"

export const ImagesDialog = ({
	addImgToHtml,
	closeDialog
}: {
	addImgToHtml: (img: ImageOptions) => void
	closeDialog: () => void
}) => {
	const [selectedTab, setSelectedTab] = useState<Tab>("inline")

	const [images, setImages] = useState<File[]>([])

	const [externalLink, setExternalLink] = useState("")

	const { dispatch } = useEmailContext()

	const handleSave = useCallback(() => {
		if (selectedTab === "attachments") {
			dispatch({ payload: images, type: "UPDATE_ATTACHMENTS" })
		} else if (selectedTab === "inline") {
			// Adding inline images to payload to be mapped with images in markup by server
			dispatch({ payload: images, type: "UPDATE_INLINE" })

			// Adding inline images to markup
			images.forEach((img) => addImgToHtml({ alt: img?.name, src: URL.createObjectURL(img) }))
		} else {
			// Adding external url images to markup
			addImgToHtml({ src: externalLink })
		}

		setExternalLink("")
		setImages([])
		closeDialog()
	}, [images, selectedTab, dispatch, addImgToHtml, externalLink, closeDialog])

	return (
		<>
			<DialogHeader>
				<DialogTitle>Adding Images</DialogTitle>
			</DialogHeader>
			<Tabs
				className='flex w-full flex-col gap-4'
				defaultValue={selectedTab}
				onValueChange={(tab) => setSelectedTab(tab as Tab)}>
				<TabsList className='-ml-1.5 w-max'>
					<TabsTrigger value='inline'>Inline</TabsTrigger>
					<TabsTrigger value='attachments'>Attachments</TabsTrigger>
					<TabsTrigger value='url'>External URL</TabsTrigger>
				</TabsList>

				<ImagesTab
					images={images}
					label="Selected Images will be added as Inline Images in the Email's content"
					setImages={setImages}
					tabValue='inline'
				/>
				<ImagesTab
					images={images}
					label="Selected Images will be attached within the Email's attached content"
					setImages={setImages}
					tabValue='attachments'
				/>
				<TabsContent value='url'>
					<Input
						className='max-w-sm !flex-col'
						id='external-url'
						label='External Image URL'
						name='external-url'
						onChange={({ target: { value } }) => setExternalLink(value)}
						placeholder='Add a valid image url here'
						spellCheck
						type='url'
						value={externalLink}
					/>
				</TabsContent>
			</Tabs>
			<DialogFooter>
				<Button
					disabled={
						(selectedTab === "url" && (!externalLink?.length || !externalImgUrlsRegex.test(externalLink))) ||
						(["attachments", "inline"]?.includes(selectedTab) && !images?.length)
					}
					onClick={handleSave}>
					Save changes
				</Button>
			</DialogFooter>
		</>
	)
}

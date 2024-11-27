"use client"

import type { Editor } from "@tiptap/react"

import { ImagesDialog } from "@/components/images-dialog"
import { Dialog } from "@/components/ui/dialog"
import { Separator, ToggleGroup, ToggleItem, Toolbar, ToolbarButton } from "@/components/ui/toolbar"
import { useEmailContext } from "@/context/email/emailContext"
import { appendOptionalArray } from "@/utils/formData"
import axios from "axios"
import { useCallback, useMemo } from "react"
import { toast } from "react-hot-toast"
import { BiCodeBlock } from "react-icons/bi"
import { FaList, FaListOl } from "react-icons/fa"
import { FiRotateCw as LucideRedo, FiRotateCcw as LucideUndo } from "react-icons/fi"
import { MdSend } from "react-icons/md"
import {
	RiCodeSSlashLine as RadixIconsCode,
	RiBold as RadixIconsFontBold,
	RiItalic as RadixIconsFontItalic,
	RiImageLine as RadixIconsImage,
	RiDoubleQuotesL as RadixIconsQuote,
	RiRulerLine as RadixIconsRulerHorizontal,
	RiStrikethrough as RadixIconsStrikethrough,
	RiAlignCenter as RadixIconsTextAlignCenter,
	RiAlignJustify as RadixIconsTextAlignJustify,
	RiAlignLeft as RadixIconsTextAlignLeft,
	RiAlignRight as RadixIconsTextAlignRight,
	RiUnderline as RadixIconsUnderline
} from "react-icons/ri"

const API = "http://172.16.181.32:8090/send"

export const TipTapToolbar = ({ editor }: { editor: Editor }) => {
	const {
		attachments,
		emailRequest,
		// inline,
		onReset
	} = useEmailContext()

	const isInvalid = !emailRequest?.recipient?.length || !emailRequest?.subject

	const activeAlignment = useMemo(
		() =>
			editor.isActive({ textAlign: "right" })
				? "right"
				: editor.isActive({ textAlign: "center" })
					? "center"
					: editor.isActive({ textAlign: "justify" })
						? "justify"
						: "left",
		[editor]
	)

	const handleSubmit = useCallback(async () => {
		if (isInvalid) return toast.error("Please Add recipients's email, subject, email content, and upload a file.")

		const body = editor.getHTML()

		const formData = new FormData()

		const blob = new Blob([JSON.stringify({ ...emailRequest, body })], { type: "application/json" })

		formData.append("emailRequest", blob)

		appendOptionalArray(formData, "attachments", attachments)
		// appendOptionalArray(formData, "inline", inline)

		const promise = axios.post(API, formData, { headers: { "Content-Type": "multipart/form-data" }, timeout: 5000 })

		toast.promise(
			promise,
			{
				...toastMsgs,
				success: () => {
					onReset()
					editor.commands.clearContent()

					return <>Email Sent!</>
				}
			},
			{ style: { minWidth: "250px" } }
		)
	}, [onReset, editor, emailRequest, isInvalid, attachments])

	return (
		<Toolbar aria-label='Formatting options' className='p-[10px]'>
			<ToggleGroup aria-label='Text formatting' className='w-max' type='multiple'>
				<ToolbarButton
					active={editor.isActive("bold")}
					aria-label='Bold'
					className={buttonClassName}
					disabled={!editor.can().chain().focus().toggleBold().run()}
					onClick={() => editor.chain().focus().toggleBold().run()}
					title='Bold'>
					<RadixIconsFontBold />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("underline")}
					aria-label='Italic'
					className={buttonClassName}
					disabled={!editor.can().chain().focus().toggleUnderline().run()}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
					title='Italic'>
					<RadixIconsUnderline />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("italic")}
					aria-label='Italic'
					className={buttonClassName}
					disabled={!editor.can().chain().focus().toggleItalic().run()}
					onClick={() => editor.chain().focus().toggleItalic().run()}
					title='Italic'>
					<RadixIconsFontItalic />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("strike")}
					aria-label='Strike through'
					className={buttonClassName}
					disabled={!editor.can().chain().focus().toggleStrike().run()}
					onClick={() => editor.chain().focus().toggleStrike().run()}
					title='Strike through'>
					<RadixIconsStrikethrough />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("code")}
					aria-label='Code'
					className={buttonClassName}
					disabled={!editor.can().chain().focus().toggleCode().run()}
					onClick={() => editor.chain().focus().toggleCode().run()}
					title='Code'>
					<RadixIconsCode />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("bulletList")}
					aria-label='Bullet List'
					className={buttonClassName}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
					title='Bullet List'>
					<FaList />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("orderedList")}
					aria-label='Ordered List'
					className={buttonClassName}
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
					title='Ordered List'>
					<FaListOl />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("blockquote")}
					aria-label='Block quote'
					className={buttonClassName}
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
					title='Block quote'>
					<RadixIconsQuote />
				</ToolbarButton>
				<ToolbarButton
					active={editor.isActive("codeBlock")}
					aria-label='Code Block'
					className={buttonClassName}
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
					title='Code Block'>
					<BiCodeBlock />
				</ToolbarButton>
				<ToolbarButton
					aria-label='Horizontal rule'
					className={buttonClassName}
					disabled={!editor.getHTML()?.length || editor.getHTML() === "<p></p>"}
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
					title='Horizontal rule'>
					<RadixIconsRulerHorizontal />
				</ToolbarButton>
			</ToggleGroup>

			<Separator className='mx-[10px] w-[1px] bg-indigo-200' />

			{/* ALIGNMENT  */}
			<ToggleGroup
				aria-label='Text alignment'
				defaultValue='left'
				onValueChange={(v = "left") => editor.chain().focus().setTextAlign(v).run()}
				type='single'
				value={activeAlignment}>
				<ToggleItem aria-label='Left aligned' className={buttonClassName} title='Left aligned' value='left'>
					<RadixIconsTextAlignLeft />
				</ToggleItem>
				<ToggleItem aria-label='Center aligned' className={buttonClassName} title='Center aligned' value='center'>
					<RadixIconsTextAlignCenter />
				</ToggleItem>
				<ToggleItem aria-label='Right aligned' className={buttonClassName} title='Right aligned' value='right'>
					<RadixIconsTextAlignRight />
				</ToggleItem>
				<ToggleItem aria-label='Justify aligned' className={buttonClassName} title='Justify aligned' value='justify'>
					<RadixIconsTextAlignJustify />
				</ToggleItem>
			</ToggleGroup>

			<Separator className='mx-[10px] w-[1px] bg-indigo-200' />

			{/* UNDO / REDO  */}
			<ToggleGroup aria-label='Text Correction actions' type='multiple'>
				<ToolbarButton
					aria-label='Undo'
					className={buttonClassName}
					disabled={!editor.can().chain().focus().undo().run()}
					onClick={() => editor.chain().focus().undo().run()}
					title='Undo'>
					<LucideUndo />
				</ToolbarButton>
				<ToolbarButton
					aria-label='Redo'
					className={buttonClassName}
					disabled={!editor.can().chain().focus().redo().run()}
					onClick={() => editor.chain().focus().redo().run()}
					title='Redo'>
					<LucideRedo />
				</ToolbarButton>
			</ToggleGroup>

			<Separator className='mx-[10px] w-[1px] bg-indigo-200' />

			{/* ADDING MEDIA  */}
			<Dialog
				contentProps={{ className: "h-[60%] grid-rows-[max-content_auto_max-content] sm:max-w-4xl" }}
				triggerProps={{
					asChild: true,
					children: (
						<ToolbarButton aria-label='Add Image(s)' className={buttonClassName} title='Add Image(s)'>
							<RadixIconsImage />
						</ToolbarButton>
					)
				}}>
				{(closeDialog) => (
					<ImagesDialog addImgToHtml={(img) => editor.chain().focus().setImage(img).run()} closeDialog={closeDialog} />
				)}
			</Dialog>

			<ToolbarButton
				className='ml-auto flex select-none items-center justify-center gap-2 truncate rounded-[4px] border-0 !bg-indigo-500 px-2 py-1 text-xs font-semibold !text-white shadow-sm transition-all duration-300 ease-in-out will-change-transform hover:!bg-opacity-90 focus:outline-2 focus:outline-indigo-500 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-30 [&>svg]:h-[16px] [&>svg]:text-current'
				disabled={isInvalid}
				onClick={handleSubmit}
				type='button'>
				<span>Send</span>
				<MdSend />
			</ToolbarButton>
		</Toolbar>
	)
}

const buttonClassName = "ml-1 rounded p-2 first:ml-0"

// Used with the provide default response messages for the promise toast
const toastMsgs = {
	error: <b>Error. Could not be sent.</b>,
	loading: "Sending..."
}

// To Configure Text colors
// <button
//     onClick={() => editor.chain().focus().setColor('#958DF1').run()}
// 	className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
// >
//     purple
// </button>

// 	// const addedContentForBody = `<img width='300' src={${newFile.name}} />`

// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// const videoContent = `
// <video width="320" height="240">
// 	<source src="cid:video.mp4" type="video/mp4">
// 	Your browser does not support the video tag.
// </video>
// `
// const videoContent2 = `
// <video autoplay="autoplay" loop="loop" clipID="mailtrap1" poster="https://media1.giphy.com/media/XbBJTYS9hDeUFpTxwU/giphy.gif?cid=790b76111d76dc877cd0cb1d30b7638db65fe331b3d202ce&rid=giphy.gif&ct=g"
// 	controls="controls"
// 	src="https://cdn.dribbble.com/users/1447183/videos/27058/netcore_2.mp4"
// 	style="mso-hide: all;display:block;width: 100%;height: auto;max-height: none;">
// </video>
// `
// <video width="320" height="240" controls>
//   <source src="https://example.com/videos/your_video.mp4" type="video/mp4">
//   Your browser does not support the video tag.
// </video>
// <p>If you're unable to view the video, you can <a href="https://example.com/videos/your_video.mp4">download it here</a>.</p>
// ----------------------------------------------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------------------------------------------------------------
// // RELATED TO INLINE VIDEOS ADDITION
// <Button title='Attach Inline File(s)' type='button' className={`relative ${buttonClassName}`}>
// 	<RadixIconsVideo className='pointer-events-none' />
// 	<span className='sr-only'>Attach Inline File(s)</span>
// 	<label className='absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0'>
// 		<input
// 			type='file'
// 			// multiple
// 			accept='video/mp4,video/x-m4v,video/*'
// 			onChange={addInlineVideo}
// 			className='hidden'
// 		/>
// 	</label>
// </Button>
// const addInlineVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
// 	const video = e.target?.files

// 	if (!video?.length) return

// 	console.log(video[0])
// 	dispatch({ type: "ADD_INLINE", payload: [video[0]] })
// }

// const addVideo = useCallback(() => {
// 	const videoSrc = editor.getAttributes("video").src
// 	console.log(videoSrc)

// 	const video = window.prompt("Video URL", videoSrc)

// 	// cancelled
// 	if (video === null) return

// 	// empty
// 	if (video === "") {
// 		editor.isActive("video") ? editor.commands.deleteSelection() : false
// 		return
// 	}

// 	// update video
// 	const srcCheck = video.match(/src="(?<src>.+?)"/) // get the src value from embed code if all pasted in
// 	const src = srcCheck ? srcCheck?.groups?.src : video // use src or if just url in input use that

// 	editor.chain().focus().insertContent(`<video src="${src}"></video>`).run()
// }, [editor])

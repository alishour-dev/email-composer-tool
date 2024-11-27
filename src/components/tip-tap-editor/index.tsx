"use client"

import { ErrorBoundary } from "@/components/ui/error-boundary"
import ImageExtension from "@/lib/tiptap/ImageExtension"
import { Color } from "@tiptap/extension-color"
import ListItem from "@tiptap/extension-list-item"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { TipTapToolbar } from "./tip-tap-toolbar"

const extensions = [
	Color.configure({ types: [TextStyle.name, ListItem.name] }),
	TextAlign.configure({ types: ["heading", "paragraph", ListItem.name] }),
	ImageExtension,
	Underline,
	TextStyle,
	StarterKit.configure({
		blockquote: {
			HTMLAttributes: {
				style:
					"padding: 8px 24px; border-left: 4px solid rgba(99, 102, 241, 0.8); background-color: rgba(99, 102, 241, 0.05); width: max-content"
			}
		},
		bulletList: {
			HTMLAttributes: {
				style: "list-style-type: disc; padding-left: 24px"
			}
		},
		code: {
			HTMLAttributes: {
				style: "background-color: rgba(255, 74, 83, 0.1); color: #990505"
			}
		},
		codeBlock: {
			HTMLAttributes: {
				style:
					"background: #0D0D0D; color: #FFF; font-family: 'JetBrainsMono', monospace; padding: 0.75rem 1rem; border-radius: 0.5rem; font-size: 0.8rem"
			}
		},
		horizontalRule: {
			HTMLAttributes: {
				style: "border: none; border-top: 2px solid rgba(99, 102, 241, 0.2); margin: 2rem 0;"
			}
		},
		orderedList: {
			HTMLAttributes: {
				style: "list-style-type: upper-greek; padding-left: 24px"
			}
		}
	})
]

export const TipTapEditor = () => {
	const editor = useEditor({ content: `<p>Hello World! 🌎️</p>`, extensions, immediatelyRender: false })

	if (!editor) return

	return (
		<div className='glass flex h-full w-full flex-col gap-4 overflow-hidden rounded-md p-2 md:row-span-2 [&>div:nth-of-type(2)>div]:h-full [&>div:nth-of-type(2)>div]:!outline-none [&>div:nth-of-type(2)]:flex-1'>
			<TipTapToolbar editor={editor} />

			<ErrorBoundary>
				<EditorContent className='overflow-y-auto p-2' editor={editor} />
			</ErrorBoundary>
		</div>
	)
}

// editorProps: {
// handlePaste: (editoView, event, slice) => {
// 	console.log(editoView, event, slice)

// 	editoView

// 	return false
// },
// handleDOMEvents: {
// 	paste(view: EditorView, event: ClipboardEvent): boolean {
// 		const $context = view.state.selection.$from
// 		console.log("view state selection from: ", $context)

// 		console.log("Context parent type name: ", $context.parent.type.name)

// 		const schema = view.state.schema
// 		console.log(schema)

// 		const text = event.clipboardData
// 		console.log(text)

// 		if (!text) return false

// 		const textNode = schema.text(text.replace(/\r\n?/g, "\n"))
// 		const resultSlice: Slice = new Slice(Fragment.from(textNode), 0, 0)
// 		const tr = view.state.tr.replaceSelection(resultSlice)

// 		view.dispatch(tr.scrollIntoView().setMeta("paste", true).setMeta("uiEvent", "paste"))
// 		event.preventDefault()

// 		return true
// 	},
// },

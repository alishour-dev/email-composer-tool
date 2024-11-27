import type { ImageOptions, ImgSize } from "@/types"

import { cn } from "@/utils/cn"
import Image from "@tiptap/extension-image"
import { mergeAttributes, type NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react"
import { Resizable, type ResizeCallback } from "re-resizable"
import { useCallback, useState } from "react"

declare module "@tiptap/react" {
	interface Commands<ReturnType> {
		ImageExtension: {
			setImage: (options: ImageOptions) => ReturnType
		}
	}
}

const ImageExtension = Image.extend({
	addAttributes() {
		return {
			alt: {
				default: "Image alt text",
				renderHTML: ({ alt }) => ({ alt })
			},
			height: {
				default: "auto",
				renderHTML: ({ height }) => ({ height })
			},
			src: {
				default: null,
				renderHTML: ({ src }) => ({ src })
			},
			style: { default: null, renderHTML: () => ({ style: "max-width: 100%; height: auto" }) },
			width: {
				default: "100%",
				renderHTML: ({ width }) => ({ width })
			}
		}
	},
	addNodeView() {
		return ReactNodeViewRenderer(ImageNode)
	},
	atom: true, // is a single unit
	draggable: false,
	group: "block", // belongs to the 'block' group of extensions
	name: "image",
	parseHTML() {
		return [{ tag: "img" }]
	},

	renderHTML({ HTMLAttributes }) {
		return ["img", mergeAttributes(HTMLAttributes)]
	},

	selectable: true
})

export default ImageExtension

function ImageNode({ node: { attrs }, updateAttributes }: NodeViewProps) {
	const [size, setSize] = useState<ImgSize>({ height: 0, width: 0 })

	const { height, width } = size

	const { alt } = attrs

	const onEditAlt = useCallback(() => {
		const newAlt = prompt("Set alt text:", alt || "")

		// If Promt was cancelled, falls back to old alt
		updateAttributes({ alt: newAlt || alt })
	}, [alt, updateAttributes])

	const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const { naturalHeight: height, naturalWidth: width } = event.currentTarget

		setSize({ height, width })
	}, [])

	const onResizeStop: ResizeCallback = useCallback(
		(_, __, ___, d) => {
			const newSize: ImgSize = { height: height + d.height, width: width + d.width }

			updateAttributes(newSize)
			setSize(newSize)
		},
		[width, height, updateAttributes]
	)

	return (
		<NodeViewWrapper
			className={cn("relative h-max w-max rounded-md shadow-[0_0_5px_0_rgba(0,0,0,0.2)]")}
			// data-drag-handle
		>
			<Resizable lockAspectRatio onResizeStop={onResizeStop} size={size}>
				{/* eslint-disable-next-line  */}
				<img {...attrs} onLoad={handleImageLoad} width={width} height={height} className='h-auto max-w-full' />
			</Resizable>

			<span className='absolute bottom-2 right-2 inline-flex max-w-[calc(100%-20px)] items-center gap-1 overflow-hidden rounded-md bg-white bg-opacity-50 px-2 py-0.5 text-black shadow-sm backdrop-blur-md'>
				<span className={cn("font-bold text-[#961f1f]", !!alt?.length && "text-[#19961b]")}>
					{alt?.length ? `✔` : `!`}
				</span>

				<span className='flex-1 overflow-hidden truncate text-xs'>
					{alt?.length ? `Alt text: '${alt}'.` : "Alt text missing."}
				</span>

				<button
					className='border-0 bg-transparent text-xs font-bold underline outline-none'
					onClick={onEditAlt}
					type='button'>
					Edit
				</button>
			</span>
		</NodeViewWrapper>
	)
}

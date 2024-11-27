"use client"

import { cn } from "@/utils/cn"
import Image, { ImageProps } from "next/image"
import { memo } from "react"

export const ImagePreview = memo(
	({ alt, className, file, ...props }: { alt?: string } & { file: File } & Omit<ImageProps, "alt" | "src">) => (
		<Image
			{...props}
			alt={alt || "Image Preview"}
			className={cn("aspect-[3/2] w-24 rounded-md border object-contain shadow-sm ring-1 ring-indigo-300", className)}
			src={URL.createObjectURL(file)}
		/>
	)
)

ImagePreview.displayName = "ImagePreview"

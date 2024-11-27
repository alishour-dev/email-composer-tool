import { FaFileAlt, FaFileArchive, FaFileCsv, FaFileExcel, FaFileImage, FaFileWord } from "react-icons/fa"
import { MdPictureAsPdf } from "react-icons/md"

const fileIconsMapper = {
	"application/pdf": MdPictureAsPdf,
	"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": FaFileExcel,
	"application/vnd.openxmlformats-officedocument.wordprocessingml.document": FaFileWord,
	"application/zip": FaFileArchive,
	"image/jpeg": FaFileImage,
	"image/png": FaFileImage,
	"text/csv": FaFileCsv,
	"text/plain": FaFileAlt
}

export type FileType = keyof typeof fileIconsMapper

export const FilePreview = ({ type }: { type: FileType }) => {
	const IconComponent = fileIconsMapper[type] || FaFileAlt

	return (
		<div className='aspect-[3/2] w-24 max-w-[48px] overflow-hidden rounded-md border object-contain shadow-sm ring-1 ring-indigo-300'>
			<IconComponent className='h-full w-full' />
		</div>
	)
}

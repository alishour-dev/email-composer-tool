import { toast } from "react-hot-toast"

/**
 * @description Validates @param newUploadedFiles based on @param acceptedMimeTypes and @returns a list of accepted files
 * @param newUploadedFiles Uploaded files to be validated
 * @param acceptedMimeTypes List of MIME types to be checked against
 * @returns newly validated List of files
 */
export const validateFiles = (newUploadedFiles: File[], acceptedMimeTypes: string[]): File[] => {
	const acceptedFiles: File[] = []

	const duplicateFiles: File[] = []

	const unsupportedFiles: File[] = []

	// console.log("NEW UPLOADED FILES: ", newUploadedFiles)
	// console.log("acceptedMimeTypes: ", acceptedMimeTypes)

	for (const file of newUploadedFiles) {
		if (!acceptedMimeTypes.includes(file.type)) {
			unsupportedFiles.push(file)
		} else if (
			acceptedFiles.some((uploadedFile) => uploadedFile.name === file.name && uploadedFile.size === file.size)
		) {
			duplicateFiles.push(file)
		} else {
			acceptedFiles.push(file)
		}
	}

	let message = ""

	if (duplicateFiles.length > 0) {
		message += "Duplicated files were found & not added. "
	}

	if (unsupportedFiles.length > 0) {
		message += "Unsupported files were found & not added."
	}

	if (message?.length > 0) {
		toast.error(message, { id: "files-validation" })
	}

	return acceptedFiles
}

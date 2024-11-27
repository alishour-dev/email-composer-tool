/**
 * @description Using this function to append optional arrays to a formDatas, where, even though its an optional field
    it is still required to be present in the formData before being sent to the server
 * @param formData Form data used to be sent to the server
 * @param name name of the field to be appended to the @param formData
 * @param list Array of strings or Files to be appended to the @param formData
 * @returns null
 */
export const appendOptionalArray = (formData: FormData, name: string, list: File[] | string[]) => {
	if (!list?.length) {
		formData.append(name, "")

		return
	}

	for (const item of list) {
		formData.append(name, item)
	}
}

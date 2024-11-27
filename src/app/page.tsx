"use client"

import { AttachmentsPreview } from "@/components/attachments-preview"
import { MediaTools } from "@/components/media-tools"
import { Input } from "@/components/ui/input"
import { MultiInputField } from "@/components/ui/multiInputField"
import { useEmailContext } from "@/context/email/emailContext"
import dynamic from "next/dynamic"
import { useState } from "react"
import { LuLoader2 } from "react-icons/lu"

const Editor = dynamic(() => import("@/components/tip-tap-editor").then((mod) => mod.TipTapEditor), {
	loading: () => (
		<div className='flex h-full w-full items-center justify-center'>
			<LuLoader2 />
		</div>
	)
})

export default function Home() {
	const {
		attachments,
		dispatch,
		emailRequest: { bcc, cc, recipient, subject }
	} = useEmailContext()

	const [{ showBcc, showCc }, toggleTools] = useState({ showBcc: false, showCc: false })

	return (
		<form className='mx-auto flex h-full w-full max-w-screen-2xl flex-col gap-4 p-4 md:flex-row md:gap-4'>
			{/* Inputs field  */}
			<div className='glass flex h-full w-full max-w-full flex-col gap-2 rounded-md p-2 md:row-span-2 md:max-w-[250px] lg:max-w-[320px] xl:max-w-[420px]'>
				<div className='mb-4 flex h-max w-full flex-col items-start justify-between gap-2 lg:flex-row lg:gap-1'>
					<h1 className='w-max bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-base font-black text-transparent xl:text-xl'>
						Email Sending Tool
					</h1>
					<MediaTools toggleTools={toggleTools} />
				</div>
				<MultiInputField
					id='recepients'
					label='To'
					name='email'
					placeholder={!recipient?.length ? "Add recepient emails" : ""}
					setValues={(recipient) => dispatch({ payload: { recipient }, type: "UPDATE_EMAIL_REQUEST" })}
					type='email'
					values={recipient}
				/>

				<Input
					id='subject'
					label='Subject'
					name='subject'
					onChange={({ target: { value: subject } }) =>
						dispatch({ payload: { subject }, type: "UPDATE_EMAIL_REQUEST" })
					}
					placeholder='Add your subject'
					spellCheck
					type='text'
					value={subject}
				/>

				{showCc && (
					<MultiInputField
						id='ccEmails'
						label='CC'
						name='ccEmails'
						placeholder={!cc?.length ? "Add CC emails" : ""}
						setValues={(cc) => dispatch({ payload: { cc }, type: "UPDATE_EMAIL_REQUEST" })}
						type='email'
						values={cc}
					/>
				)}
				{showBcc && (
					<MultiInputField
						id='bccEmails'
						label='BCC'
						name='bccEmails'
						placeholder={!bcc?.length ? "Add BCC emails" : ""}
						setValues={(bcc) => dispatch({ payload: { bcc }, type: "UPDATE_EMAIL_REQUEST" })}
						type='email'
						values={bcc}
					/>
				)}

				{!!attachments?.length && <AttachmentsPreview />}
			</div>

			<Editor />
		</form>
	)
}

// import { NextResponse } from "next/server"
// // import nodemailer from "nodemailer"
// // import Mail from "nodemailer/lib/mailer"

// export async function POST(req: Request) {
// 	try {
// 		const data = await req.formData()

// 		const recipients = data.get("recipients")
// 		console.log(recipients)

// 		// const { recipients, subject, body } = data
// 		// const { BLUE_SMTP_AUTH, BLUE_SMTP_PASS, BLUE_SMTP_HOST } = process.env

// 		// // Creating a nodemailer transporter with our SMTP server config
// 		// const transporter = nodemailer.createTransport({
// 		// 	host: BLUE_SMTP_HOST,
// 		// 	port: 465,
// 		// 	secure: true,
// 		// 	auth: { user: BLUE_SMTP_AUTH, pass: BLUE_SMTP_PASS },
// 		// })

// 		// const htmlEmail: Mail<any>['options'] = {
// 		// 	from: BLUE_SMTP_AUTH,
// 		// 	to: recipients,
// 		// 	subject,
// 		// 	html: body,
// 		// 	attachments: [],
// 		// }

// 		// await transporter.sendMail(htmlEmail)
// 		return NextResponse.json("Message sent successfully")
// 	} catch (error: any) {
// 		console.log("An error occurred while sending emails:", error)
// 		return NextResponse.json(error?.message || "Oops, An error has occured! Please try again later.", { status: 500 })
// 	}
// }

export {}

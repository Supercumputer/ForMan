const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_USERNAME, EMAIL_PASSWORD } = process.env;

const sendEmail = async (email, subject, text, html) => {
	try {
		const transporter = nodemailer.createTransport({
			service: "gmail",
			auth: {
				user: EMAIL_USERNAME,
				pass: EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			from: EMAIL_USERNAME,
			to: email,
			subject: subject,
			text: text,
            html: html
		};

		await transporter.sendMail(mailOptions);

	} catch (error) {
		throw new Error("Error sending email: " + error.message);
	}
};

module.exports = sendEmail;
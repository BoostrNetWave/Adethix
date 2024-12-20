const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: `${process.env.MAILTRAP_USER}`,
        pass: `${process.env.MAILTRAP_PASS}`
    }
});

async function sendVerifyEmail(userName, email, verificationLink) {
    try {
        const info = await transporter.sendMail({
            from: `"Adethix" <${process.env.MAILTRAP_EMAIL}>`,
            to: email,
            subject: 'Verify Your Account',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verify Your Account</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }
                    .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; }
                    .header { text-align: center; color: #4CAF50; font-size: 24px; margin-bottom: 20px; }
                    .content { padding: 20px; font-size: 16px; line-height: 1.6; }
                    .button { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
                    .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #aaa; }
                    .footer a {font-size: 12px; color: #aaa; text-decoration: none; cursor: pointer}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Account Verification Required</div>
                    <div class="content">
                        <p>Hi ${userName},</p>
                        <p>Thank you for signing up for <strong>Adethix</strong>! To complete the registration, please verify your email address by clicking the button below.</p>
                        <a href="${verificationLink}" class="button">Verify My Account</a>
                        <p>If the button above doesn’t work, copy and paste the following link into your browser:</p>
                        <p><a href="${verificationLink}">${verificationLink}</a></p>
                        <p>Once you verify your email, your account will be sent to our admin team for review. You will be notified once your account is either approved or rejected.</p>
                        <p>If you have any questions, feel free to reach out to our support team.</p>
                    </div>
                    <div class="footer">The <a href="https://adethix.com/team">Adethix</a> Team</div>
                </div>
            </body>
            </html>
            `,
        });
        return;
    } catch (error) {
        console.log("Error while sending email verification email", error);
        return;
    }
}

module.exports = sendVerifyEmail;
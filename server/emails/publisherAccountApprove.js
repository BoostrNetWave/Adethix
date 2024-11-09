const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: `${process.env.MAILTRAP_USER}`,
        pass: `${process.env.MAILTRAP_PASS}`
    }
});

async function publisherAccountApprove(email, userName) {
    try {
        const info = await transporter.sendMail({
            from: `"Adethix" <${process.env.MAILTRAP_EMAIL}>`,
            to: email,
            subject: 'Your Account Has Been Approved!',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Publisher Account Approved</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }
                    .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; }
                    .header { text-align: center; color: #4CAF50; font-size: 24px; margin-bottom: 20px; }
                    .content { padding: 20px; font-size: 16px; line-height: 1.6; }
                    .button-container {display: flex; justify-content: center;}
                    .button { display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold; }
                    .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #aaa; }
                    .footer a {font-size: 12px; color: #aaa; text-decoration: none; cursor: pointer}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Welcome to Our Publisher Network!</div>
                    <div class="content">
                        <p>Hi ${userName},</p>
                        <p>We’re thrilled to let you know that your publisher account on <strong>Adethix</strong> has been approved!</p>
                        <p>You can now access your publisher dashboard, where you’ll be able to start placing ads on your website and manage ad performance in real-time.</p>
                        <p>To get started, please log in to your dashboard by clicking the button below:</p>
                        <div class="button-container">
                        <a href="https://adethix.com/publisher/dashboard" class="button">Go to Publisher Dashboard</a>
                        </div>
                        <p>If you have any questions, feel free to reach out to our support team.</p>
                        <p>We look forward to a successful partnership!</p>
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

module.exports = publisherAccountApprove;
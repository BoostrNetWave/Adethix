const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: `${process.env.MAILTRAP_USER}`,
        pass: `${process.env.MAILTRAP_PASS}`
    }
});

async function advertiserAccountReject(email, firstName) {
    try {
        const info = await transporter.sendMail({
            from: `"Adethix" <${process.env.MAILTRAP_EMAIL}>`,
            to: email,
            subject: 'Your Account Approval Status',
            html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Advertiser Account Status</title>
                <style>
                    body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; }
                    .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; }
                    .header { text-align: center; color: #FF5252; font-size: 24px; margin-bottom: 20px; }
                    .content { padding: 20px; font-size: 16px; line-height: 1.6; }
                    .footer { margin-top: 20px; text-align: center; font-size: 12px; color: #aaa; }
                    .footer a {font-size: 12px; color: #aaa; text-decoration: none; cursor: pointer}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">Account Approval Status</div>
                    <div class="content">
                        <p>Hi ${firstName},</p>
                        <p>Thank you for your interest in using <strong>Adethix</strong> to run ad campaigns.</p>
                        <p>After reviewing your application, we are unable to approve your advertiser account at this time. This decision was made after considering the criteria required to join our advertising network.</p>
                        <p>If you have questions about this decision or would like to discuss further, please feel free to reach out to our support team. You are also welcome to reapply in the future if your circumstances change.</p>
                        <p>We appreciate your understanding and thank you for considering us as your advertising partner.</p>
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

module.exports = advertiserAccountReject;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "live.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: `${process.env.MAILTRAP_USER}`,
        pass: `${process.env.MAILTRAP_PASS}`
    }
});

async function sendVerifyEmail(email, token) {
    try {
        const info = await transporter.sendMail({
            from: `"Adethix" <${process.env.MAILTRAP_EMAIL}>`,
            to: email,
            subject: "Please verify your email address",
            html: `<p><a href='${process.env.FRONTEND_BASE_URL}/auth/verify-email?token=${token}'>Click here</a> to verify your email<p/>
            
            <p>or paste this link in your browser</p>

            <p><a href='${process.env.FRONTEND_BASE_URL}/auth/verify-email?token=${token}'>${process.env.FRONTEND_BASE_URL}/auth/verify-email?token=${token}</a></p>
            
            <p>or enter the token</p>

            <p>${token}</p>`,
        });
        return;
    } catch (error) {
        console.log("Error while sending email verification email", error);
        return;
    }
}

module.exports = sendVerifyEmail;
const nodemailer = require("nodemailer");
require("dotenv").config();

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});


const sendEmail = async ({ name, email, message }) => {
  
    try {
        await transport.sendMail({
            from: `Karan Kashyap <${process.env.EMAIL_USER}>`,
            to: `email  ${email}`,
            subject: "Thank You!",
            // text: `Hello ${name},\n\nThank you for reaching out!\n\nYour Message: ${message}`,
            html: `
                <h1>Hello ${name},</h1>
                <h3>Email ${email},</h3>
                <p>Thank you for reaching out!</p>
                <p><strong>Your Message:</strong> ${message}</p>
                <p>Best Regards,</p>
                <p>Karan Kashyap</p>
            `
        });

        console.log(`✅ Email sent successfully to ${email}`);
    } catch (error) {
        console.error(" Error sending email:", error);
    }
};

const transportSubscribe = nodemailer.createTransport({
    service: "gmail", 
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});

const sendEmailSubscribe = async ({ subscribe }) => {
    try {
        await transportSubscribe.sendMail({
            from: `Karan Kashyap <${process.env.EMAIL_USER}>`,
            to: subscribe,
            subject: "Thank You!",
            html: `<p>Thank you for subscribing!</p><p>Best Regards,</p><p>Karan Kashyap</p>`
        });

        console.log(`✅ Email sent successfully to ${subscribe}`);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

module.exports = { sendEmail, sendEmailSubscribe };

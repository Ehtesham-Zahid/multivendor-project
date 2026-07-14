const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async ({ to, subject, html }) => {
  console.log("Email config:", {
    user: process.env.EMAIL_USER,
  });
  try {
    console.log("Creating transporter...");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    console.log("Transporter created. Verifying connection...");
    // Check connection
    try {
      await transporter.verify();
      console.log("SMTP connection verified.");
    } catch (err) {
      console.error("SMTP verify error:", err);
    }

    console.log("Preparing mail options:", { to, subject });

    const mailOptions = {
      from: `"SwiftCart" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    console.log("Sending email...");
    const sendResult = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Result:", sendResult);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

module.exports = sendMail;

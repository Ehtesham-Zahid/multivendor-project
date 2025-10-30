import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendMail = async (options) => {
  console.log("SMTP config:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    user: process.env.SMTP_MAIL,
  });
  try {
    console.log("Creating transporter...");
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "465"),
      secure: true,
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASS,
      },
    });
    console.log("Transporter created. Verifying connection...");
    // Check connection
    await transporter
      .verify()
      .then(() => console.log("SMTP connection verified."))
      .catch((err) => console.error("SMTP verify error:", err));

    const { to, subject, html } = options;
    console.log("Preparing mail options:", { to, subject });
    const mailOptions = {
      from: `\"SkillStack\" <${process.env.SMTP_MAIL}>`,
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

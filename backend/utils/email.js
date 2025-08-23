// const { Resend } = require("resend");

// const resend = new Resend(process.env.RESEND_API_KEY);

// const POST = async (details) => {
//   const { to, subject, html } = details;

//   try {
//     const data = await resend.emails.send({
//       from: "SwiftCart <swiftcart@resend.dev>", // or verified domain
//       to,
//       subject,
//       html,
//     });

//     return new Response(JSON.stringify({ success: true, data }), {
//       status: 200,
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ success: false, error }), {
//       status: 500,
//     });
//   }
// };

// module.exports = POST;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendMail(to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `"SwiftCart" <ehteshamzahid313@gmail.com>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendMail;

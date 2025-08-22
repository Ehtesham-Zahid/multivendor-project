const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const POST = async (details) => {
  const { to, subject, html } = details;

  try {
    const data = await resend.emails.send({
      from: "SwiftCart <swiftcart@resend.dev>", // or verified domain
      to,
      subject,
      html,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, error }), {
      status: 500,
    });
  }
};

module.exports = POST;

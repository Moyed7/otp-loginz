import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

let otpStore = {};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: "Email is required" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expires = Date.now() + 5 * 60 * 1000;

    otpStore[email] = { otp, expires };

    const msg = {
      to: email,
      from: "no-reply@yourdomain.com",
      subject: "رمز الدخول لموقعك",
      html: `<strong>رمز التحقق هو: ${otp}</strong>`,
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ success: true, message: "OTP sent" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to send OTP" });
    }
  } else if (req.method === "GET") {
    const { email, otp } = req.query;
    const record = otpStore[email];
    if (record && record.otp === otp && record.expires > Date.now()) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false, message: "OTP غير صالح أو منتهي" });
    }
  } else {
    res.status(405).end();
  }
}
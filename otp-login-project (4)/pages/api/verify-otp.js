export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, otp } = req.body;

  // تحقق وهمي، يجب الربط مع قاعدة بيانات فعلية لاحقاً
  if (otp === "1234") {
    return res.status(200).json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: "OTP غير صحيح" });
  }
}
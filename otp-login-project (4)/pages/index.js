export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1>نظام تحقق OTP</h1>
      <p>أرسل طلب من تطبيق خارجي أو Postman إلى: <code>/api/send-otp</code></p>
    </div>
  );
}
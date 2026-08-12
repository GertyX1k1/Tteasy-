export default function Home() {
  const CLIENT_KEY = process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI;

  const loginUrl = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=user.info.basic,video.upload,video.publish&response_type=code&redirect_uri=${REDIRECT_URI}&state=state123`;

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <h1>Публикация видео в TikTok</h1>
      <p>Войди через свой аккаунт, чтобы выбрать и опубликовать видео</p>
      <a href={loginUrl}>
        <button style={{
          padding: "12px 24px",
          fontSize: "16px",
          background: "#000",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}>
          Войти через TikTok
        </button>
      </a>
    </div>
  );
}

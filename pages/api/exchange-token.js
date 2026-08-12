export default async function handler(req, res) {
  const { code } = req.body;

  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY,
      client_secret: process.env.TIKTOK_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    }),
  });

  const data = await response.json();
  res.status(200).json(data);
}

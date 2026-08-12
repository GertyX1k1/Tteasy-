export default async function handler(req, res) {
  const { token } = req.body;

  const response = await fetch("https://open.tiktokapis.com/v2/video/list/?fields=id,title,cover_image_url", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ max_count: 20 }),
  });

  const data = await response.json();
  res.status(200).json({ videos: data.data?.videos || [] });
}

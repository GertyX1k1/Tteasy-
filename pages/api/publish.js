export default async function handler(req, res) {
  const { token, videoIds } = req.body;
  const results = [];

  for (const id of videoIds) {
    try {
      const response = await fetch("https://open.tiktokapis.com/v2/post/publish/video/init/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_info: { source: "PULL_FROM_URL", video_id: id },
        }),
      });
      const data = await response.json();
      results.push(data);
      await new Promise((r) => setTimeout(r, 10000)); // пауза 10 сек между запросами
    } catch (e) {
      results.push({ error: e.message });
    }
  }

  res.status(200).json({ success: true, results });
}

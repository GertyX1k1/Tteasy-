import { useEffect, useState } from "react";

export default function Videos() {
  const [videos, setVideos] = useState([]);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("tiktok_access_token");
    if (!token) return;
    fetch("/api/list-videos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((data) => setVideos(data.videos || []));
  }, []);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const publish = async () => {
    setStatus("Публикация...");
    const token = localStorage.getItem("tiktok_access_token");
    const res = await fetch("/api/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, videoIds: selected }),
    });
    const data = await res.json();
    setStatus(data.success ? "Опубликовано!" : "Ошибка: " + JSON.stringify(data));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px" }}>
      <h1>Выбери видео для публикации</h1>
      {videos.map((v) => (
        <div key={v.id} style={{ marginBottom: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={selected.includes(v.id)}
              onChange={() => toggle(v.id)}
            />
            {" "}{v.title || v.id}
          </label>
        </div>
      ))}
      <button onClick={publish} disabled={selected.length === 0}>
        Опубликовать выбранные ({selected.length})
      </button>
      <p>{status}</p>
    </div>
  );
}

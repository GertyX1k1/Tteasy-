import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Callback() {
  const router = useRouter();
  const [status, setStatus] = useState("Обработка входа...");

  useEffect(() => {
    if (!router.isReady) return;
    const { code } = router.query;
    if (!code) return;

    fetch("/api/exchange-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.access_token) {
          localStorage.setItem("tiktok_access_token", data.access_token);
          router.push("/videos");
        } else {
          setStatus("Ошибка входа: " + JSON.stringify(data));
        }
      })
      .catch((err) => setStatus("Ошибка: " + err.message));
  }, [router.isReady]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px", fontFamily: "sans-serif" }}>
      <p>{status}</p>
    </div>
  );
}

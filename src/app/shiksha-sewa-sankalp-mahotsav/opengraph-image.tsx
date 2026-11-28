import { ImageResponse } from "next/og";
import { EVENT_CONFIG } from "@/lib/mahotsav/event";

export const alt = `${EVENT_CONFIG.honoree} — ${EVENT_CONFIG.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          background:
            "linear-gradient(135deg, #FDF8EF 0%, #F5E6CA 55%, #ECD4AC 100%)",
          border: "12px solid #5E1216",
          color: "#261812",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 22px",
              borderRadius: "999px",
              background: "#5E1216",
              color: "#FDF8EF",
              fontSize: 20,
              fontFamily: "sans-serif",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            SCIENCE DIVINE FOUNDATION
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#7A1B1F",
            }}
          >
            13 DECEMBER 2026 • 9:30 AM ONWARDS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: 26,
              fontFamily: "sans-serif",
              fontWeight: 700,
              color: "#9A6213",
              letterSpacing: "0.14em",
            }}
          >
            BIRTHDAY CELEBRATION 2026
          </div>
          <div
            style={{
              fontSize: 74,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#5E1216",
            }}
          >
            Sadguru Sakshi Shree
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#3F2B20",
              maxWidth: "920px",
              lineHeight: 1.35,
            }}
          >
            A Day of Love, Joy & Celebration — Morning Aarti, Cultural
            Performances, Live Bhajan Clubbing, Spiritual Discourses & Prasad.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #D49635",
            paddingTop: "24px",
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#4B372B",
          }}
        >
          <div>{EVENT_CONFIG.venueLocation}</div>
          <div
            style={{
              padding: "12px 26px",
              borderRadius: "999px",
              background: "#D49635",
              color: "#261812",
              fontWeight: 700,
            }}
          >
            Reserve Your Presence
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

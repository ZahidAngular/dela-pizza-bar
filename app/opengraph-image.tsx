import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — stone-baked pizza in Blair Athol, Adelaide`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background:
            "linear-gradient(135deg, #16130f 0%, #0b0a09 55%, #1a0507 100%)",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 999,
              background: "#d92027",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f7f2e9",
              fontSize: 30,
            }}
          >
            ▲
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#f7f2e9", fontSize: 34, lineHeight: 1 }}>
              Dela
            </span>
            <span
              style={{
                color: "#d9b26a",
                fontSize: 15,
                letterSpacing: 5,
                marginTop: 6,
              }}
            >
              PIZZA BAR
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: "#d9b26a",
              fontSize: 20,
              letterSpacing: 7,
              marginBottom: 26,
            }}
          >
            BLAIR ATHOL · ADELAIDE
          </span>
          <span
            style={{
              color: "#f7f2e9",
              fontSize: 82,
              lineHeight: 1.02,
              maxWidth: 900,
            }}
          >
            Stone-baked pizza,
          </span>
          <span
            style={{
              color: "#d9b26a",
              fontSize: 82,
              lineHeight: 1.02,
              fontStyle: "italic",
            }}
          >
            made properly.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid #2b2620",
            paddingTop: 28,
          }}
        >
          <span style={{ color: "#9b9287", fontSize: 22, letterSpacing: 2 }}>
            {site.address.full}
          </span>
          <span style={{ color: "#f7f2e9", fontSize: 26 }}>
            {site.phone.display} · Open 7 days
          </span>
        </div>
      </div>
    ),
    size
  );
}

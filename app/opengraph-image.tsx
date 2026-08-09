import { ImageResponse } from "next/og";
import { lockupSvgString } from "@/components/Logo";
import { site } from "@/lib/site";

export const alt = `${site.name} — stone-baked pizza in Blair Athol, Adelaide`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* Satori has no access to the site's CSS or fonts, but the logo is pure
   geometry — so the same paths the navbar uses are inlined as a data URI
   and the card gets the real wordmark rather than a facsimile. */
const LOCKUP_W = 300;
const lockupUri = `data:image/svg+xml;utf8,${encodeURIComponent(
  lockupSvgString("#f7f2e9", "#d9b26a", LOCKUP_W)
)}`;

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
        <div style={{ display: "flex" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lockupUri} width={LOCKUP_W} alt="" />
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

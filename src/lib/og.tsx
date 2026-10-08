import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

/**
 * Social preview: headline on the left, a Work Island pill and panel sketch
 * on the right, tinted with the given accent.
 */
export function ogImage({
  eyebrow,
  title,
  accent = "#3ddc97",
  base = "#0a1412",
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  base?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: `radial-gradient(60% 60% at 85% 20%, ${accent}33, transparent 70%), linear-gradient(180deg, #070a0a, #040606)`,
          color: "#eef5f2",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 620 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 16,
                background: "#0b1211",
                border: "1.5px solid rgba(255,255,255,.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: accent,
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              W
            </div>
            <div style={{ fontSize: 30, fontWeight: 700 }}>WorkOS</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: accent, fontWeight: 700 }}>{eyebrow}</div>
            <div style={{ fontSize: title.length > 40 ? 56 : 66, fontWeight: 700, lineHeight: 1.05, marginTop: 18, letterSpacing: -1.5 }}>{title}</div>
          </div>
          <div style={{ fontSize: 22, color: "#9aa8a3" }}>Desktop workspace manager for developers</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flex: 1, gap: 22 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              height: 54,
              padding: "0 20px",
              borderRadius: 999,
              background: base,
              border: "1.5px solid rgba(255,255,255,.14)",
              fontSize: 22,
            }}
          >
            <div style={{ width: 11, height: 11, borderRadius: 11, background: accent }} />
            Acme
            <div style={{ display: "flex", gap: 6, marginLeft: 6 }}>
              {["#2f7fd8", "#e0a526", "#3a3f4b", "#d97757"].map((c) => (
                <div key={c} style={{ width: 24, height: 24, borderRadius: 7, background: c }} />
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: 400,
              height: 290,
              borderRadius: 28,
              background: `linear-gradient(180deg, ${base}, #050709)`,
              border: "1.5px solid rgba(255,255,255,.12)",
              padding: 20,
              gap: 12,
              boxShadow: `0 0 90px ${accent}40`,
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", flex: 1, height: 96, borderRadius: 16, background: "rgba(255,255,255,.06)", padding: 12 }}>
                  {i === 0 && <div style={{ width: 50, height: 8, borderRadius: 4, background: accent }} />}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ display: "flex", flex: 1, height: 96, borderRadius: 16, background: "rgba(255,255,255,.045)" }} />
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
              <div style={{ display: "flex", gap: 8, padding: 6, borderRadius: 999, border: "1px solid rgba(255,255,255,.1)" }}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} style={{ width: 22, height: 22, borderRadius: 22, background: i === 0 ? "#f4f4f6" : "rgba(255,255,255,.12)" }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}

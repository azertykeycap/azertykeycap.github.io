/* eslint-disable */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const GeistBoldData = await fetch(
    new URL("../../public/fonts/Geist-Bold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const GeistSemiBoldData = await fetch(
    new URL("../../public/fonts/Geist-SemiBold.otf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const { searchParams } = new URL(request.url);

  const hasTitle = searchParams.has("title");
  const hasImgUrl = searchParams.has("imgUrl");

  const title = hasTitle
    ? searchParams.get("title")?.slice(0, 100)
    : "Annuaire de keycaps au layout français.";

  const imgUrl = hasImgUrl
    ? `https:/${searchParams.get("imgUrl")}`
    : "https://images.ctfassets.net/qakt0a0bvnxp/1n8H2PopkCEGwKCLNzmkbe/3374635d118b05f7c2c05006561c924a/IMG_2965__1_.jpg";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex" }}>
        <img
          src={imgUrl ?? undefined}
          style={{
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            display: "flex",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            backgroundColor: "rgba(12, 10, 9, 0.75)",
            fontSize: 60,
            letterSpacing: -2,
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 80,
              fontFamily: "GeistSemiBoldData",
              letterSpacing: -2,
              fontWeight: 700,
            }}
          >
            <span
              style={{
                color: "#fafaf9",
              }}
            >
              Azertykeycaps
              <span
                style={{
                  color: "#facc15",
                }}
              >
                .
              </span>
            </span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 60,
              letterSpacing: -2,
              fontWeight: 600,
              textAlign: "center",
              marginTop: 20,
              marginLeft: 60,
              marginRight: 60,
              fontFamily: "GeistSemiBold",
            }}
          >
            <span
              style={{
                color: "#fafaf9",
              }}
            >
              {title}
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "GeistBold",
          data: GeistBoldData,
          style: "normal",
          weight: 700,
        },
        {
          name: "GeistSemiBold",
          data: GeistSemiBoldData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}

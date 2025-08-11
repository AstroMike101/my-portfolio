import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  console.log("DEBUG: Entered /api/spotify/recent");

  const session = await getServerSession(authOptions);
  console.log("DEBUG: Session object:", session);

  if (!session) {
    console.error("DEBUG: No session found");
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  if (!(session as any).accessToken) {
    console.error("DEBUG: No access token in session");
    return NextResponse.json({ error: "Missing access token" }, { status: 401 });
  }

  console.log("DEBUG: Access token:", (session as any).accessToken);

  const url = "https://api.spotify.com/v1/me/player/recently-played?limit=5";
  console.log("DEBUG: Fetching from", url);

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${(session as any).accessToken}`,
    },
  });

  console.log("DEBUG: Spotify API status:", res.status);

  if (!res.ok) {
    const errText = await res.text();
    console.error("DEBUG: Spotify API error response:", errText);
    return NextResponse.json(
      { error: "Failed to fetch recent tracks", details: errText },
      { status: res.status }
    );
  }

  const data = await res.json();
  console.log("DEBUG: Spotify data:", data);

  return NextResponse.json(data.items);
}

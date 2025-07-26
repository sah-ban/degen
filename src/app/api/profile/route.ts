import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get("fid");
  // console.log(`Requested fid: ${fid}`);

  try {
    const apiUrl = `https://api.farcaster.xyz/v2/user?fid=${fid}`;
    const response = await axios.get(apiUrl);

    const pfpUrl = response.data?.result?.user?.pfp?.url;
    const username = response.data?.result?.user?.username;
    const display_name = response.data?.result?.user?.displayName;
    const fids = response.data?.result?.user?.fid;

    return NextResponse.json({
      pfpUrl,
      username,
      display_name,
      fids,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

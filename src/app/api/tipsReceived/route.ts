import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get("fid");

  if (!fid) {
    console.log("Error: fid parameter is missing");
    return NextResponse.json(
      { error: "fid parameter is required" },
      { status: 400 }
    );
  }

  try {
    const tipsReceivedApiUrl = `https://api.degen.tips/airdrop2/tips?recipient_fid=${fid}`;

    const tipsReceivedResponse = await axios.get(tipsReceivedApiUrl);

    const tipsReceivedArray = Array.isArray(tipsReceivedResponse.data)
      ? tipsReceivedResponse.data
      : [];
    return NextResponse.json({
      tipsReceivedArray,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

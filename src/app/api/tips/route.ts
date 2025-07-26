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
    const tipsApiUrl = `https://api.degen.tips/airdrop2/tips?fid=${fid}`;

    const tipsResponse = await axios.get(tipsApiUrl);

    const tipsArray = Array.isArray(tipsResponse.data) ? tipsResponse.data : [];

    return NextResponse.json({
      tipsArray,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

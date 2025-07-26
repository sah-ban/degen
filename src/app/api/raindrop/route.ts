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
    const raindropApiUrl = `https://api.degen.tips/raindrop/current/points?fid=${fid}`;
    const rainResponse = await axios.get(raindropApiUrl);

    const rainData = Array.isArray(rainResponse.data) ? rainResponse.data : [];

    let rainPoints = "0";

    if (rainData.length > 0) {
      rainPoints = rainData[0].points || "0";
    } else {
      console.log("No data received from the points API");
    }

    return NextResponse.json({
      rainPoints,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

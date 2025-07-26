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
    const pointsApiUrl = `https://api.degen.tips/airdrop2/current/points?fid=${fid}`;
    const pointsResponse = await axios.get(pointsApiUrl);
    const pointsData = Array.isArray(pointsResponse.data)
      ? pointsResponse.data
      : [];

    let points = "0";
    let pointsRank = "N/A";

    if (pointsData.length > 0) {
      points = pointsData[0].points || "0";
      pointsRank = pointsData[0].leaderboard_rank || "N/A";
    }

    return NextResponse.json({
      points,
      pointsRank,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

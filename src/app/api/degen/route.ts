import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  console.log(`API route called at ${new Date().toISOString()}`);
  console.log(`Full URL: ${req.url}`);

  const fid = req.nextUrl.searchParams.get("fid");
  console.log(`Requested fid: ${fid}`);

  if (!fid) {
    console.log("Error: fid parameter is missing");
    return NextResponse.json(
      { error: "fid parameter is required" },
      { status: 400 }
    );
  }

  try {
    const allowancesApiUrl = `https://api.degen.tips/airdrop2/allowances?fid=${fid}`;
    const pointsApiUrl = `https://api.degen.tips/airdrop2/current/points?fid=${fid}`;

    const [allowancesResponse, pointsResponse] = await Promise.all([
      axios.get(allowancesApiUrl).catch((err) => {
        console.error("Allowances API error:", err.message);
        return { data: [] }; // Fallback to empty array
      }),
      axios.get(pointsApiUrl).catch((err) => {
        console.error("Points API error:", err.message);
        return { data: [] }; // Fallback to empty array
      }),
    ]);

    // Use fallback values if data is missing
    const allowancesData = Array.isArray(allowancesResponse.data)
      ? allowancesResponse.data
      : [{ message: "No allowances available", fid: fid }];
    const pointsData = Array.isArray(pointsResponse.data)
      ? pointsResponse.data
      : [];

    let points = "0";
    let pointsRank = "N/A";

    if (pointsData.length > 0) {
      points = pointsData[0].points || "0";
      pointsRank = pointsData[0].leaderboard_rank || "N/A";
    } else {
      console.log("No data received from the points API");
    }

    // console.log("--------------------------------");
    // console.log("Allowances Data:", allowancesData.length);
    // console.log("Points:", points);
    // console.log("Points Rank:", pointsRank);

    return NextResponse.json({
      allowancesData,
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

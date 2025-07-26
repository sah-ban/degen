import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const leaderboardUrl = `https://api.degen.tips/airdrop2/current/points?limit=500&offset=0`;

    const leaderboardResponse = await axios.get(leaderboardUrl);

    const leaderboardData = Array.isArray(leaderboardResponse.data)
      ? leaderboardResponse.data
      : [{ message: "No data available" }];
    return NextResponse.json({
      leaderboardData,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

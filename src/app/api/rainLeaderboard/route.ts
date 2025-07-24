import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const rainboardUrl = `https://api.degen.tips/raindrop/current/points?limit=500&offset=0`;

    const rainboardResponse = await axios.get(rainboardUrl);

    const rainboardData = Array.isArray(rainboardResponse.data)
      ? rainboardResponse.data
      : [{ message: "No data available" }];
    return NextResponse.json({
      rainboardData,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const allowanceBoardUrl = `https://api.degen.tips/airdrop2/allowances?limit=500&offset=0`;

    const allowanceBoardResponse = await axios.get(allowanceBoardUrl);

    const allowanceBoardData = Array.isArray(allowanceBoardResponse.data)
      ? allowanceBoardResponse.data
      : [{ message: "No allowances available" }];
    return NextResponse.json({
      allowanceBoardData,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

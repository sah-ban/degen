import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
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

    const allowancesResponse = await axios.get(allowancesApiUrl);

    const allowancesData = Array.isArray(allowancesResponse.data)
      ? allowancesResponse.data
      : [{ message: "No allowances available", fid: fid }];

    return NextResponse.json({
      allowancesData,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

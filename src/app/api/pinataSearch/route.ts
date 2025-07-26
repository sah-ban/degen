import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username");
  console.log(`Requested fid: ${username}`);
  const hubUrl = process.env.HUB_URL;
  try {
    const url = `${hubUrl}/v1/userNameProofByName?name=${username}`;

    const response = await axios.get(url);
    const responseFid = response.data.fid;
    console.log(`Requested fid: ${responseFid}`);
    return NextResponse.json({
      responseFid,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

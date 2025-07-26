import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get("fid");
  const today = new Date().toISOString().split("T")[0];

  if (!fid) {
    return NextResponse.json({ error: "Missing token ID" }, { status: 400 });
  }

  return NextResponse.json({
    name: `DEGEN stats of FID:${fid} on ${today}`,
    description: "An NFT of daily $DEGEN stats",
    image: `https://degen-v2.vercel.app/nft?fid=${fid}`,
    attributes: [
      { trait_type: "FID", value: fid },
      { trait_type: "Date", value: today },
    ],
  });
}

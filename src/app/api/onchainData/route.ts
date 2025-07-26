import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const dexApiUrl = `https://api.dexscreener.com/latest/dex/pairs/base/0x54d281c7cc029a9dd71f9acb7487dd95b1eecf5a`;
    const dexResponse = await axios.get(dexApiUrl);

    const price = dexResponse.data.pair.priceUsd;
    const priceChange1h = dexResponse.data.pair.priceChange.h1;
    const priceChange24h = dexResponse.data.pair.priceChange.h24;

    return NextResponse.json({
      price,
      priceChange1h,
      priceChange24h,
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

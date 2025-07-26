import { NextResponse } from "next/server";
import FarmaSDK from "../farma-sdk.js";
import axios from "axios";

export async function GET() {
  try {
    const allowancesApiUrl = `https://api.degen.tips/airdrop2/allowances?fid=268438`;
    const allowancesResponse = await axios.get(allowancesApiUrl);
    const apiDate = allowancesResponse.data[0].snapshot_day;

    const now = new Date();
    const midnightUTC = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const currDate = midnightUTC.toISOString();

    const farma = new FarmaSDK({
      hostname: "farma.pingem.xyz",
      port: 443,
      frameId: "041ir",
      privateKey: process.env.FARMA_PRIVATE_KEY,
    });

    if (apiDate === currDate) {
      await farma.sendNotification(
        "041ir",
        "Allowance Updated",
        "Allowance has been updated, Tap here to check it.",
        "https://degen-v2.vercel.app"
      );
    } else {
      await farma.sendNotification(
        "041ir",
        "Allowance Not Updated yet",
        "Allowance has not been updated for Today.",
        "https://degen-v2.vercel.app"
      );
    }

    return NextResponse.json({
      success: true,
      message: "Notification sent",
    });
  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

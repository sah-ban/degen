import { NextResponse, NextRequest } from "next/server";
import {
  Message,
  NobleEd25519Signer,
  CastAddBody,
  makeCastAdd,
} from "@farcaster/core";
import { hexToBytes } from "@noble/hashes/utils";
import FarmaSDK from "../farma-sdk.js";

interface TipEvent {
  cast_hash: string;
  fid: string;
  recipient_fid: string;
  tip_status: string;
  tip_amount: string;
  remaining_tip_allowance: string;
  recipient_username: string;
  username: string;
}

export async function POST(req: NextRequest) {
  try {
    const tips: TipEvent[] = await req.json();

    console.log(`Received ${tips.length} tips`);
    for (const tip of tips) {
      await Tip(tip); // bot notification
      await AppNotification(tip); // app notification
    }
    return NextResponse.json({ status: "ok", received: tips.length });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}

const signerPrivateKey = process.env.KEY || "";
const hubUrl = process.env.HUB_URL;

const privateKeyBytes = hexToBytes(signerPrivateKey);
const ed25519Signer = new NobleEd25519Signer(privateKeyBytes);

const dataOptions = { fid: 1041440, network: 1 };

const hexToByteArray = (hex: string): number[] => {
  if (hex.startsWith("0x")) hex = hex.slice(2);
  if (hex.length !== 40)
    throw new Error("Hex string must be exactly 40 characters (20 bytes)");
  return Array.from({ length: 20 }, (_, i) =>
    parseInt(hex.substr(i * 2, 2), 16)
  );
};

const farma = new FarmaSDK({
  hostname: "farma.pingem.xyz",
  port: 443,
  frameId: "041ir",
  privateKey: process.env.FARMA_PRIVATE_KEY,
});

async function Tip(tip: TipEvent) {
  const hashBytes = new Uint8Array(hexToByteArray(tip.cast_hash));

  const castBody: CastAddBody = {
    text: `Tipped: ${tip.tip_amount}\nremaining: ${tip.remaining_tip_allowance} \nstatus: ${tip.tip_status}\n `,
    parentCastId: {
      fid: Number(tip.fid),
      hash: hashBytes,
    },
    embeds: [
      {
        url: `https://degen-v2.vercel.app?fid=${tip.fid}`,
      },
    ],
    embedsDeprecated: [],
    mentions: [],
    mentionsPositions: [],
    type: 0,
  };

  const castAddReq = await makeCastAdd(castBody, dataOptions, ed25519Signer);
  const castAdd = castAddReq._unsafeUnwrap();

  const messageBytes = Buffer.from(Message.encode(castAdd).finish());

  await fetch(`${hubUrl}/v1/submitMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/octet-stream" },
    body: messageBytes,
  });
}

async function AppNotification(tip: TipEvent) {
  await farma.sendNotification(
    "041ir",
    `Tipped ${tip.tip_amount} $DEGEN`,
    `You tipped ${tip.tip_amount} $DEGEN to ${tip.recipient_username}.\nstatus: ${tip.tip_status}`,
    "https://degen-v2.vercel.app",
    [Number(tip.fid)]
  );

  await farma.sendNotification(
    "041ir",
    `Rceived ${tip.tip_amount} $DEGEN`,
    `You received ${tip.tip_amount} $DEGEN from ${tip.username}.\nstatus: ${tip.tip_status}`,
    "https://degen-v2.vercel.app",
    [Number(tip.recipient_fid)]
  );
}

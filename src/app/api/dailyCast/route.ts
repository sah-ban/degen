import { NextResponse } from "next/server";
import {
  Message,
  NobleEd25519Signer,
  CastAddBody,
  makeCastAdd,
} from "@farcaster/core";
import { hexToBytes } from "@noble/hashes/utils";
import axios from "axios";

const dexApiUrl = `https://api.dexscreener.com/latest/dex/pairs/base/0x54d281c7cc029a9dd71f9acb7487dd95b1eecf5a`;
const dexResponse = await axios.get(dexApiUrl)

const price = dexResponse.data.pair.priceUsd;
const priceChange1h= dexResponse.data.pair.priceChange.h1;
const priceChange24h= dexResponse.data.pair.priceChange.h24;
const date = new Date();
const day = date.getDate();
const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
const year = date.getFullYear();
const text= `Daily $DEGEN Update - ${day} ${month} ${year}\n\nPrice: $${price}\n1H Change: ${priceChange1h}%\n24H Change: ${priceChange24h}%`

const FID =268438
const SIGNER =  process.env.PRIVATE_KEY || "";
const hubUrl= process.env.HUB_URL;


export async function GET() {
  try {

    const dataOptions = {
      fid: FID,
      network: 1,
    };

    const privateKeyBytes = hexToBytes(SIGNER);
    const ed25519Signer = new NobleEd25519Signer(privateKeyBytes);

    const castBody: CastAddBody =            {
      text,
      parentUrl: "https://farcaster.xyz/~/channel/degentokenbase",
      embeds: [
        { url: "https://degen-v2.vercel.app" }
      ], 
      embedsDeprecated:[],
      mentions:[],
      mentionsPositions:[],
      type: 0
    }

    const castAddReq = await makeCastAdd(castBody, dataOptions, ed25519Signer);
    const castAdd = castAddReq._unsafeUnwrap();

    const messageBytes = Buffer.from(Message.encode(castAdd).finish());

    const castRequest = await fetch(`${hubUrl}/v1/submitMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/octet-stream" },
      body: messageBytes,
    });

    if (!castRequest.ok) {
      const errorText = await castRequest.text();
      return NextResponse.json({ error: errorText }, { status: castRequest.status });
    }

    const result = await castRequest.json();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error sending cast:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

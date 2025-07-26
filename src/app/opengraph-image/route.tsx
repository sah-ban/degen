// import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import axios from "axios";
import { ImageResponse } from "@vercel/og";

export async function GET(req: NextRequest) {
  const fid = req.nextUrl.searchParams.get("fid");
  const appUrl = process.env.NEXT_PUBLIC_URL;

  interface AllowanceData {
    snapshot_day: string;
    fid: string;
    user_rank: string;
    tip_allowance: string;
    remaining_tip_allowance: string;
  }

  interface DegenStats {
    allowancesData: AllowanceData[];
    points: string;
    pointsRank: string;
    rainPoints: string;
  }

  let data: AllowanceData | null = null;
  let points: string | null = null;
  let pointsRank: string | null = null;
  let pfpUrl: string = "";
  let username: string = "";
  let display_name: string = "";
  let rainPoints: string = "";

  try {
    const fidResponse = await fetch(`${appUrl}/api/degen?fid=${fid}`);
    if (!fidResponse.ok) {
      throw new Error(`Fid HTTP error! Status: ${fidResponse.status}`);
    }
    const responseData: DegenStats = await fidResponse.json();

    if (responseData.allowancesData?.length > 0) {
      data = responseData.allowancesData[0];
    }
    points = responseData.points;
    pointsRank = responseData.pointsRank;
    rainPoints = responseData.rainPoints;

    const apiUrl = `https://api.warpcast.com/v2/user?fid=${fid}`;
    const response = await axios.get(apiUrl);

    pfpUrl = response.data?.result?.user?.pfp?.url;
    username = response.data?.result?.user?.username;
    display_name = response.data?.result?.user?.displayName;

    const imageResponse = new ImageResponse(
      (
        <div tw="flex flex-col w-full h-full bg-[#1e293b] text-[#FFDEAD]">
          <div tw="flex items-center justify-center text-white mt-10">
            <img src={pfpUrl} alt="Profile" tw="w-15 h-15 rounded-lg mr-4" />
            <div tw="flex flex-col">
              <span tw="flex text-2xl">{display_name}</span>
              <span tw="flex text-xl text-gray-400">@{username}</span>
            </div>
          </div>

          <div tw="flex flex-row items-center justify-between text-[#885aee] mt-2 mx-12">
            <div tw="flex text-2xl">
              Allowance Rank: {data?.user_rank ?? "N/A"}
            </div>
            <div tw="flex text-2xl">Points Rank: {pointsRank ?? "N/A"}</div>
          </div>
          <div tw="flex flex-col px-10 w-full mx-1 text-[#86e635] mt-2">
            <div tw="flex flex-row justify-between">
              <span tw="text-3xl">Allowance:</span>
              <span tw="text-3xl">{data?.tip_allowance ?? "N/A"}</span>
            </div>
            <div tw="relative flex flex-row justify-between items-center border border-[#8B5CF6] rounded-lg overflow-hidden text-3xl">
              {/* Background Progress Bar (Remaining Amount, Right-Aligned) */}
              <div
                tw="absolute top-0 right-0 h-full bg-[#8B5CF6] transition-all duration-300"
                style={{
                  width: `${
                    data?.remaining_tip_allowance &&
                    data?.tip_allowance &&
                    data?.tip_allowance !== "0"
                      ? (Number(data?.remaining_tip_allowance) /
                          Number(data?.tip_allowance)) *
                        100
                      : 0
                  }%`,
                }}
              />

              {/* Content */}
              <div tw="relative flex justify-between w-full font-medium">
                <span>Remaining:</span>
                {data?.tip_allowance && (
                  <span>
                    (
                    {(
                      (Number(data?.remaining_tip_allowance) /
                        Number(data?.tip_allowance)) *
                      100
                    ).toFixed(1) ?? "N/A"}
                    %)
                  </span>
                )}
                <div tw="flex">
                  <span>{data?.remaining_tip_allowance ?? "N/A"}</span>
                </div>
              </div>
            </div>
            <div tw="flex flex-row justify-between">
              <span tw="text-3xl">Points:</span>
              <span tw="text-3xl">{points ?? "N/A"}</span>
            </div>
            <div tw="flex flex-row justify-between">
              <span tw="text-3xl">Raindrops:</span>
              <span tw="text-3xl">{rainPoints ?? "N/A"}</span>
            </div>
          </div>
          <div tw="flex flex-col items-center"></div>
          <div tw="flex bg-[#FFFACD] mt-8 text-black w-full justify-end px-4">
            <div tw="text-1xl">Frame by @cashlessman.eth</div>
          </div>
        </div>
      ),
      {
        width: 600,
        height: 400,
      }
    );
    const headers = new Headers(imageResponse.headers);
    headers.set(
      "Cache-Control",
      "public, s-maxage=43200, stale-while-revalidate=21600"
    );

    return new Response(imageResponse.body, {
      headers,
      status: imageResponse.status,
      statusText: imageResponse.statusText,
    });
  } catch {
    return new Response("Failed to generate image", {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}

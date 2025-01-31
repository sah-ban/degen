import { ImageResponse } from "next/og";
import { NextRequest} from "next/server";


export async function GET(req: NextRequest) {

// export async function GET(req: Request) {
  // const url = new URL(req.url);
  // const fid = url.searchParams.get("fid");
  const fid = req.nextUrl.searchParams.get("fid");

  const appUrl = process.env.NEXT_PUBLIC_URL;
  const today = new Date().toLocaleDateString(); // Format the date to a string

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
    pfpUrl: string;
    username: string;
    display_name: string;
  }

  let data: AllowanceData | null = null;
  let points: string | null = null;
  let pointsRank: string | null = null;
  let pfpUrl: string = "";
  let username: string = "";
  let display_name: string = "";

  if (fid) {
    try {
      const fidResponse = await fetch(`${appUrl}/api/degen?fid=${fid}`);
      if (!fidResponse.ok) {
        throw new Error(`Fid HTTP error! Status: ${fidResponse.status}`);
      }
      const responseData: DegenStats = await fidResponse.json();

      // Assign data and points-related values
      if (responseData.allowancesData?.length > 0) {
        data = responseData.allowancesData[0];
      }
      points = responseData.points;
      pointsRank = responseData.pointsRank;
      pfpUrl = responseData.pfpUrl;
      username = responseData.username;
      display_name = responseData.display_name;
    } catch (err) {
      console.error("Error fetching Degen Stats:", err);
    }
  }

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full bg-[#1e293b] text-[#FFDEAD]">
        <div tw="flex items-center justify-center text-white mt-7">
          <img
            src={pfpUrl}
            alt="Profile"
            tw="w-15 h-15 rounded-lg mr-4"
          />
          <div tw="flex flex-col">
            <span tw="flex text-2xl">{display_name}</span>
            <span tw="flex text-1xl">@{username}</span>
          </div>
        </div>
        <div tw="flex text-2xl justify-center text-[#38BDf8] mt-2">
          {today}
        </div>
        <div tw="flex flex-row items-center justify-between text-[#885aee] mt-2 mx-12">
          <div tw="flex text-2xl">Allowance Rank: {data?.user_rank ?? "N/A"}</div>
          <div tw="flex text-2xl">Points Rank: {pointsRank ?? "N/A"}</div>
        </div>
        <div tw="flex flex-col px-10 w-full mx-1 text-[#86e635] mt-2">
          <div tw="flex flex-row justify-between">
            <span tw="text-3xl">Allowance:</span>
            <span tw="text-3xl">{data?.tip_allowance ?? "N/A"}</span>
          </div>
          <div tw="flex flex-row justify-between">
            <span tw="text-3xl">Remaining:</span>
            <div tw="flex">
              <span tw="text-3xl">{data?.remaining_tip_allowance ?? "N/A"}</span>
              <span tw="text-3xl ml-3">
                {data?.tip_allowance === "N/A"
                  ? ""
                  : `(${(
                      (Number(data?.remaining_tip_allowance) /
                        Number(data?.tip_allowance)) *
                      100
                    ).toFixed(1) ?? "N/A"}%)`}
              </span>
            </div>
          </div>
          <div tw="flex flex-row justify-between">
            <span tw="text-3xl">Points:</span>
            <span tw="text-3xl">{points ?? "N/A"}</span>
          </div>
        </div>
        <div tw="flex flex-col items-center">
          <span tw="text-1xl mt-4">
            {data?.tip_allowance === "N/A"
              ? "Lock at least 10,000 $DEGEN to get Allowance"
              : "The Hat Stays On!"}
          </span>
        </div>
        <div tw="flex bg-[#FFFACD] mt-3 text-black w-full justify-end px-4">
          <div tw="text-1xl">Frame by @cashlessman.eth</div>
        </div>
      </div>
    ),
    {
      width: 600,
      height: 400,
    }
  );

}

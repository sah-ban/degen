// import { ImageResponse } from "next/og";

// export const alt = "Farcaster Frames V2 Demo";
// export const size = {
//   width: 600,
//   height: 400,
// };

// export const contentType = "image/png";

// export default async function Image() {
//   return new ImageResponse(
//     (
//       <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white">
//         <h1 tw="text-3xl">$DEGEN stats by @cashlessman.eth</h1>
//       </div>
//     ),
//     {
//       ...size,
//     }
//   );
// }
import { ImageResponse } from "next/og";

export const alt = "Demo";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { fid: string } }) {
  const { fid } = params; // Extract the `id` parameter from the request context

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white">
        <h1 tw="text-3xl text-black">Hi, {fid}</h1>
      </div>
    ),
    {
      ...size,
    }
  );
}

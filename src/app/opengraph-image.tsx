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

export const alt = "Dynamic Open Graph Image";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { fid?: string } }) {
  // Safely extract `fid` from params and handle undefined cases
  const { fid } = params || {};

  if (!fid) {
    // Return a default response or throw an error
    return new ImageResponse(
      (
        <div tw="h-full w-full flex flex-col justify-center items-center relative bg-red-500">
          <h1 tw="text-3xl text-white">Missing `fid`</h1>
        </div>
      ),
      {
        ...size,
      }
    );
  }

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white">
        <h1 tw="text-3xl text-black">Dynamic ID: {fid}</h1>
      </div>
    ),
    {
      ...size,
    }
  );
}

// import { Metadata } from "next";
// import App from "./app";

// const appUrl = process.env.NEXT_PUBLIC_URL;

// const frame = {
//   version: "next",
// imageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/degen.png`,  
//   button: {
//     title: "Check Your $DEGEN Stats",
//     action: {
//       type: "launch_frame",
//       name: "$DEGEN STATS",
//       url: appUrl,
//       splashImageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/pfp.png`,
//       splashBackgroundColor: "#333333",
//     },
//   },
// };

// export const revalidate = 300;

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Farcaster Frames",
//     openGraph: {
//       title: "Farcaster Frames",
//       description: "A Farcaster Frames app.",
//     },
//     other: {
//       "fc:frame": JSON.stringify(frame),
//     },
//   };
// }

// export default function Home() {
//   return (<App />);
// }
import { Metadata } from "next";
import App from "~/app/app";

const appUrl = process.env.NEXT_PUBLIC_URL;

export const revalidate = 300;

interface Props {
  searchParams: Promise<{
    fid: string;
  }>;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { fid } = await searchParams;
  

  const frame = {
    version: "next",
    imageUrl: fid 
    ? `${appUrl}/opengraph-image?token=${fid}` 
    : `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/degen.png`,    
    button: {
      title: "Check Your $DEGEN Stats",
    action: {
      type: "launch_frame",
      name: "$DEGEN STATS",
      url: appUrl,
      splashImageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/pfp.png`,
      splashBackgroundColor: "#333333",
      },
    },
  };

  return {
    title: "Frames v2 Swap",
    openGraph: {
      title: "Frames v2 Swap",
      description: "A Farcaster Frames v2 app.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return (<App />);
}



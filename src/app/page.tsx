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

  const ts = Date.now().toString().split("").reverse().join("");

  const frame = {
    version: "next",
    imageUrl: fid
      ? `${appUrl}/opengraph-image?fid=${fid}&ts=${ts}`
      : `${appUrl}/cover.png`,
    button: {
      title: `SEE YOURS`,
      action: {
        type: "launch_frame",
        name: "$DEGEN STATS",
        url: appUrl,
        splashImageUrl: `${appUrl}/splash.png`,
        splashBackgroundColor: "#333333",
      },
    },
  };

  return {
    title: "$DEGEN stats",
    openGraph: {
      title: "$DEGEN stats",
      description: "A mini app for all info about $DEGEN token.",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}

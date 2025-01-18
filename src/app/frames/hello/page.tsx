import { Metadata } from "next";
import App from "~/app/app";

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: "next",
  imageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/banner2.png`,
  button: {
    title: "Launch Frame",
    action: {
      type: "launch_frame",
      name: "hehe",
      url: `${appUrl}/frames/hello/`,
      splashImageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/pfp.png`,
      splashBackgroundColor: "#333333",
    },
  },
};

export const metadata: Metadata = {
  title: "meta title",
  description: "meta description",
  openGraph: {
    title: "opengraph title",
    description: "opengraph description",
  },
  other: {
    "fc:frame": JSON.stringify(frame),
  },
};

export default function HelloFrame() {
  return <App title={"Hello, world!"} />;
}

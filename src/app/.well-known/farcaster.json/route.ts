export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = 
// {
//     accountAssociation: {
//       header:
//         "eyJmaWQiOjM2MjEsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgyY2Q4NWEwOTMyNjFmNTkyNzA4MDRBNkVBNjk3Q2VBNENlQkVjYWZFIn0",
//       payload: "eyJkb21haW4iOiJmcmFtZXMtdjIudmVyY2VsLmFwcCJ9",
//       signature:
//         "MHhiNDIwMzQ1MGZkNzgzYTExZjRiOTllZTFlYjA3NmMwOTdjM2JkOTY1NGM2ODZjYjkyZTAyMzk2Y2Q0YjU2MWY1MjY5NjI5ZGQ5NTliYjU0YzEwOGI4OGVmNjdjMTVlZTdjZDc2YTRiMGU5NzkzNzA3YzkxYzFkOWFjNTg0YmQzNjFi",
//     },
//     frame: {
//       version: "1",
//       name: "Frames v2 Demo",
//       iconUrl: `${appUrl}/icon.png`,
//       homeUrl: appUrl,
//       imageUrl: `${appUrl}/frames/hello/opengraph-image`,
//       buttonTitle: "Launch Frame",
//       splashImageUrl: `${appUrl}/splash.png`,
//       splashBackgroundColor: "#f7f7f7",
//       webhookUrl: `${appUrl}/api/webhook`,
//     },
//   };

//   return Response.json(config);
// }
{
  "accountAssociation": {
    header: "eyJmaWQiOjI2ODQzOCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDIxODA4RUUzMjBlREY2NGMwMTlBNmJiMEY3RTRiRkIzZDYyRjA2RWMifQ",
    payload: "eyJkb21haW4iOiJkZWdlbi12Mi52ZXJjZWwuYXBwIn0",
    signature: "MHhjMzkxYTc4MTRlMWQwNDI5MzVmNGQzYjJlYWVmNWE5YTQwNDVhN2E1YjZiNDlkZjAxMDhjZDFmN2YzYzYwMDg5NDljMDdjYzFhOGYwYjk0MWUzNzBjZDRlMjFkOTU1MGFjMjg4YjdmNDk0MzJjZGNmY2U0MDJkNzc2MmM3ZTI2ZDFj"
  },
  frame: {
    version: "1",
    name: "DEGEN",
    iconUrl: "https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/degen_logo.png",
    homeUrl: appUrl,
    imageUrl: "https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/degen.png",
    buttonTitle: "SEE",
    splashImageUrl: `https://raw.githubusercontent.com/cashlessman/images/refs/heads/main/pfp.png`,

    // splashImageUrl: "https://degen-v2.vercel.app/splash.png",
    splashBackgroundColor: "#333333",
    webhookUrl: "https://degen-v2.vercel.app/api/webhook"
    },
  };

  return Response.json(config);
}
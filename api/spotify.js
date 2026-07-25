// import axios from "axios";

// export default async function handler(req, res) {
//   // Get fresh access token

//   const tokenResponse = await axios.post(
//     "https://accounts.spotify.com/api/token",

//     new URLSearchParams({
//       grant_type: "refresh_token",
//       refresh_token: process.env.BQBgaXtk4Rfq04zUgXqJ5cN-v41DFM8VgyJV42bieCdebGPgyB-YEuBNDZ6LSZKi2vCsc41nLKLiwmmATp5JLBDmXJ46xr_z44Ul54XSRsZG4d6_O06IWxcaqfrX2h84yI-Kome0-jda_PORYsEdyck28UIpA8aef3qQSRhw9l8QtTcTlsETyUgM4YQqDoOKGePKAl1pcN-UNMpOQEYoC6k-ZohwdBT8nYrswt8R8MrnWFmELQlr_PrNjyGNrdCF,
//     }),

//     {
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",

//         Authorization:
//           "Basic " +
//           Buffer.from(
//             process.env.c131f445990c471b9d91063c1d547349 +
//               ":" +
//               process.env.f475361d337e4c23967d573b3e1e0e88,
//           ).toString("base64"),
//       },
//     },
//   );

//   const accessToken = tokenResponse.data.access_token;

//   const headers = {
//     Authorization: `Bearer ${accessToken}`,
//   };

//   // Current song

//   const current = await axios
//     .get("https://api.spotify.com/v1/me/player", {
//       headers,
//     })
//     .catch(() => {
//       return {
//         data: null,
//       };
//     });

//   // Last 20 songs

//   const recentlyPlayed = await axios.get(
//     "https://api.spotify.com/v1/me/player/recently-played",
//     {
//       params: {
//         limit: 20,
//       },
//       headers,
//     },
//   );

//   res.json({
//     current: current.data,

//     history: recentlyPlayed.data.items,
//   });
// }

export default function handler(req, res) {
  res.status(200).json({
    message: "API works",
  });
}

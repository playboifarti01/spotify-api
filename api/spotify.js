// import axios from "axios";

// export default async function handler(req, res) {

//   try {

//     const tokenResponse = await axios.post(
//       "https://accounts.spotify.com/api/token",

//       new URLSearchParams({
//         grant_type: "refresh_token",
//         refresh_token: process.env.SPOTIFY_REFRESH_TOKEN
//       }),

//       {
//         headers: {
//           "Content-Type":
//           "application/x-www-form-urlencoded",

//           Authorization:
//           "Basic " +
//           Buffer.from(
//             process.env.SPOTIFY_CLIENT_ID +
//             ":" +
//             process.env.SPOTIFY_CLIENT_SECRET
//           ).toString("base64")
//         }
//       }
//     );

//     const accessToken =
//       tokenResponse.data.access_token;

//     const current =
//       await axios.get(
//         "https://api.spotify.com/v1/me/player",
//         {
//           headers: {
//             Authorization:
//             `Bearer ${accessToken}`
//           }
//         }
//       )
//       .catch(() => ({
//         data:null
//       }));

//     const history =
//       await axios.get(
//         "https://api.spotify.com/v1/me/player/recently-played",
//         {
//           params:{
//             limit:20
//           },
//           headers:{
//             Authorization:
//             `Bearer ${accessToken}`
//           }
//         }
//       );

//     res.status(200).json({
//       current: current.data,
//       history: history.data.items
//     });

//   } catch(error) {

//     console.log(error.response?.data || error.message);

//     res.status(500).json({
//       error:
//       error.response?.data ||
//       error.message
//     });

//   }

// }

export default function handler(req, res) {
  res.status(200).json({
    message: "API works",
  });
}

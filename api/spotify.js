import axios from "axios";

export default async function handler(req, res) {
  // Allow GitHub Pages / other sites
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    // Get access token
    const tokenResponse = await axios.post(
      "https://accounts.spotify.com/api/token",

      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN,
      }),

      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",

          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET,
            ).toString("base64"),
        },
      },
    );

    const accessToken = tokenResponse.data.access_token;

    // CURRENT SONG
    let current = null;

    try {
      const currentResponse = await axios.get(
        "https://api.spotify.com/v1/me/player/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (currentResponse.data) {
        current = {
          song: currentResponse.data.item.name,

          artist: currentResponse.data.item.artists[0].name,

          album: currentResponse.data.item.album.images[0].url,

          is_playing: currentResponse.data.is_playing,
        };
      }
    } catch (error) {
      // 204 = nothing playing
      current = null;
    }

    // HISTORY
    const historyResponse = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        params: {
          limit: 20,
        },

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const history = historyResponse.data.items.map((item) => ({
      song: item.track.name,

      artist: item.track.artists[0].name,

      album: item.track.album.images[0].url,
    }));

    res.status(200).json({
      current,
      history,
    });
  } catch (error) {
    console.log(error.response?.data || error.message);

    res.status(500).json({
      error: error.response?.data || error.message,
    });
  }
}

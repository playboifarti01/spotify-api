import axios from "axios";

export default async function handler(req, res) {
  // Allow external websites (GitHub Pages, etc.)
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.setHeader("Access-Control-Allow-Methods", "GET");

  try {
    // Get Spotify access token
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

    // ==========================
    // CURRENTLY PLAYING
    // ==========================

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

          progress_ms: currentResponse.data.progress_ms,

          duration_ms: currentResponse.data.item.duration_ms,
        };
      }
    } catch (error) {
      // Spotify returns 204 if nothing is playing
      current = null;
    }

    // ==========================
    // RECENTLY PLAYED HISTORY
    // ==========================

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

      played_at: item.played_at,
    }));

    // Send clean JSON
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

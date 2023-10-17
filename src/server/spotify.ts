import SpotifyWebApi from "spotify-web-api-node";

import { env } from "~/env.mjs";

const spotify = new SpotifyWebApi({
  clientId: env.SPOTIFY_CLIENT_ID,
  clientSecret: env.SPOTIFY_ACCESS_TOKEN,
  redirectUri: "http://localhost:3000",
});

try {
  const data = await spotify.clientCredentialsGrant();
  console.log("The access token expires in " + data.body.expires_in);
  console.log("The access token is " + data.body.access_token);
  // Save the access token so that it's used in future calls
  spotify.setAccessToken(data.body.access_token);
} catch (error) {
  console.log("Something went wrong when retrieving an access token", error);
}

export { spotify };

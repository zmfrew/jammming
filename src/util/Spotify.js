let accessToken;
const clientId = '5c4b829d9b8445dbbdf70f3f74cc91ae';
const clientSecret = 'af35430a2ea34995b3137399acf2a242';
const redirectURI = 'http://localhost:3000/';
const accessURIBase = 'https://accounts.spotify.com/authorize';
const spotifyURIBase = 'https://api.spotify.com/v1/';

const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number (expiresInMatch[1]);
      window.setTimeout( () => accessToken = '', expiresIn * 1000);
      // Clears the parameters, allowing a new access token to be pulled when it expires.
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      const accessURI = `${accessURIBase}?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessURI;
    }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`${spotifyURIBase}search?type=track&q=${term}`,
       { headers: { Authorization: `Bearer ${accessToken}`} }
     ).then(response => {return response.json();}).then(jsonResponse => {
      if (!jsonResponse.tracks) {
        return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }));
    });
  },

  savePlayList(name, trackUris) {
    if(!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch(`${spotifyURIBase}me`, {headers: headers})
    .then(response => response.json())
    .then(jsonResponse => {
      userId = jsonResponse.id;
      return fetch(`${spotifyURIBase}users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json())
      .then(jsonResponse => {
        const playListId = jsonResponse.id;
        return fetch(`${spotifyURIBase}users/${userId}/playlists/${playListId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({ uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;

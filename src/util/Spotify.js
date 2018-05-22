const clientId= "474b18d247e6474c81293bfbfcadb710";
const redirectURI= "http://localhost:3000/";

let accessToken;
const Spotify = {
  getAccessToken(){
    if(accessToken){
      return accessToken;
    }

    const setAccessToken = window.location.href.match(/access_token=([^&]*)/);
    const expirationTime = window.location.href.match(/expires_in=([^&]*)/);
    if(setAccessToken && expirationTime){
      accessToken = setAccessToken[1];
      const expiresIn = Number(expirationTime[1]);
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/');
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
      window.location = accessUrl;
    }
  },

  search(term){
    const accessToken = Spotify.getAccessToken();
  return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
    {
    headers: {Authorization: `Bearer ${accessToken}`}
  }).then(response => {
    return response.json();
  }).then(jsonResponse => {
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


savePlaylist(name,trackUris){
  if(!name || !trackUris.length){
    return;
  }

  const accessToken = Spotify.getAccessToken();
  const headers = { Authorization: `Bearer ${accessToken}` };
  let usersId;

  return fetch('https://api.spotify.com/v1/me', {headers:headers}).then(response => response.json()
    ).then(jsonResponse => {
      usersId = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${usersId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }
};

export default Spotify;

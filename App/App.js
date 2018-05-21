import React from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      searchResults:[],
      playlistName: 'New playList',
      playlistTracks:[]
    };
    this.addTrack = this.addTrack.bind(this);
    this.revoveTrack = this.removeTrack.bind(this);
    this.updatePlaylistName= this.updatePlaylistName.bind(this);
    this.savePlayList=this.savePlayList.bind(this);
    this.search=this.search.bind(this);
  }

  addTrack(track){
    let tracks = this.state.playlistTracks;
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)){
      return;
    }
    this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks;
    if (this.state.playlistTracks.filter(savedTrack => savedTrack.id !== track.id)){
     return;
    }//Step 49
        this.setState({playlistTracks: tracks});
  }

updatePlaylistName(name){
  this.setState({playlistName: name});
}

savePlayList(){
  const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New playList',
        playlistTracks: []
      });
    });
}
search(term){
  Spotify.search(term).then(searchResults => {
    this.setState({searchResults: searchResults});
});
}
  render() {
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.search}/>
      <div className ="App-playlist">
        <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
        <Playlist playlistName={this.state.playlistName} playlistTrack={this.state.playlistTrack}
        onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlayList}/>
      </div>
    </div>
  </div>
    );
  }
}

export default App;

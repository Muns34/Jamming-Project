import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component{
constructor(props){
  super(props);
  this.handleNameChange = this.handleNameChange.bind(this);
}

  handleNameChange(event){// step 59
    this.props.onChangeNmae(event.target.value);
  }
  render(){
    return (
      <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange}/>
        <TrackList isRemoval={false} tracks={this.props.playlistTracks} onRemove = {this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;

import React, { Component } from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList.js';

class Playlist extends Component {
  constructor(props) {
      super(props);
      this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    this.props.onNameChange(e.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playListName} onChange={this.handleNameChange} />
          <TrackList tracks={this.props.playListTracks}
          isRemoval={true}
          onRemove={this.props.onRemove}
          />
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;

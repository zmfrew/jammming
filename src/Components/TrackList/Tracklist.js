import React, { Component } from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends Component {
  render() {
    return (
      <div className="TrackList">
        {
          this.state && this.state.items && this.props.tracks.map(track => {
          return (
            <Track
            key={track.id}
            track={track}
            onAdd={this.props.onAdd}
            isRemoval={this.props.isRemoval}
            onRemove={this.props.onRemove}
            />
            );
          })
        }
      </div>
    );
  }
}

export default TrackList;

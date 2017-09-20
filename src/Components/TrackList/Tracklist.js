import React from 'react';
import './TrackList.css';
import Track from '../Track/Track.js';

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
          {/*//You will add a map method that renders a set of Track components*/}

          {/*/step 34*/}
          {this.props.tracks.map(track => {
            return <Track track = {track}
            key={track.id}
            onAdd={this.props.onAdd}
            isRemoval={this.props.isRemoval}
            onRemove={this.props.onRemove} />
          })}
      </div>
    );
  }
}

export default TrackList;

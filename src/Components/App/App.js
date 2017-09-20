import React from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar.js';
import SearchResults from '../../Components/SearchResults/SearchResults.js';
import Playlist from '../../Components/Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: 'New Playlist',
      playListTracks: []
    }

    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }

  addTrack(track) {
  let tracks = this.state.playlistTracks;
  tracks.push(track);
  this.setState({playlistTracks: tracks});
  }

  removeTrack(track) {
    let tracks = this.state.playListTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playListTracks: tracks});
  }

  updatePlayListName(name) {
    this.setState({playListName: name});
  }

  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(playlistTrack => {return playlistTrack.uri;})
      Spotify.createPlaylist(this.state.playlistName, trackUris).then(this.setState(
      {
        playlistName: 'New Playlist',
        searchResults: [],
        playlistTracks: []
      }
    ));
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
            <SearchResults SearchResults={this.state.SearchResults} onAdd={this.addTrack} />
            <Playlist
            playListName={this.state.playListName}
            playListTracks={this.state.playListTracks}
            onRemove={this.removeTrack}
            onNameChange={this.updatePlayListName}
            onSave={this.savePlaylist}
            />
            </div>
          </div>
      </div>
    );
  }
}

export default App;

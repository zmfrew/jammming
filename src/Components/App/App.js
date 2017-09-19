import React, { Component } from 'react';
import './App.css';
import SearchBar from '../../Components/SearchBar/SearchBar.js';
import SearchResults from '../../Components/SearchResults/SearchResults.js';
import Playlist from '../../Components/Playlist/Playlist.js';
import Spotify from '../../util/Spotify.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playListName: 'New Playlist',
      playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlayListName = this.updatePlayListName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  search(term) {
    console.log(`Searching ${term}.`);
    Spotify.search(term).then(tracks => {
      this.setState({ searchResults: tracks });
    });
  }

  addTrack(track) {
    let tracks = this.state.playListTracks;
    if (!tracks.includes(track)) {
      tracks.push(track);
      this.setState({playListTracks: tracks});
    }
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
    const trackURIs = this.state.playlistTracks.map(playlistTrack => {return playlistTrack.uri;})
      Spotify.createPlaylist(this.state.playlistName, trackURIs).then(this.setState(
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

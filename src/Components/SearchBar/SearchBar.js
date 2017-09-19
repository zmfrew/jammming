import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
      super(props);
      this.state = { term: '' };
      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
  }

  handleTermChange(e) {
    this.setState({ term: e.target.value });
  }

  search() {
      this.props.onSearch(this.state.term);
  }

  render() {
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
// line 23 may be changed to 'onSearch'

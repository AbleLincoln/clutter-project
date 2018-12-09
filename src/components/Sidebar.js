import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MovieNav from './MovieNav';
import { searchMovies } from '../api';
import '../css/Sidebar.css';

export default class Sidebar extends Component {
  state = {
    movies: [],
  };

  static propTypes = {
    // prop: PropTypes,
  };

  searchRef = React.createRef();

  handleKeyUp = event => {
    if (event.key === 'Enter') this.search();
  };

  search = () => {
    // console.log(this.searchRef.current.value);
    searchMovies(this.searchRef.current.value).then(res => {
      this.setState({ movies: res.data });
    });
  };

  render() {
    return (
      <div className="col-md-3 sidebar">
        <div className="input-group">
          <input
            className="form-control"
            type="text"
            name="search"
            id="sidebar__search"
            placeholder="Search"
            ref={this.searchRef}
            onKeyUp={this.handleKeyUp}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" onClick={this.search}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="sidebar__movies">
          <ul>
            {this.state.movies.map(movie => (
              <MovieNav key={movie.id} movie={movie} />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

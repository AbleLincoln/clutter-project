import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import '../css/MovieNav.css';

export default class MovieNav extends Component {
  static propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number,
      overview: PropTypes.string,
      poster_path: PropTypes.string,
      release_date: PropTypes.string,
      title: PropTypes.string,
      tmdb_id: PropTypes.number,
    }),
  };

  render() {
    const { movie } = this.props;
    return (
      <li className="movie-nav">
        <NavLink to={{ pathname: `/${movie.id}`, state: { movie } }}>
          <img src={movie.poster_path} alt={`${movie.title} poster`} />
          <div className="info">
            <h2>{movie.title}</h2>
            <p>{moment(movie.release_date).format('YYYY-M-D')}</p>
          </div>
        </NavLink>
      </li>
    );
  }
}

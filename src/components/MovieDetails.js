import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { getMovie, getCast, IMG_URL } from '../api';
import '../css/MovieDetails.css';

export default class MovieDetails extends Component {
  static propTypes = {
    location: PropTypes.object,
    match: PropTypes.object,
  };

  state = {
    movie: this.props.location.state ? this.props.location.state.movie : {},
    castMembers: [],
  };

  constructor(props) {
    super(props);
    console.log(this.state);
    if (!props.location.state) {
      getMovie(this.props.match.params.id).then(res => {
        this.setState({ movie: res.data });
      });
    }
  }

  componentDidMount() {
    this.fetchCastMembers();
  }

  componentDidUpdate(prevProps) {
    // need to get new cast members iff id param changes to new movie
    if (prevProps.match.params.id !== this.props.match.params.id) {
      // eslint-disable-next-line
      this.setState({ movie: this.props.location.state.movie });
      this.fetchCastMembers();
    }
  }

  fetchCastMembers = () => {
    getCast(this.props.match.params.id).then(res =>
      this.setState({ castMembers: res.data })
    );
  };

  renderCastMembers = () => (
    <div className="cast">
      <h3 className="mb-0 mt-4">Cast</h3>
      <ul>
        {this.state.castMembers
          .filter(actor => !actor.character.includes('uncredited'))
          .slice(0, 4)
          .map(actor => this.renderCastMember(actor))}
      </ul>
    </div>
  );

  renderCastMember = actor => (
    <li key={actor.tmdb_id}>
      <div className="profile-pic">
        <img src={`${IMG_URL}/${actor.profile_path}`} alt={actor.name} />
      </div>
      <p className="mt-1">{actor.name}</p>
      <p className="character">{actor.character}</p>
    </li>
  );

  render() {
    const { movie } = this.state;
    if (!movie.id)
      return (
        <h1 className="loading">
          <FontAwesomeIcon icon={faCircleNotch} spin />
        </h1>
      );
    return (
      <div className="row movie-details">
        <div
          className="bg"
          style={{ backgroundImage: `url(${movie.poster_path})` }}
        />
        <div className="col-md-4 poster">
          <img src={movie.poster_path} alt={`${movie.title} poster`} />
        </div>
        <div className="col-md-8 main-info">
          <h1 className="title mb-4 mt-2">
            {movie.title}{' '}
            <span className="small">
              ({moment(movie.release_date).format('YYYY')})
            </span>
          </h1>
          <p className="overview">{movie.overview}</p>
          {this.state.castMembers.length === 0
            ? null
            : this.renderCastMembers()}
        </div>
      </div>
    );
  }
}

import axios from 'axios';

export const API_URL = 'https://clutter-front-end-interview.herokuapp.com';
export const IMG_URL = 'http://image.tmdb.org/t/p/w185/';

export function searchMovies(searchTerm) {
  return axios.get(`${API_URL}/movies.json`, {
    params: {
      'q[title_cont]': searchTerm,
    },
  });
}

export function getMovie(id) {
  return axios.get(`${API_URL}/movies/${id}.json`);
}

export function getCast(id) {
  return axios.get(`${API_URL}/movies/${id}/cast_members.json`);
}

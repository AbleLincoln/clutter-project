import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';
import MovieDetails from './MovieDetails';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <Switch>
                <Route
                  path="/:id"
                  component={MovieDetails}
                  // render={props => <MovieDetails {...props} />}
                />
              </Switch>
            </div>
            <Sidebar />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

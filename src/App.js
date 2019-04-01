import React, { Component } from 'react';
import './App.css';
import { MovieList } from './main/movies/MovieListItem.js'

import Header from './header/Header'
import Main from './main/Main'
import Movie from './movie/Movie'
import NotFound from "./NotFound";

import { BrowserRouter, Switch, Route } from "react-router-dom"

class App extends Component {
  render() {
    console.log('API key:', process.env.REACT_APP_TMDB_API_KEY);

    return (
        <BrowserRouter>
            <div>
              <Header />
                <Switch>
                    <Route exact path='/' component={Main} />
                    <Route path='/movies/:movieId' component={Movie} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;

import React from "react";
import "./Main.css";
import {GenreContext, details} from './movie-context';

import Navigation from './navigation/Navigation'
import Movies from './movies/Movies'

class Main extends React.Component {
    state = {
        genre: details.genre,
        genres: [],
        year: {
            label: "year",
            min: 1990,
            max: 2019,
            step: 1,
            value: {min: 2000, max: 2019}
        },
        rating: {
            label: "rating",
            min: 0,
            max: 10,
            step: 1,
            value: {min: 8, max: 10}
        },
        runtime: {
            label: "runtime",
            min: 0,
            max: 300,
            step: 15,
            value: {min: 60, max: 120}
        },
        movies: [],
        page: 1,
        movieUrl: `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`,
    }

    _saveStateToLocalStorage = (params) => {
        localStorage.setItem('myMovies.params', JSON.stringify(this.state))
    }

    _getStateFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('myMovies.params'))
    }

    componentDidMount() {
        const savedState = this._getStateFromLocalStorage()
        if(savedState && savedState.movies.length > 0){
            console.log(savedState.movies)
            this.setState({...savedState})
            this._generateUrl(savedState)
        }
        else{
            this._fetchMovies(this.state.movieUrl)
        }
    }

    componentWillUpdate(nextProps, nextState) {
        this._saveStateToLocalStorage()
        if (nextState.movieUrl !== this.state.movieUrl) {
            this._fetchMovies(nextState.movieUrl)
        }
        if (nextState.page !== this.state.page) {
            this.generateUrl(nextState)
        }
    }

    _fetchMovies = (url) => {
        fetch(url)
            .then(response => response.json())
            .then(data => this._storeMovies(data))
            .catch(error => console.log(error));
    }

    setGenres = genres => {
        this.setState({genres})
    }

    onGenreChange = (event) => {
        this.setState({genre: event.target.value})
    }

    onChange = (data) => {
        this.setState({
            [data.type]: {
                ...this.state[data.type],
                value: data.value
            }
        })
    }

    _generateUrl = (params) => {
        const {genre, genres, year, rating, runtime, page} = params;

        console.log(params)
        console.log(genre)
        console.log(genres)
        const selectedGenre = genres.find(ge => ge.name === genre)
        const genreId = selectedGenre.id

        const movieUrl = `https://api.themoviedb.org/3/discover/movie?` +
            `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
            `language=en-US&sort_by=popularity.desc&` +
            `with_genres=${genreId}&` +
            `primary_release_date.gte=${year.value.min}-01-01&` +
            `primary_release_date.lte=${year.value.max}-12-31&` +
            `vote_average.gte=${rating.value.min}&` +
            `vote_average.lte=${rating.value.max}&` +
            `with_runtime.gte=${runtime.value.min}&` +
            `with_runtime.lte=${runtime.value.max}&` +
            `page=${page}&`;

        // const movieUrl = `https://api.themoviedb.org/3/search/movie?` +
        //         `api_key=${process.env.REACT_APP_TMDB_API_KEY}&` +
        //         `language=en-US&sort_by=popularity.desc&` +
        //         `query=spider` +
        //         // `with_genres=${genreId}&`
        //     `year=2010&` +
        //
        //     // `primary_release_year=${year.value.min}&` +
        //         // `primary_release_year.lte=${year.value.max}&` +
        //         // `vote_average.gte=${rating.value.min}&` +
        //         // `vote_average.lte=${rating.value.max}&` +
        //         // `with_runtime.gte=${runtime.value.min}&` +
        //         // `with_runtime.lte=${runtime.value.max}&` +
        //         `page=${page}&`

        console.log('generate URL: ')
        console.log(movieUrl)
        this.setState({movieUrl})
    }

    onSearchButtonClick = () => {
        this.setState({page: 1})
        this._generateUrl(this.state)
    }

    onPageIncrease = () => {
        const nextPage = this.state.page + 1
        if(nextPage <= this.state.totalPages){
            this.setState({page: nextPage})
            this._fetchMovies(this._generateUrl(this.state))
        }
    }

    onPageDecrease = () => {
        const prevPage = this.state.page - 1
        if(prevPage >=1){
            this.setState({page: prevPage})
            this._fetchMovies(this._generateUrl(this.state))
        }
    }

    _storeMovies = (data) => {
        console.log(data.results)
        const movies = data.results.map(result => {
            const {vote_count, id, genre_ids, poster_path, title, vote_average, release_date} = result
            return {vote_count, id, genre_ids, poster_path, title, vote_average, release_date}
        })

        console.log('getting total pages')
        console.log(data.total_pages)

        this.setState({movies, totalPages: data.total_pages})
    }


    render() {
        return (
            <section className="main">
                <GenreContext.Provider value={{genre: this.state.genre, onGenreChange: this.onGenreChange}}>
                    <Navigation
                        onChange={this.onChange}
                        setGenres={this.setGenres}
                        onSearchButtonClick={this.onSearchButtonClick}
                        {...this.state}
                    />
                </GenreContext.Provider>
                <Movies movies={this.state.movies}
                        page={this.state.page}
                        totalPages={this.state.totalPages}
                        onPageIncrease={this.onPageIncrease}
                        onPageDecrease={this.onPageDecrease}
                />
            </section>

        )
    }
}

export default Main
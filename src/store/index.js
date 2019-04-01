import {createStore} from "redux";
import rootReducer from "../reducers/index";
import {setGenres, storeMovies} from "../actions";
// import { forbiddenWordsMiddleware } from "../middleware";
// const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const storeEnhancers =
    // typeof window === 'object' &&
    // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    //         // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    //     }) : compose;


const store = createStore(rootReducer);

const genresURL = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
fetch(genresURL)
    .then(response => response.json())
    .then(data => {
        store.dispatch(setGenres(data.genres))
    })
    .catch(error => console.log(error))

const movieUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
fetch(movieUrl)
        .then(response => response.json())
        .then(data => store.dispatch(storeMovies(data)))
        .catch(error => console.log(error))

    // console.log("Before or after data?");


export default store;
import React from "react";
import "./Movies.css";

import MovieListItem from './MovieListItem'
import Pagination from "./Pagination";

const Movies = ({
                    movies,
                    page,
                    totalPages,
                    onPageIncrease,
                    onPageDecrease
                }) => (
    <section>
        <Pagination
            page={page}
            totalPages={totalPages}
            onPageDecrease={onPageDecrease}
            onPageIncrease={onPageIncrease}/>

        <ul className="movies">
            {movies.map( movie => (
                <MovieListItem key={movie.id} movie={movie} />
            ))}
        </ul>
        <Pagination
            page={page}
            totalPages={totalPages}
            onPageDecrease={onPageDecrease}
            onPageIncrease={onPageIncrease}/>
    </section>
)


export default Movies
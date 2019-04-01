import React from 'react';
import {GenreContext} from '../movie-context';

const Selection = ({genres }) => (
    <GenreContext.Consumer>
        {({genre, onGenreChange}) => (
            <div className="selection">
                <label>Genre</label>
                <select value={genre} onChange={onGenreChange}>

                    { genres.map( genre => (
                        <option value={genre.name} key={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
        )}
    </GenreContext.Consumer>
);

export default Selection
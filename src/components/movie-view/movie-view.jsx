import React from 'react';

export class MovieView extends React.Component {
    
    render () {
        const {movie, onBackClick} = this.props;

        return (
            <div className="movie.view">
               
                <div className="movie-poster">
                    <img src={movie.ImagePath}/>
                </div>
                
                <div className="movie-name">
                    <span className="label">Name: </span>
                    <span className="value">{movie.Name}</span>
                </div>

                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre}</span>
                </div>
                
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Directors}</span>
                </div>

                <div className="movie-actors">
                    <span className="label">Actors: </span>
                    <span className="value">{movie.Actors}</span>
                </div>
                

                <button onClick={() => {onBackClick(null); }}>Back</button>
            </div>
        );
    }
}
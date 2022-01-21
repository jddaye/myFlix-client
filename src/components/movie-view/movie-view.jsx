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

                <Link to={'/genres/${movie.Genre.Name}'}>
                    <Button variant='link'>Genre</Button>
                </Link>
                
                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <div className="movie-director">
                    <span className="label">Director: </span>
                    <span className="value">{movie.Director.Name}</span>
                </div>

                <Link to= {'/directors/${movie.Director.Name}'}>
                    <Button variant='link'>Director</Button>
                </Link>

                <div className="movie-actors">
                    <span className="label">Actors: </span>
                    <span className="value">{movie.Actors.join(", ")}</span>
                </div>
                


                <button onClick={() => {onBackClick(null); }}>Back</button>
            </div>
        );
    }
}
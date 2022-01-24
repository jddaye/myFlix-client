import React from 'react';
import propTypes from 'prop-types';

import axios from 'axios';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

    constructor(props) {
        super(props);

    }

    addFavoriteMovie() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios.post('https://myflyx.herokuapp.com/users/${username}/movies/${this.props.movie._id}', {}, {
            headers: { Authorization: 'Bearer ${token}' },
            method: 'POST'
        })
            .then(response => {
                alert('Added to Favorites List')
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    keypressCallback(event) {
        console.log(event.key);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.keypressCallback);
    }

    componentWillUnmount() {
        document.removeEventListener('keypress', this.keypressCallback);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null,
        });
        window.open('/', '_self');
    }


    
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
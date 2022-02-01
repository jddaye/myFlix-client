import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom';

//SCSS import
import "./movie-card.scss";

export class MovieCard extends React.Component {
    render() {
        const {movie, onBackClick} = this.props;

        return (
            <Card style={{marginTop: 20, marginBottom: 15 }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    
                    <Card.Title> {movie.Name} </Card.Title>
                    <Card.Text> {movie.Genre} </Card.Text>
                    <Card.Text> {movie.Description} </Card.Text>
                    
                    <Link to= {`/movies/${movie._id}`}>
                        <Button variant="link">Open</Button>
                    </Link>

                    <Link to={`/directors/${movie.Director.Name}`}>
                        <Button variant="link">Director</Button>
                    </Link>

                    <Link to={`/actors/${movie.Actor}`}>
                        <Button variant="link">Actor</Button>
                    </Link>

                    <Link to={`/genres/${movie.Genre}`}>
                        <Button variant="link">Genre</Button>
                    </Link>

                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Bio: PropTypes.string.isRequired
        }),
        Actor: PropTypes.shape({
            Name: PropTypes.string.isRequired,
            Movie: PropTypes.string.isRequired
        }),
        Genre: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    // onMovieClick: PropTypes.func.isRequired
};
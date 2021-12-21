import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//SCSS import
import "./movie-card.scss";

export class MovieCard extends React.Component {
    render() {
        const {movie, onMovieClick} = this.props;

        return (
            <Card style={{marginTop: 50, marginBottom: 15 }}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title> {movie.Name} </Card.Title>
                    <Card.Text> {movie.Genre} </Card.Text>
                    <Card.Text> {movie.Description} </Card.Text>
                    <Button onClick= {() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        );
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Directors: PropTypes.string.isRequired,
        Actors: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }),
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
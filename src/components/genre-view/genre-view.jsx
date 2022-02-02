import React from "react";
import PropTypes from "prop-types";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./genre-view.scss";
import axios from "axios";

export class GenreView extends React.Component {

    constructor(){
        super();

        this.state={
            genre:null,
        };
    }

    render() {
        const {onBackClick, movies } = this.props;
        const {Genre} = this.state;

        return (
            <Container>
                <br />
                <Card align="center">
                    <br />
                    <h2>{Genre}</h2>
                    <Card.Body>
                        <div>
                            <span className="label">Description: </span>
                            <span className="value">{Genre}</span>
                        </div>
                        
                        <br />
                        <div className="backButton">
                            <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

GenreView.propTypes = {
    // Genre: PropTypes.shape({
    //     Name: PropTypes.string.isRequired,
    //     Description: PropTypes.string.isRequired,
    // }).isRequired,
    Genre: PropTypes.string.isRequired,
};
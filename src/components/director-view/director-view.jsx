import React from "react";
import PropTypes from "prop-types";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
    render() {
        const { Director, onBackClick, movies } = this.props;

        return (
            <Container>
                <br />
                <Card align="center">
                    <h2>Director</h2>
                    <Card.Body>
                        <div>
                            <span className="label">Name: </span>
                            <span className="value">{Director.Name}</span>
                        </div>

                        <div>
                            <span className="label">Biography: </span>
                            <span className="value">{Director.Bio}</span>
                        </div>
                        <div>

                            <span className="label">Movies: </span>
                            <span className="value">{Director.Movies.Name}</span>
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

DirectorView.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Movies: PropTypes.string,
    }).isRequired,
};
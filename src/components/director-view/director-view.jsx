import React from "react";
import PropTypes from "prop-types";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {

    getDirector(token){
        axios.get(`https://myflyx.herokuapp.com/genre/${props.match.params.directorName}`, {
            headers: {Authorization: `Bearer${token}`}
        })
        .then(response => {
            this.setState({
                    director:response.data
                });
        })
        .catch(function(error){
            console.log(error);
        });
    }

    componentDidMount(){
        let accessToken= localStorage.getItem('token');
        if (accessToken !== null){
            this.getDirector(accessToken);
        }
    }

    render() {
        const { onBackClick, movies } = this.props;
        const { Director } = this.state;

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
                            <span className="value">{Director.Movies}</span>
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
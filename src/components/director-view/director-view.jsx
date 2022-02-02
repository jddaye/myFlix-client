import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class Director extends React.Component {

    state = {
        Director: null
    }

    getDirector(token){
        axios.get(`https://myflyx.herokuapp.com/directors/${this.props.match.params.Name}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                    Director:response.data
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
                    {Director && (<Card.Body>
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
                            {typeof Director.Movies == 'string'? (<span className="value"> {Director.Movies} </span>) 
                                : Director.Movies.map((movie, idx) =>
                                <span className="value" key={idx}> 
                                    {movie}{idx < Director.Movies.length-1? ", ": ""}
                                </span>)
                            }
                        </div>

                        <br />
                        <div className="backButton">
                            <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>)
                    }
                </Card>
            </Container>
        );
    }
}

Director.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Movies: PropTypes.string,
    }).isRequired,
};


export const DirectorView = withRouter(Director);
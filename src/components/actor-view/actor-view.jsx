import React from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import { withRouter } from "react-router";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./actor-view.scss";

class Actor extends React.Component {

    state = {
        Actor: null
    }
    getActor(token){
        axios.get(`https://myflyx.herokuapp.com/actors/${this.props.match.params.Name}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                    Actor:response.data
                });
        })
        .catch(function(error){
            console.log(error);
        });
    }

    componentDidMount(){
        let accessToken= localStorage.getItem('token');
        if (accessToken !== null){
            this.getActor(accessToken);
        }
    }

    render() {
        const { onBackClick, movies } = this.props;
        const { Actor } = this.state;

        return (
            <Container>
                <br />
                <Card align="center">
                    <h2>Actor</h2>
                    {Actor && (<Card.Body>
                        <div>
                            <span className="label">Name: </span>
                            <span className="value">{Actor.Name}</span>
                        </div>

                        <div>

                            <span className="label">Movies: </span>
                            {typeof Actor.Movies == 'string'? (<span className="value"> {Actor.Movies} </span>) 
                            : Actor.Movies.map((movie, idx) =>
                                <span className="value" key={idx}> 
                                    {movie}{idx < Actor.Movies.length-1? ", ": ""}
                                </span>)
                            }
                        </div>

                        <br />
                        <div className="backButton">
                            <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>)}
                </Card>
            </Container>
        );
    }
}

Actor.proptypes = {
    Actor: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Movies: PropTypes.string,
    }).isRequired,
};


export const ActorView = withRouter(Actor);
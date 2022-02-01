import React from "react";
import PropTypes from "prop-types";

import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./actor-view.scss";

export class ActorView extends React.Component {

    getActor(token){
        axios.get(`https://myflyx.herokuapp.com/actor/${props.match.params.actorName}`, {
            headers: {Authorization: `Bearer${token}`}
        })
        .then(response => {
            this.setState({
                    actor:response.data
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
        const { Director } = this.state;

        return (
            <Container>
                <br />
                <Card align="center">
                    <h2>Actor</h2>
                    <Card.Body>
                        <div>
                            <span className="label">Name: </span>
                            <span className="value">{Actor}</span>
                        </div>

                        <div>

                            <span className="label">Movies: </span>
                            <span className="value">{Actor.Movies}</span>
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

ActorView.proptypes = {
    Actor: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Movies: PropTypes.string,
    }).isRequired,
};
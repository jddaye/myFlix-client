import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./genre-view.scss";
import axios from "axios";

class Genre extends React.Component {

    constructor(props){
        super(props);
        this.state={
            Genre:null,
        };
    }

    getGenre(token){
        axios.get(`https://myflyx.herokuapp.com/genres/${this.props.match.params.Name}`, {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.setState({
                    Genre:response.data
                });
        })
        .catch(function(error){
            console.log(error);
        });
    }

    componentDidMount(){
        let accessToken= localStorage.getItem('token');
        if (accessToken !== null){
            this.getGenre(accessToken);
        }
    }

    render() {
        const {onBackClick, movies } = this.props;
        const {Genre} = this.state;

        return (
            <Container>
                <br />
                {Genre && (<Card align="center">
                    <br />
                    <h2>{Genre.Name}</h2>
                    <Card.Body>
                        <div>
                            <span className="label">Description: </span>
                            <span className="value">{Genre.Description}</span>
                        </div>
                        
                        <br />
                        <div className="backButton">
                            <Button size="md" variant="outline-primary" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                </Card>)}
            </Container>
        );
    }
}

Genre.propTypes = {
    // Genre: PropTypes.shape({
    //     Name: PropTypes.string.isRequired,
    //     Description: PropTypes.string.isRequired,
    // }).isRequired,
    Genre: PropTypes.string.isRequired,
};

export const GenreView = withRouter(Genre);
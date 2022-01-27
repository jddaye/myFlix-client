import React, {useState} from 'react';
import {Form, Card, CardGroup, Container, Col, Row, Button} from 'react-bootstrap';

//SCSS import
import "./login-view.scss";

//axios import
import axios from 'axios';

import {Link} from 'react-router-dom';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        //Send a request to the server for authentication
        axios.post('https://myflyx.herokuapp.com/login', {
            Username: username,
            Password: password
        })
        .then(response => {
            const data = response.data;
            props.onLoggedIn(data);
        })
        .catch(e => {
            console.log('no such user')
        });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card style={{marginTop: 150, marginBottom: 50 }}>
                            <Card.Title>Please Login</Card.Title>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={username}
                                            onChange={e => setUsername(e.target.value)} 
                                            required
                                            placeholder="Enter a username"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Passsword</Form.Label>
                                        <Form.Control 
                                            type="password"
                                            value={password} 
                                            onChange={e => setPassword(e.target.value)} 
                                            required
                                            minLength="8"
                                            placeholder="Enter a password"    
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    <div className='mt-3'>
                                        <Link to="/register">
                                            Register as new user
                                        </Link>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    )
}
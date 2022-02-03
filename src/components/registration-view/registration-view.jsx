import React, {useState} from 'react';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

import axios from 'axios';

import {Link} from 'react-router-dom';

//import SCSS
import "./registration-view.scss"
import { propTypes } from 'prop-types';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ birthday, setBirthday ] = useState('');
    const [ email, setEmail ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://myflyx.herokuapp.com/users', {
            Username: username,
            Password: password, 
            Birthday: birthday,
            Email: email,
        })
        .then(response => {
            const data = response.data;
            console.log(data);
            alert('Registration successful');
            window.open('/', '_self');
        })
        .catch(e => {
            console.log('error registering the user')
        });

    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Card.Title>Please Register</Card.Title>
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
                                            placeholder="Password must be 8 characters or more"    
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={email}
                                            onChange={e => setEmail(e.target.value)} 
                                            required
                                            placeholder="Enter an email"
                                        />
                                    </Form.Group>

                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                    <div className='mt-3'>
                                        <Link to={"/"}>
                                            Log in
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

// RegistrationView.propTypes= {
//     registration: propTypes.shape({
//         Username: propTypes.string.isRequired,
//         Password: propTypes.string.isRequired,
//         Email: propTypes.string.isRequired,
//         Birthday: propTypes.string,
//     }),

//     onRegistration: propTypes.func,
// };
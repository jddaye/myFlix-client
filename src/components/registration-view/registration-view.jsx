import React, {useState} from 'react';
import {Form, Button, Card, CardGroup, Container, Col, Row} from 'react-bootstrap';

//import SCSS
import "./registration-view.scss"

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = usePassword('');
    const [ birthday, setBirthday ] = useBirthday('');
    const [ email, setEmail ] = useEmail('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, birthday, email);

        props.onLoggedIn(username);
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
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
        
    )
}
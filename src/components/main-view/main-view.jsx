import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';

import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ProfileView} from "../profile-view/profile-view";
import {NavBarView} from "../navbar-view/navbar-view";

import Row from 'react-bootstrap/Row';
import { Container, Col } from 'react-bootstrap';

export class MainView extends React.Component {

    constructor(){
        super();
        
        this.state= {
            movies: [],
            seletedMovie: null,
            user: null
        };
    }

    getMovies(token) {
        axios.get('http://myflyx.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            //Assign the result to the state
            this.setState({
                movies: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    //When a user successfully logs in, this function updates the 'user' property in state to that particular user
    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    //When a movie is clicked, this function is called and updates the state of the 'selectedMovie' property to that movie
    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    render() {

        const {movies, selectedMovie, user} = this.state;
    
        return (
            <Router>
                <Route path='/' render={() => {
                    if (user) return <Row>
                        <Col md={12} style={{ padding: 0 }}>
                            <NavBarView />
                        </Col>
                    </Row>
                }} />
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        return movies.map(m => (
                            <Col md={3} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                         ))
                        }} />
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        return <Col md={8}>
                            <MovieView onBackClick={() => history.goBack()} movie={movies.find(m => m._id === match.params.movieId)} />
                        </Col>
                        }} />
                    <Route path='/register' render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />
                <Route
                        path="/directors/:Name"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <DirectorView
                                        Director={
                                            movies.find(
                                                (m) => m.Director.Name === match.params.Name
                                            ).Director
                                        }
                                        movies={movies}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        path="/actors/:Name"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <ActorView
                                        Actor={
                                            movies.find(
                                                (m) => m.Actor.Name === match.params.Name
                                            ).Actor
                                        }
                                        movies={movies}
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />  

                    <Route
                        path="/genres/:Name"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <Col md={8}>
                                    <GenreView
                                        movies={movies}
                                        Genre={
                                            movies.find((m) => m.Genre === match.params.Name)
                                                .Genre
                                        }
                                        onBackClick={() => history.goBack()}
                                    />
                                </Col>
                            );
                        }}
                    />

                    <Route
                        exact
                        path="/users/:Username"
                        render={({ match, history }) => {
                            if (!user)
                                return (
                                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                                );
                            if (movies.length === 0) return <div className="main-view" />;
                            return (
                                <ProfileView
                                    history={history}
                                    movies={movies}
                                    user={user}
                                    onBackClick={() => history.goBack()}
                                />
                            );
                        }}
                    />
                </Row>
            </Router>
          );
    
    }
}
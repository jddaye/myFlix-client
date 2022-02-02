import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {connect} from 'react-redux';

import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';

import {setMovies, setUser} from '../../actions/actions';
import MoviesList from '../movie-list/movie-list';

import {RegistrationView} from '../registration-view/registration-view';
import {LoginView} from '../login-view/login-view';
import {MovieCard} from '../movie-card/movie-card';
import {MovieView} from '../movie-view/movie-view';
import {DirectorView} from '../director-view/director-view';
import {GenreView} from '../genre-view/genre-view';
import {ActorView} from '../actor-view/actor-view';
import {ProfileView} from "../profile-view/profile-view";
import {NavBarView} from "../navbar-view/navbar-view";
import Row from 'react-bootstrap/Row';
import { Container, Col } from 'react-bootstrap';

class MainView extends React.Component {

    constructor(){
        super();
        
        this.state= {
            user: null
        };
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

    getMovies(token) {
        axios.get('https://myflyx.herokuapp.com/movies', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.props.setMovies(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getUser(token) {
        axios.get('https://myflyx.herokuapp.com/users/${user}', {
            headers: {Authorization: `Bearer ${token}`}
        })
        .then(response => {
            this.props.setUser({
                username: response.data.Username,
                password: response.data.Password, 
                email: response.data.Email,
                birthday: response.data.Birthday,
                favoriteMovies: response.data.favoriteMovies
            });
        })
        .catch(function (error) {
            console.log(error);
        });
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

        const {selectedMovie, username, password, email, birthday, favorieMovies, register} = this.state;
    
        let {movies}= this.props;
        let {user}= this.state

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)}/>
                        </Col>
                        if (movies.length === 0) return <div className="main-view"/>;
                        return <MoviesList movies={movies}/>
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
                                        Actors={
                                            movies.find(
                                                (m) => m.Actors.Name === match.params.Name
                                            ).Actors
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

let mapStateToProps = state => {
    return {movies: state.movies}
}

export default connect(mapStateToProps, {setMovies})(MainView);
/* eslint-disable arrow-body-style */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable react/prefer-stateless-function */
import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';

import GithubState from './context/github/GithubState';

import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    // search gitHub users
    const searchUsers = async (text) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/search/users?q=${text}
            &client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        setUsers(res.data.items);
        setLoading(false);
    };

    // get single github users
    const getUser = async (username) => {
        setLoading(true);

        const res = await axios.get(
            `https://api.github.com/users/${username}
            ?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        setUser(res.data);
        setLoading(false);
    };

    // get users repositories
    const getUserRepos = async (username) => {
        setLoading(false);

        const res = await axios.get(
            `https://api.github.com/users/${username}
			/repos?per_page=5
			&sort=created:asc
			&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}
            &client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
        );

        setRepos(res.data);
        setLoading(false);
    };

    // clear users from state
    const clearUsers = () => {
        setUsers([]);
        setLoading(false);
    };

    // set alert
    const showAlert = (msg, type) => {
        setAlert({ msg, type });

        setTimeout(() => {
            setAlert(null);
        }, 2000);
    };

    return (
        <GithubState>
            <Router>
                <div className="App">
                    <Navbar />
                    <div className="container">
                        <Alert alert={alert} />
                        <Switch>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Fragment>
                                        <Search
                                            searchUsers={searchUsers}
                                            clearUsers={clearUsers}
                                            showClear={
                                                (users.length === 0) === false
                                            }
                                            setAlert={showAlert}
                                        />

                                        <Users
                                            loading={loading}
                                            users={users}
                                        />
                                    </Fragment>
                                )}
                            />
                            <Route exact path="/about" component={About} />
                            <Route
                                exact
                                path="/user/:login"
                                render={(props) => (
                                    <User
                                        {...props}
                                        getUser={getUser}
                                        getUserRepos={getUserRepos}
                                        user={user}
                                        repos={repos}
                                        loading={loading}
                                    />
                                )}
                            />
                        </Switch>
                    </div>
                </div>
            </Router>
        </GithubState>
    );
};

export default App;
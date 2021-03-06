import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./Screens/Home";
import DashBoard from "./Screens/DashBoard";
import history from './history';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={DashBoard} />
                    <Route path="/Home" component={Home} />
                </Switch>
            </Router>
        )
    }
}

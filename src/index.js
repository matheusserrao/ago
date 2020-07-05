import React from 'react'
import ReactDOM from 'react-dom'

import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom'

import Daily from './components/pages/Daily/Daily'
import Login from './components/pages/Login/Login'

const PageNotFound = () => <h1>Página não encontrada</h1>


const routing = (
    <Router>
        <Switch>
            <Route exact path="/" component={Login}></Route>
            <Route exect path="/home" component={Daily}></Route>
            <Route component={PageNotFound}></Route>
        </Switch>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))


import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Home from './components/Home';
import ConfirmEmail from './containers/ConfirmEmail';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/confirm-email/:token" component={ConfirmEmail} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

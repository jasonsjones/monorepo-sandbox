import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Signup from './containers/Signup';
import Home from './components/Home';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/signup" component={Signup} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

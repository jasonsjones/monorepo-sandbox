import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Banner from './components/Banner/';
import Home from './components/Home';

function App() {
    return (
        <BrowserRouter>
            <Banner />
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                </Switch>
            </Layout>
        </BrowserRouter>
    );
}

export default App;

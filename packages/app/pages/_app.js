import App, { Container } from 'next/app';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';

class MyApp extends App {
    render() {
        const { Component } = this.props;
        return (
            <Container>
                <Head>
                    <title>MonoRepo Sandbox</title>
                </Head>
                <Layout>
                    <Component />
                </Layout>
            </Container>
        );
    }
}

export default MyApp;

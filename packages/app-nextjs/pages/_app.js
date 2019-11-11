import { Fragment } from 'react';
import App from 'next/app';
import Head from 'next/head';

import Layout from '../components/Layout/Layout';

class MyApp extends App {
    static async getInitialProps({ ctx }) {
        let token = null;
        if (ctx.req && ctx.req.headers) {
            const { cookie } = ctx.req.headers;
            const parts = cookie ? cookie.split(';') : [];
            const accessToken = parts.map(i => i.trim()).filter(j => j.startsWith('access-token'));
            token = accessToken.length > 0 ? accessToken[0].split('=')[1] : '';
        }

        return {
            token
        };
    }
    render() {
        const { Component, token } = this.props;
        return (
            <Fragment>
                <Head>
                    <title>MonoRepo Sandbox</title>
                </Head>
                <Layout accessToken={token}>
                    <Component />
                </Layout>
            </Fragment>
        );
    }
}

export default MyApp;

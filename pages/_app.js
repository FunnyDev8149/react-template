import React, { useEffect } from "react";
import withRedux from "next-redux-wrapper";
import withReduxSaga from 'next-redux-saga';

import Helmet from "react-helmet";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import makeStore from "../store";
import Layout from '../components/layout';

import { actions as DemoAction } from "../store/demo";

import "../public/sass/style.scss";

const App = ( { Component, pageProps, store } ) => {

    useEffect( () => {
        if ( store.getState().demo.current !== 4 ) {
            store.dispatch( DemoAction.refreshStore( 4 ) );
        }
    }, [] )

    return (
        <Provider store={ store }>
            <PersistGate
                persistor={ store.__persistor }
                loading={ <div className="loading-overlay">
                    <div className="bounce-loader">
                        <div className="bounce1"></div>
                        <div className="bounce2"></div>
                        <div className="bounce3"></div>
                    </div>
                </div> }>
                <Helmet>
                    <meta charSet="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                    <title>temp - React eCommerce Template</title>

                    <meta name="keywords" content="React Template" />
                    <meta name="description" content="temp - React eCommerce Template" />
                    <meta name="author" content="SW-THEMES" />
                </Helmet>

                <Layout>
                    <Component { ...pageProps } />
                </Layout>
            </PersistGate>
        </Provider >
    )
};

App.getInitialProps = async ( { Component, ctx } ) => {
    let pageProps = {};
    if ( Component.getInitialProps ) {
        pageProps = await Component.getInitialProps( ctx );
    }
    return { pageProps };
};

export default withRedux( makeStore )( withReduxSaga( App ) );

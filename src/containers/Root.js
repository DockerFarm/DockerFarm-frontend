import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from 'containers/App';
import store from 'store';



const Root = () => (
    <Provider store={store}>
        <Router>
            <App/>
        </Router> 
    </Provider>
)


export default Root;
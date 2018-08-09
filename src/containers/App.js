import React, { Component } from 'react';
import Routes from './routes';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Loader } from 'components/base/common';
import { toast, ToastContainer } from 'react-toastify';
import { withErrorHandler } from 'components/hoc';
import 'react-toastify/dist/ReactToastify.css';
// import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    

    render() {
        return (
            <div>
                <Routes/>
                <Loader/>
                <ToastContainer 
                    position={toast.POSITION.RIGHT}
                    hideProgressBar={true}
                    autoClose={2000} 
                />
            </div>
        );
    }
}

export default compose(
    withRouter,
    withErrorHandler
)(App);
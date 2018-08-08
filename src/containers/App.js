import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import * as user from 'store/modules/user';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Loader } from 'components/base/common';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'semantic-ui-css/semantic.min.css';

class App extends Component {
    

    //UserInfo load
    async componentWillMount() {
        const { UserAction } = this.props;
        try{ 
            await UserAction.selectMyInfo();
        }catch(e) {

        }
    }

    render() {
        return (
            <div>
                <Routes/>
                <Loader/>
                <ToastContainer 
                    position={toast.POSITION.RIGHT}
                    hideProgressBar={true}
                    autoClose={1000} 
                />
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect( 
        null,
        dispatch => ({ 
            UserAction: bindActionCreators(user, dispatch)
        }
    ))
)(App);
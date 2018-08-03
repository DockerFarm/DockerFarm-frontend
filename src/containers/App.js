import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Routes from './routes';
import * as user from 'store/modules/user';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Spinner } from 'components/base/ui';
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
        // const { pending } = this.props;
        // const isLoading = Object.keys(pending).filter( k => pending[k] ).length;
        return (
            <div>
                <Routes/>
                {/* <Spinner visible={isLoading}/> */}
            </div>
        );
    }
}

export default compose(
    withRouter,
    connect( 
        null,
        // state => ({
        //     pending: state.pender.pending
        // }),
        dispatch => ({ 
            UserAction: bindActionCreators(user, dispatch)
        }
    ))
)(App);
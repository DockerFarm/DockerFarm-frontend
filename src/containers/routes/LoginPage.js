import React, { Component } from 'react';
import config from 'config';
import { center } from 'styles/style-utils';
import { LoginForm } from 'components/LoginPage';
import { Logo } from 'components/base/ui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActionCreators } from 'redux';
import * as auth from 'store/modules/auth';
import * as user from 'store/modules/user';
import { compose } from 'recompose';

const Wrapper = styled.div`
    background: #2f2f2f;    
    height:100vh;
    ${center}
`;

const StyledForm = styled.div`
    width:400px;
    margin:0 auto;
    background: white;
    border-radius: 3px;
    min-height: 300px;
    padding:10px;
`

const CenterLogo = styled(Logo)`
    display:block;
    margin:10px auto;
`
class LoginPage extends Component {

    componentDidMount() {
        const { AuthAction } = this.props;
        AuthAction.init();
    }

    submit = async form => {
        const { AuthAction, UserAction, history } = this.props;
        try {
            const data = await AuthAction.login(form.toJS());
            await UserAction.selectMyInfo();
            alert('Login Success');
            history.push('/admin');
        } catch(e) {

        }
    }

    onGithubLogin = () => {
        window.location.href = `${config.backendUrl}/auth/github`;
    }


    onGoogleLogin = () => {
        window.location.href = `${config.backendUrl}/auth/google`
    }

    render() {
        const { error } = this.props;
        return (
            <Wrapper>
                <StyledForm>
                    <div>
                        <CenterLogo/>
                    </div>
                    <LoginForm
                        onSubmit={this.submit}
                        onGithubLogin={this.onGithubLogin}
                        onGoogleLogin={this.onGoogleLogin}
                        serverError={error}
                    />
                </StyledForm>
            </Wrapper>
        )
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            error: state.auth.getIn(['error','message'])
        }),
        dispatch => ({
            AuthAction: bindActionCreators(auth, dispatch),
            UserAction: bindActionCreators(user, dispatch)
        })
    )
)(LoginPage);
import React, { Component } from 'react';
import { center } from 'styles/style-utils';
import { LoginForm } from 'components/LoginPage';
import { Logo } from 'components/base/ui';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

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

    submit = form => {
       console.log(form.values); 
    }

    render() {
        return (
            <Wrapper>
                <StyledForm>
                    <div>
                        <CenterLogo/>
                    </div>
                    <LoginForm
                        onSubmit={this.submit}
                    />
                </StyledForm>
            </Wrapper>
        )
    }
}

export default withRouter(connect(
    state => ({
        
    }),
    dispatch => ({

    })
)(LoginPage));
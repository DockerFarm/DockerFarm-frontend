import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { submit, reset } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Aux } from 'components/hoc';
import { bindActionCreators } from 'redux';
import { SectionHeader } from 'components/base/ui/header';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import EndpointForm from './EndpointForm';
import styled from 'styled-components';
import * as endpoint from 'store/modules/endpoint';
import * as user from 'store/modules/user';


const ButtonWrapper = styled.div`
    overflow:hidden;
`

class EndpointEditPage extends Component {

    submit = async form => {
        const { 
            EndpointAction, 
            UserAction, 
            history, 
            match, 
            intl 
        } = this.props;
        try {
            await EndpointAction.updateEndpoint(match.params.id, form.toJS());
            toast.success(intl.formatMessage({id: 'EP_MSG_UPDATE'}));
            await UserAction.selectMyInfo();
            history.push('/admin/endpoints');
        } catch(e) {
        
        }
    }

    deleteEndpoint = async id => {
        const { 
            EndpointAction, 
            UserAction,
            history,
            match, 
            intl 
        } = this.props;

        try {
            await EndpointAction.deleteEndpoint(match.params.id);
            toast.success(intl.formatMessage({id: 'EP_MSG_DELETE'}));
            await UserAction.selectMyInfo();
            history.push('/admin/endpoints');
        } catch(e) {

        }
    }

    triggerSubmit = _ => {
        const { save } = this.props;
        save();
    }

    clearForm = _ => {
        const { reset } = this.props;
        reset();
    }


    render() {
        const {
            intl
        } = this.props;

        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'EP_EDIT_HEADER'})}
                    icon='plug'
                />

                <Segment>
                    <EndpointForm
                        onSubmit={this.submit}
                    />
                    <ButtonWrapper>
                        <Button.Group floated='right'>
                            <Button
                                size='tiny'
                                as={Link}
                                to='/admin/endpoints'
                            >
                                <Icon name='list' />
                                {intl.formatMessage({id: 'BTN_LIST'})}
                            </Button>
                            <Button
                                size='tiny'
                                type='button'
                                onClick={this.clearForm}
                            >
                                <Icon name='sync' />
                                {intl.formatMessage({id: 'BTN_RESET'})}
                            </Button>
                            <Button
                                size='tiny'
                                type='button'
                                color='red'
                                onClick={this.deleteEndpoint}
                            >
                                <Icon name='trash' />
                                {intl.formatMessage({id: 'BTN_DELETE'})}
                            </Button>
                            <Button
                                size='tiny'
                                color='teal'
                                type='button'
                                onClick={this.triggerSubmit}
                            >
                                <Icon name='checkmark' />
                                {intl.formatMessage({id: 'BTN_SAVE'})}
                            </Button>
                        </Button.Group>
                    </ButtonWrapper>
                </Segment>
            </Aux>
        )
    }
}


export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
            
        }),
        dispatch => ({
            EndpointAction: bindActionCreators(endpoint, dispatch),
            UserAction: bindActionCreators(user, dispatch),
            reset: _ => {
                dispatch(reset('endpoint'))
            },
            save: _ => { 
                dispatch(submit('endpoint'))
            }
        })
    )
)(EndpointEditPage);
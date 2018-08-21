import React, { Component } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { SectionHeader } from 'components/base/ui/header';
import { submit, reset } from 'redux-form/immutable';
import RegistryForm from './RegistryForm';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import * as registry from 'store/modules/registry';

import { Aux } from 'components/hoc';

const ButtonWrapper = styled.div`
    overflow:hidden;
`

class RegistryFormPage extends Component {
    
    componentDidMount() {
        this.clearForm();
    }

    submit = async form => {
        const { RegistryAction, history } = this.props;

        try {
            await RegistryAction.createRegistry(form.toJS());
            toast.success('Registry create success!'); 
            history.push('/admin/registries');
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
        return (
            <Aux>
                <SectionHeader 
                    title='Create Registry'
                    icon='database'
                />
                <Segment>
                    <RegistryForm
                        onSubmit={this.submit}
                    />
                    <ButtonWrapper>
                        <Button.Group floated='right'>
                            <Button
                                size='tiny'
                                as={Link}
                                to='/admin/registries'
                            >
                                <Icon name='list' />
                                List
                            </Button>
                            <Button
                                size='tiny'
                                type='button'
                                onClick={this.clearForm}
                            >
                                <Icon name='sync' />
                                Reset
                            </Button>
                            <Button
                                size='tiny'
                                color='teal'
                                type='button'
                                onClick={this.triggerSubmit}
                            >
                                <Icon name='checkmark' />
                                Save
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
    connect(
        state => ({

        }),
        dispatch => ({
            RegistryAction: bindActionCreators(registry, dispatch),
            reset: _ => {
                dispatch(reset('registry'))
            },
            save: _ => { 
                dispatch(submit('registry'))
            }
        })
    )    
)(RegistryFormPage);
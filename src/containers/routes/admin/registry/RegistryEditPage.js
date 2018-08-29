import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import RegistryForm from './RegistryForm';
import { Segment, Button, Icon } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { reset, initialize, submit } from 'redux-form/immutable';
import * as registry from 'store/modules/registry';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
    overflow:hidden;
`

class RegistryEditPage extends Component {

    async componentDidMount() {
        const { RegistryAction, setForm, match } = this.props;
        
        try { 
            await RegistryAction.getRegistryInfo(match.params.id);            
            setForm(this.props.inspectData.toJS());
        } catch(e) {

        }
    }

    submit = async form => {
        const { RegistryAction, match, history } = this.props;

        try { 
            await RegistryAction.updateRegistry(match.params.id, form.toJS())
            toast.success('Registry update success!'); 
            history.push('/admin/registries');
        } catch(e) {

        }
    }

    delete = async _ => {
        const { RegistryAction, match, history } = this.props;
        
        try {
            await RegistryAction.deleteRegistry(match.params.id);
            toast.success('Registry delete success!');
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
        const { intl } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'REG_INFO_HEADER'})}
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
                                onClick={this.delete}
                            >
                                <Icon name='trash'/>
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
            inspectData: state.registry.get('inspectData')
        }),
        dispatch => ({
            RegistryAction: bindActionCreators(registry, dispatch),
            setForm: data => {
                dispatch(initialize('registry',data));
            },
            reset: _ => {
                dispatch(reset('registry'))
            },
            save: _ => { 
                dispatch(submit('registry'))
            }
        })
    )
)(RegistryEditPage);
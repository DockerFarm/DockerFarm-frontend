import React, { Component } from 'react';
import { destroy } from 'redux-form/immutable';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Aux } from 'components/hoc';
import { Step, Segment } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as container from 'store/modules/container';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

class ContainerNewPage extends Component {

    componentWillUnmount() {
        const { formDestroy, ContainerAction, history } = this.props;
        if( history.location.pathname.indexOf('/admin/containers/new') === -1 ) {
            ContainerAction.setStep([]);
            ['step1', 'step2', 'container'].forEach(formDestroy);
        }
    }

    render() {
        const {
            match,
            intl
        } = this.props;

        const stepArr = [
            {
                title: intl.formatMessage({id: 'CON_STEP1_TITLE'}),
                description: intl.formatMessage({id: 'CON_STEP1_DESC'}) 
            },
            {
                title: intl.formatMessage({id: 'CON_STEP2_TITLE'}),
                description: intl.formatMessage({id: 'CON_STEP2_DESC'}) 
            },
            {
                title: intl.formatMessage({id: 'CON_STEP3_TITLE'}),
                description: intl.formatMessage({id: 'CON_STEP3_DESC'}) 
            }
        ];

        const steps = this.props.steps.toJS();

        return (
            <Aux>
                <Step.Group ordered>
                    {
                        stepArr.map((v,i) => (
                            <Step 
                                key={i}
                                completed={steps.indexOf(i+1) !== -1}>
                                <Step.Content>
                                    <Step.Title>{v.title}</Step.Title>
                                    <Step.Description>{v.description}</Step.Description>
                                </Step.Content>
                            </Step>
                        ))
                    }
                </Step.Group>
                <Segment>
                    <Switch>
                        <Route path={`${match.path}/step1`} component={Step1}/>     
                        <Route path={`${match.path}/step2`} component={Step2}/>     
                        <Route path={`${match.path}/step3`} component={Step3}/>     
                    </Switch> 
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
            steps: state.container.get('steps')
        }),
        dispatch => ({
            ContainerAction: bindActionCreators(container, dispatch),
            formDestroy: name => dispatch(destroy(name))
        })
    )
)(ContainerNewPage)

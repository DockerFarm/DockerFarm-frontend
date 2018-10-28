import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { FormHeader } from 'components/base/ui/header'
import { ControlInput, ControlOptions } from 'components/base/form';

import * as network from 'store/modules/network';
import { ControlSelectbox } from '../../../../../../components/base/form';

const hostValueComponent = fields => (opts, index) => (
    <Form.Group key={index}>
        <Form.Field width={7}>
            <Field 
                name={`${opts}.value`}
                type='text'
                placeholder=''
                component={ControlInput}
                inputLabel='value'
            />
        </Form.Field>
        <Form.Field width={1}>
            <div style={{marginTop: '5px'}}>
                <Button 
                    color='red' 
                    icon='trash'
                    size='tiny'
                    type='button'
                    onClick={() => fields.remove(index)}
                />
            </div>
        </Form.Field>
    </Form.Group>
)
class Step3 extends Component {

    async componentDidMount() {
        const { NetworkAction } = this.props;

        try { 
            await NetworkAction.getNetworkList();
        } catch (e) {

        }
    }

    render() {
        const { 
            intl,
            networkList
        } = this.props;
        return (
           <Aux>
                <FormHeader 
                    title={intl.formatMessage({id: 'CON_STEP3_NET_HEADER'})}
                    icon='sitemap'
                />
                <Form.Group>
                    <Form.Field width={6}>
                        <Field
                            label='Network'
                            name='network'
                            options={networkList.toJS().map( v => ({ key: v.id, text: v.name, value: v.id}))}
                            component={ControlSelectbox}
                        />
                    </Form.Field>
                    <Form.Field width={5}>
                        <Field
                            label='Hostname'
                            name='hostName'
                            component={ControlInput}
                        />
                    </Form.Field>
                    <Form.Field width={5}>
                        <Field
                            label='Domain Name'
                            name='domainName'
                            component={ControlInput}
                        />
                    </Form.Field>
                </Form.Group>
                <Form.Group>
                    <Form.Field width={6}>
                        <Field
                            label='Mac Address'
                            name='macAddress'
                            component={ControlInput}
                        />
                    </Form.Field>
                    <Form.Field width={5}>
                        <Field
                            label='IPV4 Address'
                            name='ipv4Address'
                            component={ControlInput}
                        />
                    </Form.Field>
                    <Form.Field width={5}>
                        <Field
                            label='IPV6 Address'
                            name='ipv6Address'
                            component={ControlInput}
                        />
                    </Form.Field>
                </Form.Group>
                <FieldArray 
                    name='hosts'
                    buttonLabel='호스트 설정 추가'
                    component={ControlOptions}
                    optionComponent={hostValueComponent}
                />
           </Aux> 
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    reduxForm({
        form: 'container'
    }),
    connect(
        state => ({
            networkList: state.network.get('list')
        }),
        dispatch => ({
            NetworkAction: bindActionCreators(network, dispatch)
        })
    )
)(Step3);

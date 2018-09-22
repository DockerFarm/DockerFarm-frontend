import React, { Component } from 'react';
import { Form, Icon, Button } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { reduxForm, Field, FieldArray } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { FormHeader } from 'components/base/ui/header'
import { ControlInput, ControlOptions, ControlRadioGroup, ControlSelectbox } from 'components/base/form';

import * as volume from 'store/modules/volume';


const volumeComponent = volumeList => fields => (opts, index) => (
    <Form.Group key={index}>
        <Form.Field width={7}>
            <Field 
                name={`${opts}.container`}
                type='text'
                placeholder=''
                component={ControlInput}
                inputLabel='컨테이너'
            />
            <Field 
                name={`${opts}.type`}
                labels={['Volume', 'Bind']}
                values={['volume', 'bind']}
                defaultValue='volume'
                component={ControlRadioGroup}
            />
        </Form.Field>
        <Form.Field width={1}>
            <div style={{textAlign:'center'}}>
                <Icon name='arrow right' style={{marginTop:'10px'}}/>
            </div> 
        </Form.Field>
        <Form.Field width={7}>
            <Field
                name={`${opts}.volume`}
                placeholder=''
                options={volumeList.map(v => ({ key: v.name, text: v.name, value: v.name}))}
                component={ControlSelectbox}
                inputLabel='볼륨'
            />
            <Field 
                name={`${opts}.permission`}
                labels={['Writable', 'Read-Only']}
                values={['rw', 'r']}
                defaultValue='r'
                component={ControlRadioGroup}
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

class VolumeForm extends Component {

    async componentDidMount() {
        const { VolumeAction } = this.props;

        try { 
            await VolumeAction.getVolumeList();
        } catch (e) {

        }
    }

    render() {
        const { 
            volumeList
        } = this.props;
        return (
           <Aux>
                <FormHeader 
                    title='Volume 설정'
                    icon='hdd'
                />
                <FieldArray 
                    name='volumes'
                    buttonLabel='볼륨 설정 추가'
                    component={ControlOptions}
                    optionComponent={volumeComponent(volumeList.toJS())}
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
            volumeList: state.volume.get('list'),
        }),
        dispatch => ({
            VolumeAction: bindActionCreators(volume, dispatch),
        })
    )
)(VolumeForm);

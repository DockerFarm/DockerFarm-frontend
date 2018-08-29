import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Aux } from 'components/hoc';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { SectionHeader } from 'components/base/ui/header';
import { Form, Segment, Button, Icon} from 'semantic-ui-react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { withRouter } from 'react-router-dom';
import { ControlInput, ControlSelectbox, ControlOptions } from 'components/base/form';
import { FormHeader } from 'components/base/ui/header';
import * as volume from 'store/modules/volume';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';

class VolumeNewPage extends Component {

    async componentDidMount() {
        const { VolumeAction } = this.props;

        try{ 
            await VolumeAction.getVolumeDriverList();
        } catch(e) {
        }

    }

    submit = async form => {
        const { VolumeAction, history } = this.props;

        console.log(form.toJS());
        try { 
            await VolumeAction.createVolume(form.toJS());
            toast.success('Volume create success!');            
            history.push('/admin/volumes');
        } catch(e) {
        }
    }

    render() {
        const { driverList, handleSubmit, reset, intl } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({ id: 'VOL_CREATE_HEADER'})}
                />
                <Segment>
                <Form as='form' onSubmit={handleSubmit(data => this.submit(data))}>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Field
                                name='name' 
                                type='text'
                                label='Name'
                                placeholder='ex) docker-volume'
                                component={ControlInput} 
                            />
                        </Form.Field> 
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <FormHeader 
                                icon='setting' 
                                title='Driver Configuration' 
                                textAlign='center'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Field
                                name='driver'
                                label='Driver'
                                placeholder='volume driver ex) local, local-persist' 
                                component={ControlSelectbox}
                                options={
                                    driverList.toJS().map((v,i) => ({
                                        key: i,
                                        text: v,
                                        value: v 
                                    }))
                                }
                            />
                        </Form.Field>
                    </Form.Group>
                    <FieldArray
                        name='options'
                        buttonLabel='add driver options'
                        component={ControlOptions}  
                    />
                    <Form.Group>
                        <Form.Field width={16}>
                            <Button.Group floated='right'>
                                <Button 
                                    type='button'
                                    onClick={this.back}
                                >
                                    <Icon name='bars'/>
                                    {intl.formatMessage({id: 'BTN_LIST'})}
                                </Button>
                                <Button 
                                    type='button'
                                    onClick={reset}
                                >
                                    <Icon name='sync'/>
                                    {intl.formatMessage({id: 'BTN_RESET'})}
                                </Button>
                                <Button 
                                    color='teal'
                                    type='submit'
                                >
                                    <Icon name='checkmark'/>
                                    {intl.formatMessage({id: 'BTN_SAVE'})}
                                </Button>
                            </Button.Group>
                        </Form.Field>
                    </Form.Group>
                </Form>
                </Segment>
            </Aux>
        )
    }
}

export default compose(
   withRouter,
   injectIntl,
   reduxForm({
       form: 'volume'
   }),
   connect(
        state => ({
            driverList: state.volume.get('driverList')
        }),
        dispatch => ({
            VolumeAction: bindActionCreators(volume, dispatch)
        })
   ) 
)(VolumeNewPage);
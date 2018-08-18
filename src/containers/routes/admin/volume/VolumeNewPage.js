import React, { Component } from 'react';
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


let VolumeForm = ({
   reset,
   back,
   handleSubmit,
   drivers
}) => (

    <Form as='form' onSubmit={handleSubmit}>
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
                        drivers.map((v,i) => ({
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
                        onClick={back}
                    >
                        <Icon name='bars'/>
                        List
                    </Button>
                    <Button 
                        type='button'
                        onClick={reset}
                    >
                        <Icon name='sync'/>
                        Reset
                    </Button>
                    <Button 
                        color='teal'
                        type='submit'
                    >
                        <Icon name='checkmark'/>
                        Create
                    </Button>
                </Button.Group>
            </Form.Field>
        </Form.Group>
    </Form>
)

VolumeForm = reduxForm({
    form: 'volume'
})(VolumeForm);
class VolumeNewPage extends Component {

    async componentWillMount() {
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
        const { driverList } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='Create Volume'
                />
                <Segment>
                    <VolumeForm 
                        drivers={driverList.toJS()}
                        onSubmit={this.submit}
                    />
                </Segment>
            </Aux>
        )
    }
}

export default compose(
   withRouter,
   connect(
        state => ({
            driverList: state.volume.get('driverList')
        }),
        dispatch => ({
            VolumeAction: bindActionCreators(volume, dispatch)
        })
   ) 
)(VolumeNewPage);
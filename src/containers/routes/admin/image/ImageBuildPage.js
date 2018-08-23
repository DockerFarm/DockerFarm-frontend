import React, { Component } from 'react';
import { Aux, withSocketProgress } from 'components/hoc';
import { LogOutput } from 'components/base/ui';
import { SectionHeader, FormHeader } from 'components/base/ui/header';
import { withRouter } from 'react-router-dom';
import { Form, Button, Icon } from 'semantic-ui-react';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import { ControlInput, ControlEditor } from 'components/base/form';
import { Map, List, fromJS } from 'immutable';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectGlobal } from 'styled-components';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import config from 'config';


//Semantic-UI CSS Conflict Monaco Editor 
//Overwrite Monaco Editor CSS
injectGlobal`
    .inputarea {
        min-width: 0 !important;
        min-height: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        position: absolute !important;
        outline: none !important;
        resize: none !important;
        border: none !important;
        overflow: hidden !important;
        color: transparent !important;
        background-color: transparent !important;
    }
`

const renderNames = ({
    fields,
    meta: { error, submitFailed }
}) => (

    <Aux>
        <Form.Group>
            <Form.Field>
                <Button 
                    color='blue'
                    size='tiny'
                    type='button'
                    onClick={() => fields.push('')}
                >
                    <Icon name='plus' />
                    add name
                </Button>
            </Form.Field>
        </Form.Group>
        {
            fields.map((opts, index) => {
                return (
                    <Form.Group key={index}>
                        <Form.Field width={6}>
                            <Field 
                                name={`${opts}`}
                                type='text'
                                component={ControlInput}
                                inputLabel='name'
                            />
                        </Form.Field>
                        <Form.Field width={4}>
                            <label></label> 
                            <Button 
                                color='red' 
                                icon='trash'
                                size='tiny'
                                type='button'
                                onClick={() => fields.remove(index)}
                            />
                        </Form.Field>
                    </Form.Group>
                )
            })
        }
    </Aux>
)

class ImageBuildPage extends Component {


    componentDidMount() {
        const { setDone, history } = this.props;
        setDone(_ => {
            toast.success('Image Build Success!');
            // history.push('/admin/images');
        })
    }

    submit = async form => {
        const { socket, setStatus } = this.props;
        setStatus({
            loading: true,
            status: []
        });
        socket.emit('build', JSON.stringify(form.toJS()));
    }

    render() {
        const { handleSubmit, status, loading } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='Build New Image'
                    icon='wrench'
                />
                <Form as='form' onSubmit={handleSubmit(data => this.submit(data))}>
                    <Form.Group>
                        <Form.Field>
                            <label>Names</label>
                        </Form.Field>
                    </Form.Group>
                    <FieldArray
                        name='names'
                        component={renderNames}
                    />

                    <Form.Group>
                        <Form.Field width={16}>
                            <FormHeader 
                                title='Editor & Output'
                            />
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={8}>
                            <Field
                                name='dockerfile'
                                component={ControlEditor}
                                width="100%"
                                height="600"
                                language="dockerfile"
                                theme="vs-dark"
                            />
                        </Form.Field>
                        <Form.Field width={8}>
                            <LogOutput 
                                height="600px"
                            >
                                {
                                    status.map( v => (
                                        <div>
                                            {v.message} {v.stream} {v.status} {v.progress}
                                        </div>
                                    ))
                                }
                            </LogOutput>
                        </Form.Field>
                    </Form.Group>
                    <Form.Group>
                        <Form.Field width={16}>
                            <Button.Group floated='right'>
                                <Button
                                    type='button'
                                >
                                    <Icon name='sync' />
                                    Reset
                                </Button>
                                <Button
                                    type='submit'
                                    color='teal'
                                    loading={loading}
                                >
                                    <Icon name='wrench' />
                                    Build
                                </Button>
                            </Button.Group>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Aux>
        )
    }

}

export default compose(
    withRouter,
    withSocketProgress,
    reduxForm({
        form: 'image'
    })
)(ImageBuildPage);
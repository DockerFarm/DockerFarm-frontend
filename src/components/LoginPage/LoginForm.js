import React from 'react';
import { Form, Icon, Input, Button} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';

const loginForm = ({
    handleSubmit
}) => (
    <Form onSubmit={handleSubmit}>
        <Form.Field>
            <label>Email</label>
            <Field 
                icon='mail' 
                type='text'
                name='email'
                component={Input}
                iconPosition='left' 
                placeholder='Input Your Email'
            />
        </Form.Field>
        <Form.Field>
            <label>Password</label>
            <Field 
                icon='lock' 
                type='password'
                name='password'
                component={Input}
                iconPosition='left' 
                placeholder='Input Your Password'
            />
        </Form.Field>
        <Form.Field>
            <Button 
                fluid 
                color='teal' 
                type='submit'>
                <Icon name='sign in alternate'/>
                Login
            </Button>
        </Form.Field>
        <Form.Field>
            <Button 
                fluid 
                color='google plus' 
                type='submit'>
                <Icon name='google plus'/>
                Google Login
            </Button>
        </Form.Field>
        <Form.Field>
            <Button 
                fluid 
                type='submit'>
                <Icon name='github' />
                Github Login
            </Button>
        </Form.Field>
    </Form>
)

export default reduxForm({
    form: 'login'
})(loginForm);
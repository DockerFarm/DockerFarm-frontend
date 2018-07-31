import React from 'react';
import { Form, Message, Label, Icon, Input, Button} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form/immutable';
import { maxLength, minLength, required, email } from 'lib/validation';
import { ControlInput } from 'components/base/ui';

const max20 = maxLength(20);
const min8 = minLength(8);

const loginForm = ({
    handleSubmit,
    serverError,
    onGoogleLogin,
    onGithubLogin
}) => (
    <Form onSubmit={handleSubmit} as='form'>
        <Form.Field>
            <Field
                label='Email'
                icon='mail' 
                type='text'
                name='email'
                validate={[required, max20, email]}
                component={ControlInput}
                iconPosition='left' 
                placeholder='Input Your Email'
            />
        </Form.Field>
        <Form.Field>
            <Field
                label='Password'
                icon='lock' 
                type='password'
                name='password'
                validate={[required, min8 ]}
                component={ControlInput}
                iconPosition='left' 
                placeholder='Input Your Password'
            />
        </Form.Field>
        <Form.Field>
            <Message
                error
                header={serverError}
                visible={serverError}
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
                type='button'
                onClick={onGoogleLogin}
            >
                <Icon name='google plus'/>
                Google Login
            </Button>
        </Form.Field>
        <Form.Field>
            <Button 
                fluid 
                type='button'
                onClick={onGithubLogin}
            >
                <Icon name='github' />
                Github Login
            </Button>
        </Form.Field>
    </Form>
)

export default reduxForm({
    form: 'login'
})(loginForm);
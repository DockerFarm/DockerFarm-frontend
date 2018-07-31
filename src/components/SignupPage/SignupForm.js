import React from 'react';
import { Form, Message, Label, Icon, Input, Button} from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form/immutable';
import { maxLength, minLength, required, email } from 'lib/validation';
import { ControlInput } from 'components/base/ui';
import { Link } from 'react-router-dom';

const max20 = maxLength(20);
const min8 = minLength(8);

const validate = values => {
    const errors = {}
    if( values.get('password') !== values.get('passwordConfirm')) { 
        errors.passwordConfirm = 'password mismatch!';
    }
    return errors
};

const signupForm = ({
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
                placeholder='Input your email'
            />
        </Form.Field>
        <Form.Field>
            <Field
                label='Username'
                icon='user' 
                type='text'
                name='username'
                validate={[required, max20]}
                component={ControlInput}
                iconPosition='left' 
                placeholder='Input your username'
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
                placeholder='Input your password'
            />
        </Form.Field>
        <Form.Field>
            <Field
                label='Password Confirm'
                icon='lock' 
                type='password'
                name='passwordConfirm'
                validate={[required, min8 ]}
                component={ControlInput}
                iconPosition='left' 
                placeholder='Input your password again'
            />
        </Form.Field>
        <Form.Field>
            <span>Already have an account? <Link to='/login'>Log in</Link></span>
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
                <Icon name='signup'/>
                Signup
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
                Signup With Google 
            </Button>
        </Form.Field>
        <Form.Field>
            <Button 
                fluid 
                type='button'
                onClick={onGithubLogin}
            >
                <Icon name='github' />
                Signup With Github
            </Button>
        </Form.Field>
    </Form>
)

export default reduxForm({
    form: 'signup',
    validate
})(signupForm);
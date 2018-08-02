import React, { Component } from 'react';
import { ControlInput } from 'components/base/ui';
import { Field, reduxForm } from 'redux-form';
import { compose } from 'recompose';
import { 
    Segment, 
    Header, 
    Icon, 
    Table,
    Form,
    Checkbox,
    Button
} from 'semantic-ui-react';


class SettingPage extends Component {

    render() {
        return (
            <Segment.Group>
                <Segment>
                    <Header as='h5'>
                        <Icon name='plug'/>
                        Connect to Docker EndPoint
                    </Header>
                </Segment>
                <Segment>
                    <Table>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell></Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>EndPoint URL</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell textAlign='center' colSpan='3'>No Data Found!</Table.Cell>    
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    <Form as='form'>
                        <Form.Group>
                            <Form.Field width={4}>
                                <Field 
                                    label='Name' 
                                    type='text'
                                    name='name'
                                    component={ControlInput}
                                />
                            </Form.Field>
                            <Form.Field width={10}>
                                <Field 
                                    label='EndPoint Url' 
                                    type='text'
                                    name='url'
                                    component={ControlInput}
                                />
                            </Form.Field>
                            <Form.Field width={2}>
                                <label>TLS</label>
                                <Checkbox toggle/>
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={16}>
                                <Button.Group floated='right'>
                                    <Button ><Icon name='refresh'/>Reset</Button>
                                    <Button color='blue'><Icon name='checkmark'/>Save</Button>
                                </Button.Group>
                            </Form.Field>
                        </Form.Group>
                    </Form>
                </Segment>
            </Segment.Group>
        )
    }
    
}


export default compose(
    reduxForm({
        form : 'endpoint'
    })    
)(SettingPage);
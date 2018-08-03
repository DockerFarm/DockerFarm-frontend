import React, { Component } from 'react';
import { ControlInput } from 'components/base/ui';
import { Field, reduxForm } from 'redux-form/immutable';
import { compose } from 'recompose';
import * as endPoint from 'store/modules/endpoint';
import { bindActionCreators } from 'redux';
import { 
    Segment, 
    Header, 
    Icon, 
    Table,
    Form,
    Checkbox,
    Button
} from 'semantic-ui-react';
import { connect } from 'react-redux';


class SettingPage extends Component {

    async componentWillMount() {
        const { EndpointAction } = this.props;
        try{
            await EndpointAction.selectAllEndpoint(); 
        }catch(e){

        }
    }

    submit = values => {
        console.log(values);
    }

    render() {
        const list = this.props.list.toJS();

        const noData = (
            <Table.Row>
                <Table.Cell textAlign='center' colSpan='3'>No Data Found!</Table.Cell>    
            </Table.Row>
        );
        
        const listData = (
                <React.Fragment>
                    {
                            list.map( ep => (
                                <Table.Row key={ep.name}>
                                    <Table.Cell textAlign='left'></Table.Cell>
                                    <Table.Cell textAlign='left'>{ep.name}</Table.Cell>
                                    <Table.Cell textAlign='left'>{ep.url}</Table.Cell>
                                </Table.Row>
                            ))
                    }
                </React.Fragment>
        );
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
                            {
                                list.length > 0 ? listData: noData
                            }
                        </Table.Body>
                    </Table>
                    <Form as='form' onSubmit={this.submit}>
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
    }),
    connect(
        state => ({
            list: state.endPoint.get('list')
        }),
        dispatch => ({
            EndpointAction: bindActionCreators(endPoint, dispatch)
        })
    )
)(SettingPage);

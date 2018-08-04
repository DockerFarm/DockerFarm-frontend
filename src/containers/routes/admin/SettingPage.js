import React, { Component } from 'react';
import { ControlInput, ControlCheckbox } from 'components/base/form';
import { Field, reduxForm } from 'redux-form/immutable';
import { compose } from 'recompose';
import * as endPoint from 'store/modules/endpoint';
import { bindActionCreators } from 'redux';
import { required, maxLength, minLength } from 'lib/validation';
import { forIn } from 'lodash';
import moment from 'moment';
import { 
    Segment, 
    Header, 
    Icon, 
    Table,
    Form,
    Button,
    Message
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

    submit = async values => {
        const { EndpointAction } = this.props;
        try {
            await EndpointAction.addEndpoint(values.toJS());
            alert('Endpoint is registered!');
            await EndpointAction.selectAllEndpoint();
        } catch(e) {
        
        }
    }


    selectRow = row => {
        const { EndpointAction, change } = this.props;
        EndpointAction.selectRow(row);
        forIn(row, (v,k) => change(k,v));
    }

    onDelete = async () => {
        const { EndpointAction, selectRow } = this.props;
        
        try { 
            await EndpointAction.removeEndpoint(selectRow.get('_id'));
            alert('Endpoint is Deleted!');
            await EndpointAction.selectAllEndpoint();
        } catch(e) {

        }
    }

    onAdd = () => {
        const { EndpointAction, reset } = this.props;
        EndpointAction.selectRow(null);
        reset();
    }


    render() {
        const { 
            handleSubmit, 
            error, 
            mode, 
            selectRow,
            pristine,
            submitting,
            reset
        } = this.props;
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
                            <Table.Row key={ep.name} positive={ selectRow && selectRow.get('_id') == ep._id}>
                                <Table.Cell textAlign='center'>
                                    {
                                        ep.isActive ? 
                                        <Icon name='checkmark' color='teal'/> : null
                                    }
                                </Table.Cell>
                                <Table.Cell textAlign='left'>
                                    <a onClick={ () => this.selectRow(ep)}>
                                        {ep.name}
                                    </a>
                                </Table.Cell>
                                <Table.Cell textAlign='left'>{ep.url}</Table.Cell>
                                <Table.Cell textAlign='center'>{moment(ep.createdAt).format('YYYY.MM.DD')}</Table.Cell>
                                <Table.Cell textAlign='center'>{moment(ep.updatedAt).format('YYYY.MM.DD')}</Table.Cell>
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
                    <Table fixed color='teal'>
                        <colgroup>
                            <col width='30px'></col>
                            <col width='80px'></col>
                            <col width='350px'></col>
                            <col width='60px'></col>
                            <col width='60px'></col>
                        </colgroup>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell textAlign='center'></Table.HeaderCell>
                                <Table.HeaderCell textAlign='left'>Name</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>EndPoint URL</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>CreatedAt</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>UpdatedtAt</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            { list.length > 0 ? listData: noData  }
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan={5}>
                                    <Button 
                                        floated='right' 
                                        color='blue'
                                        onClick={this.onAdd}
                                    ><Icon name='plus'/>Add Endpoint</Button> 
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                    <Header as='h4'>
                        <Icon name='file' />
                        { mode === endPoint.REGISTER_MODE ? 'Endpoint Register' : 'Endpoint Modify'}
                    </Header>
                    <Form as='form' onSubmit={handleSubmit(this.submit)}>
                        <Form.Group>
                            <Form.Field width={4}>
                                <Field 
                                    label='Name' 
                                    type='text'
                                    name='name'
                                    placeholder='Endpoint name'
                                    component={ControlInput}
                                    validate={[required]}
                                />
                            </Form.Field>
                            <Form.Field width={12}>
                                <Field 
                                    label='EndPoint Url' 
                                    type='text'
                                    name='url'
                                    placeholder='Endpoint Url'
                                    component={ControlInput}
                                    validate={[required]}
                                />
                            </Form.Field>
                            <Form.Field width={1}>
                                <Field
                                    label='Active'
                                    name='isActive'
                                    toggle
                                    component={ControlCheckbox}
                                />
                            </Form.Field>
                            <Form.Field width={1}>
                                <Field
                                    label='TLS'
                                    name='tls'
                                    toggle
                                    component={ControlCheckbox}
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field>
                                <Message 
                                    error
                                    header='Error'
                                    content={error}
                                    visible={error}
                                    fluid
                                />
                            </Form.Field>
                        </Form.Group>
                        <Form.Group>
                            <Form.Field width={16}>
                                <Button.Group floated='right'>
                                    <Button
                                        disabled={pristine || submitting} 
                                        onClick={reset}
                                    ><Icon name='refresh'/>Reset</Button>
                                    <Button 
                                        color='red' 
                                        type='button'
                                        onClick={this.onDelete}>
                                        <Icon name='delete' />Delete
                                    </Button>
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
            list: state.endPoint.get('list'),
            error: state.endPoint.get('error'),
            mode: state.endPoint.get('mode'),
            selectRow: state.endPoint.get('selectRow') 
        }),
        dispatch => ({
            EndpointAction: bindActionCreators(endPoint, dispatch)
        })
    )
)(SettingPage);

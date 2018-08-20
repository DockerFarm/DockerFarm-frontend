import React, { Component } from 'react';
import { SectionHeader } from 'components/base/ui/header';
import { Table, Button, Icon, Segment, Form } from 'semantic-ui-react';
import { ControlCheckbox, ControlInput } from 'components/base/form';
import { Aux } from 'components/hoc';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import * as registry from 'store/modules/registry';
import moment from 'moment';

class RegistryListPage extends Component {

    async componentDidMount() {
        const { RegistryAction } = this.props;

        try {
            RegistryAction.getRegistryList();
        } catch(e) {
            alert(e.message);
        }
    }

    render() {
        const { list, isAuth, match } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='Docker Hub'
                    icon='database'
                />
                <Segment>
                    <Form as='form'>
                        <Form.Group>
                            <Form.Field width={16}>
                                <Field 
                                    toggle
                                    name='isAuth'
                                    label='Authentication' 
                                    component={ControlCheckbox} 
                                />
                            </Form.Field>
                        </Form.Group>
                        {
                            isAuth ?
                            <Aux>
                                <Form.Group>
                                    <Form.Field width={16}>
                                        <Field  
                                            name='username'
                                            label='username'
                                            component={ControlInput}
                                            placeholder='docker hub username'
                                        />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Field width={16}>
                                        <Field 
                                            name='password'
                                            label='password'
                                            component={ControlInput}
                                            placeholder='docker hub password'
                                        />
                                    </Form.Field>
                                </Form.Group> 
                                <Form.Group>
                                    <Form.Field>
                                        <Button
                                            size='tiny'
                                            color='teal' 
                                        >
                                        <Icon name='checkmark' />
                                            Update
                                        </Button>
                                    </Form.Field>
                                </Form.Group>
                            </Aux>
                            :null
                        }
                    </Form>
                </Segment>
                <SectionHeader 
                    title='Registry List'
                    icon='database'
                />
                <div>
                    <Button
                        as={Link}
                        to={`${match.path}/form`}
                        color='blue'
                        size='tiny'
                    >
                        <Icon name='plus' />
                        Add Registry
                    </Button>
                </div>
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>URL</Table.HeaderCell>
                            <Table.HeaderCell>CreatedAt</Table.HeaderCell>
                            <Table.HeaderCell>UpdatedAt</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            list.toJS().map( (v,i) => (
                                <Table.Row key={i}>
                                    <Table.Cell>{v.name}</Table.Cell>
                                    <Table.Cell>{v.url}</Table.Cell>
                                    <Table.Cell>{moment(v.createdAt).format('YYYY.MM.DD')}</Table.Cell>
                                    <Table.Cell>{moment(v.updatedAt).format('YYYY.MM.DD')}</Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>
            </Aux>
        )
    }
}

const selector = formValueSelector('dockerhub');

export default compose(
    withRouter,
    reduxForm({
        form: 'dockerhub'
    }),
    connect(
        state => ({
            list: state.registry.get('list'),
            isAuth: selector(state, 'isAuth')
        }),
        dispatch => ({
            RegistryAction: bindActionCreators(registry, dispatch)
        })
    )    
)(RegistryListPage);
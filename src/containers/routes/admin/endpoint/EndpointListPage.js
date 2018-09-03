import React, { Component } from 'react';
import { Icon, Button, Label } from 'semantic-ui-react';
import { initialize } from 'redux-form/immutable';
import { Aux, If} from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { LinkTitle } from 'components/base/ui';
import DataTable from 'containers/ui/DataTable';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import moment from 'moment';
import { withRouter, Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { toast } from 'react-toastify';
import * as endpoint from 'store/modules/endpoint';
import * as common from 'store/modules/common';
import * as user from 'store/modules/user';

class EndpointListPage extends Component {

    async componentDidMount() {
        const { EndpointAction } = this.props;
        try {
            await EndpointAction.selectAllEndpoint();
        } catch(e) {

        }
    }

    editEndpoint = ep => {
        const { setForm, history } = this.props;

        setForm(ep);
        history.push(`/admin/endpoints/${ep._id}`);
    }

    activeEndpoint = async (id, name) => {
        const { 
            EndpointAction, 
            CommonAction, 
            UserAction, 
            intl 
        } = this.props;        
        try {
            const confirm = await CommonAction.confirm(`${name} ${intl.formatMessage({id: 'EP_MSG_ACTIVE_CONFIRM'})}`);
            if( confirm ) {
                await EndpointAction.activeEndpoint(id);
                await EndpointAction.selectAllEndpoint();
                await UserAction.selectMyInfo();
                toast.success(`${name} ${intl.formatMessage({id: 'EP_MSG_ACTIVE_SUCCESS'})}`);
            }     
        } catch(e) {
            alert(e.message);
        }
    }
    
    render() {
        const {
            intl,
            list,
            match
        } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id : 'EP_LIST_HEADER'})}
                    icon='plug'
                />
                <div>
                    <Button
                        as={Link}
                        size='tiny'
                        color='blue'
                        to={`${match.path}/new`}
                    >
                        <Icon name='plus' />
                        {intl.formatMessage({id: 'EP_BTN_ADD'})}
                    </Button>
                </div>

                <DataTable 
                    data={list.toJS()}     
                    paging
                    columns={
                        [
                            {
                                header: 'Active',
                                id: 'isActive',
                                width: '80px',
                                cellAlign: 'center',
                                template: ({ _id, name, isActive }) => (
                                    <If 
                                        condition={isActive}
                                        then={
                                            <Aux>
                                                <Label color='blue'>
                                                    <Icon name='checkmark'/> 
                                                    현재 활성
                                                </Label>
                                            </Aux>
                                        }

                                        else={
                                            <Aux>
                                                <Button
                                                    size='mini'
                                                    basic
                                                    color='blue'
                                                    onClick={  _ => this.activeEndpoint(_id, name)}
                                                >
                                                    <Icon name='checkmark' />
                                                    활성화
                                                </Button>
                                            </Aux>
                                        }
                                    />
                                )
                            },
                            {
                                header: 'Name',
                                id: 'name',
                                width: '100px',
                                cellAlign: 'center',
                                template: ep => (
                                    <LinkTitle 
                                        label={ep.name}
                                        onClick={_ => this.editEndpoint(ep)}
                                    />
                                )
                            },
                            {
                                header: 'Url',
                                id: 'url',
                                width: '500px'
                            },
                            {
                                header: 'CreatedAt',
                                id: 'createdAt',
                                width: '100px',
                                cellAlign: 'center',
                                template: ({createdAt}) => (
                                    <Aux>{moment(createdAt).format('YYYY.MM.DD')}</Aux>
                                )
                            },
                            {
                                header: 'UpdatedAt',
                                id: 'updatedAt',
                                width: '100px',
                                cellAlign: 'center',
                                template: ({updatedAt}) => (
                                    <Aux>{moment(updatedAt).format('YYYY.MM.DD')}</Aux>
                                )
                            },

                        ]
                    }
                />
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
            list: state.endpoint.get('list')
        }),
        dispatch => ({
            EndpointAction: bindActionCreators(endpoint, dispatch),
            UserAction: bindActionCreators(user, dispatch),
            CommonAction: bindActionCreators(common, dispatch) ,
            setForm: data => {
                dispatch(initialize('endpoint', data));
            },
        })
    ), 
)(EndpointListPage);
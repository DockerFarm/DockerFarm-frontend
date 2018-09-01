import React, { Component } from 'react';
import { Icon, Button, Label } from 'semantic-ui-react';
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
import * as endpoint from 'store/modules/endpoint';
import * as common from 'store/modules/common';

class EndpointListPage extends Component {

    async componentDidMount() {
        const { EndpointAction } = this.props;
        try {
            await EndpointAction.selectAllEndpoint();
        } catch(e) {

        }
    }

    activeEndpoint = async () => {
        const { CommonAction } = this.props;        
        try {
            const confirm = await CommonAction.confirm('엔드포인트를 활성화 하시겠습니까?');
            if( confirm ) {

            } else {

            }
        } catch(e) {

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
                                template: ({name}) => (
                                    <LinkTitle 
                                        label={name}
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
            CommonAction: bindActionCreators(common, dispatch) 
        })
    ), 
)(EndpointListPage);
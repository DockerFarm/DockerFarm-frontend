import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Grid, Icon, Header, List } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { bindActionCreators } from 'redux';
import { SectionHeader } from 'components/base/ui/header';
import * as dashboard from 'store/modules/dashboard';
import styled from 'styled-components';
import { teal, yellow } from 'styles/color';
import { InfoTable } from 'components/base/ui';

const Box = styled.div`
    background: ${props => props.color || '#2BB7C4'};
    padding:10px;
    height:${props => props.height};
` 

const BoxHeader = styled.div`
    display:flex;
    justify-content:space-between;
`

const CircleIcon = styled(Icon)`
    border-radius: 500em!important;
    line-height: 1!important;
    padding: .5em 0!important;
    width: 2em!important;
    height: 2em!important;
    background:white;
`

const BoxTitle = styled.h1`
    color:white; 
    font-weight: 100;
    font-size:${props => props.size};
    line-height: 45px;
    margin:0 !important;
    margin-bottom:10px !important;
`

const DescriptionList = styled(List)`
    margin-top: 0 !important;
    color: white;
    text-align: right;
    font-size: 18px !important;
`

class DashBoardInfoPage extends Component {
    async componentDidMount() {
        const { DashboardAction } = this.props;
        try {
            await DashboardAction.getDashBoardInfo();
        } catch (e) {

        }
    }

    render() {
        const { data, user, intl } = this.props;
        
        const { 
            name,
            cpu,
            memory,
            dockerversion
        } = data.get('info').toJS();

        const { 
            container,
            image,
            network,
            volume
        } = data.get('summary').toJS();

        const {
            docker,
            api,
            go,
            ostype,
            os,
            arch
        } = data.getIn(['engine', 'version']).toJS();


        return (
            <Aux>
                <SectionHeader 
                    title={user.getIn(['endpoint','name'])}
                    color='grey'
                    textAlign='center'
                />
                <Grid columns={4}>
                    <Grid.Row>
                        <Grid.Column>
                            <Box height='180px'>
                                <BoxHeader>
                                    <div>
                                        <Link to='/admin/containers'>
                                            <BoxTitle size='60px'>
                                                {container.total}                                        
                                            </BoxTitle>
                                            <BoxTitle size='30px'>
                                                {intl.formatMessage({id: 'DB_CONTAINER_TITLE'})}
                                            </BoxTitle>
                                        </Link>
                                    </div>
                                    <CircleIcon color='blue' name='list' size='big' />
                                </BoxHeader>
                                <DescriptionList>
                                    <List.Item>
                                        <Icon name='heart'/>
                                        {container.running} {intl.formatMessage({id: 'DB_CONTAINER_RUNNING'})}
                                    </List.Item>
                                    <List.Item>
                                        <Icon name='heartbeat'/>
                                        {container.stop} {intl.formatMessage({id: 'DB_CONTAINER_STOPPED'})}
                                    </List.Item>
                                </DescriptionList>
                            </Box>
                        </Grid.Column>
                        <Grid.Column>
                            <Box height='180px'>
                                <BoxHeader>
                                    <div>
                                        <Link to='/admin/images'>
                                            <BoxTitle size='60px'>
                                                {image.count}                                        
                                            </BoxTitle>
                                            <BoxTitle size='30px'>
                                                {intl.formatMessage({id: 'DB_IMAGE_TITLE'})}
                                            </BoxTitle>
                                        </Link>
                                    </div>
                                    <CircleIcon color='blue' name='clone' size='big' />
                                </BoxHeader>
                                <DescriptionList>
                                    <List.Item>
                                        {intl.formatMessage({id: 'DB_IMAGE_TOTAL'})} : {image.totalsize} 
                                    </List.Item>
                                </DescriptionList>
                            </Box>
                        </Grid.Column>
                        <Grid.Column>
                            <Box height='180px'>
                                <BoxHeader>
                                    <div>
                                        <Link to='/admin/networks'>
                                            <BoxTitle size='60px'>
                                                {network.count}                                        
                                            </BoxTitle>
                                            <BoxTitle size='30px'>
                                                {intl.formatMessage({id: 'DB_NETWORK_TITLE'})}
                                            </BoxTitle>
                                        </Link>
                                    </div>
                                    <CircleIcon color='blue' name='sitemap' size='big' />
                                </BoxHeader>
                            </Box>
                        </Grid.Column>
                        <Grid.Column>
                            <Box height='180px'>
                                <BoxHeader>
                                    <div>
                                        <Link to='/admin/volumes'>
                                            <BoxTitle size='60px'>
                                                {volume.count}                                        
                                            </BoxTitle>
                                            <BoxTitle size='30px'>
                                                {intl.formatMessage({id: 'DB_VOLUME_TITLE'})}
                                            </BoxTitle>
                                        </Link>
                                    </div>
                                    <CircleIcon color='blue' name='hdd' size='big' />
                                </BoxHeader>
                            </Box>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <SectionHeader 
                    title={intl.formatMessage({id: 'DB_NODE_HEADER'})} 
                    icon='dashboard'
                />
                <InfoTable 
                    widths={[200, 800]}
                    data={[
                        {
                            header: intl.formatMessage({id: 'DB_NODE_NAME'}),
                            cell: name
                        },
                        {
                            header: intl.formatMessage({id: 'DB_NODE_VERSION'}),
                            cell: dockerversion
                        },
                        {
                            header: intl.formatMessage({id: 'DB_NODE_CPU'}),
                            cell: cpu
                        },
                        {
                            header: intl.formatMessage({id: 'DB_NODE_MEMORY'}),
                            cell: memory
                        },
                    ]}
                />

                <SectionHeader 
                    title={intl.formatMessage({id: 'DB_ENGINE_HEADER'})} 
                    icon='dashboard'
                />
                
                <InfoTable 
                    widths={[200, 800]}
                    data={[
                        {
                            header: 'Version',
                            cell: docker
                        },
                        {
                            header: 'API Version',
                            cell: api
                        },
                        {
                            header: 'Go Version',
                            cell: go
                        },
                        {
                            header: 'OS Type',
                            cell: ostype
                        },
                        {
                            header: 'OS',
                            cell: os
                        },
                        {
                            header: 'Architecture',
                            cell: arch
                        }
                    ]}
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
            data: state.dashboard.get('data'),
            user: state.user.get('user')
        }),
        dispatch => ({
            DashboardAction: bindActionCreators(dashboard, dispatch)
        })
    )

)(DashBoardInfoPage);
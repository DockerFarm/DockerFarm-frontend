import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Sidebar, Menu, Segment, Icon, Header, Image } from 'semantic-ui-react';
import { Route, Redirect, Switch, NavLink, Link} from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import {
    ContainerPage,
    ImagePage,
    SettingPage,
    NetworkPage,
    VolumePage,
    LibraryPage,
    DashBoardPage
} from './admin';
import { Logo } from 'components/base/ui';
import { GlobalNavigationBar } from 'containers/routes/admin/header';
import styled from 'styled-components';


const Wrapper = styled.div`
    height:100vh;
`;

const ContentWrapper = styled.div`
    padding: 15px;
`

const SideDrawer = styled(Sidebar)`
    & {
        width:250px !important;
    }
`

const Pusher = styled(Sidebar.Pusher)`
    margin-left:250px !important;
    height:100% !important;
    overflow-y: scroll !important;
    padding-top:65px !important;
`

const MenuItem = styled(Menu.Item)`
    text-align:left !important;
`

const EndpointHeader = styled(Header)`
    margin-left: -5px !important;
    color:white !important;
`

class MainPage extends Component {

    render() {
        const { user } = this.props;
        return (
            <Wrapper>
                <Sidebar.Pushable as='div'>
                <SideDrawer
                    as={Menu}
                    animation='overlay'
                    onHide={this.handleSidebarHide}
                    inverted
                    color='teal'
                    vertical
                    visible
                >
                    <MenuItem 
                        as={Link} 
                        to='/admin/dashboard' 
                        style={{height:'60px'}}
                    >
                        <Logo
                            width='100%'
                            height='48px'
                        />
                    </MenuItem>
                    <MenuItem>
                        <EndpointHeader as='h3'>
                            {user.getIn(['endpoint', 'name'])} 
                        </EndpointHeader>
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/dashboard' >
                        <Icon name='dashboard' />
                        Dashboard
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/containers' >
                        <Icon name='th list' />
                        Containers
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/images'>
                        <Icon name='clone'/>
                        Images
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/networks'>
                        <Icon name='sitemap'/>
                        Networks
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/volumes'>
                        <Icon name='hdd'/>
                        Volumes
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/library'>
                        <Icon name='chart area'/>
                        Library
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/settings'>
                        <Icon name='settings'/>
                        Setting
                    </MenuItem>
                </SideDrawer>

                <Pusher>
                    <GlobalNavigationBar />
                    <ContentWrapper>
                        <Switch>
                            <Route path='/admin/dashboard' component={DashBoardPage} />
                            <Route path='/admin/containers' component={ContainerPage}/>
                            <Route path='/admin/images' component={ImagePage}/>
                            <Route path='/admin/networks' component={NetworkPage}/>
                            <Route path='/admin/volumes' component={VolumePage}/>
                            <Route path='/admin/library' component={LibraryPage}/>
                            <Route path='/admin/settings' component={SettingPage}/>
                        </Switch>
                    </ContentWrapper>
                </Pusher>
                </Sidebar.Pushable>
            </Wrapper>
        )
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            user: state.user.get('user')
        }),
        dispatch => ({

        })
    )
)(MainPage);
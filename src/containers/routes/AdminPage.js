import React, { Component } from 'react';
import { updateIntl } from 'react-intl-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { Sidebar, Menu, List, Select, Icon, Header, Image } from 'semantic-ui-react';
import { Route, Redirect, Switch, NavLink, Link} from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { MessageContainer } from 'containers/common';
import {
    ContainerPage,
    ImagePage,
    SettingPage,
    NetworkPage,
    VolumePage,
    LibraryPage,
    DashBoardPage,
    EndpointPage,
	RegistryPage,
	EventPage
} from './admin';
import locale from 'locale';
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

const SideFooter = styled.div`
    position: absolute;
    width:100%;
    bottom:0;
    padding: 15px 12px;
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
        const { user, intl, lang, changeLocale} = this.props;
        return (
            <Wrapper>
                <Sidebar.Pushable as='div'>
                <SideDrawer
                    as={Menu}
                    animation='overlay'
                    onHide={this.handleSidebarHide}
                    inverted
                    color='blue'
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
                        {intl.formatMessage({ id : 'MENU_DASHBOARD'})}
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/containers' >
                        <Icon name='th list' />
                        {intl.formatMessage({ id : 'MENU_CONTAINER'})}
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/images'>
                        <Icon name='clone'/>
                        {intl.formatMessage({ id : 'MENU_IMAGE'})}
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/networks'>
                        <Icon name='sitemap'/>
                        {intl.formatMessage({ id : 'MENU_NETWORK'})}
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/volumes'>
                        <Icon name='hdd'/>
                        {intl.formatMessage({ id : 'MENU_VOLUME'})}
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/events'>
                        <Icon name='bell'/>
                        {intl.formatMessage({ id : 'MENU_EVENT'})}
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/library'>
                        <Icon name='chart area'/>
                        {intl.formatMessage({ id : 'MENU_LIBRARY'})}
                    </MenuItem>
                    {/* <MenuItem as={NavLink} to='/admin/settings'>
                        <Icon name='settings'/>
                        {intl.formatMessage({ id : 'MENU_SETTING'})}
                    </MenuItem> */}
                    <MenuItem as={NavLink} to='/admin/endpoints'>
                        <Icon name='plug'/>
                        {intl.formatMessage({ id : 'MENU_ENDPOINT'})}
                    </MenuItem>
                    <MenuItem as={NavLink} to='/admin/registries'>
                        <Icon name='database'/>
                        {intl.formatMessage({ id : 'MENU_REGISTRY'})}
                    </MenuItem>
                    <SideFooter>
                        <List>
                            <List.Item>
                                <Select
                                    value={lang}
                                    options={[
                                        { key: 'en', value: 'en', text: 'English'},
                                        { key: 'ko', value: 'ko', text: '한국어' }
                                    ]} 
                                    onChange={(e,props) => changeLocale(props.value)}
                                />
                            </List.Item>
                            <List.Item>
                                <div>
                                    <a 
                                        href='https://github.com/DockerFarm'
                                        target='_blank' 
                                        rel="noopener noreferrer"
                                        style={{ color: 'white', textDecoration:'none'}
                                     }>
                                        <Icon 
                                            name='github' 
                                            color='white' 
                                            size='big'
                                        />
                                    </a>
                                </div>
                            </List.Item>
                        </List>
                    </SideFooter>
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
                            <Route path='/admin/events' component={EventPage}/>
                            <Route path='/admin/library' component={LibraryPage}/>
                            <Route path='/admin/settings' component={SettingPage}/>
                            <Route path='/admin/endpoints' component={EndpointPage}/>
                            <Route path='/admin/registries' component={RegistryPage}/>
                        </Switch>
                    </ContentWrapper>
                    <MessageContainer/>
                </Pusher>
                </Sidebar.Pushable>
            </Wrapper>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
            lang: state.intl.locale,
            user: state.user.get('user')
        }),
        dispatch => ({
            changeLocale: lang => {
                localStorage.setItem('lang', lang);
                dispatch(updateIntl({
                    locale: lang,
                    messages: locale(lang) 
                }))
            }
        })
    )
)(MainPage);

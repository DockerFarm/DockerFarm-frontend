import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import styled from 'styled-components';
import { Icon, Header, Breadcrumb, Button } from 'semantic-ui-react';
import { center } from 'styles/style-utils';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Aux } from 'components/hoc';
import { LinkTitle } from 'components/base/ui';

const MenuWrapper = styled.div`
    height:60px;
    background:#efefef;
    display:flex;
    justify-content:space-between;
    padding-left:15px;
    padding-right:15px;
    position: fixed;
    right: 0;
    left: 250px;
    z-index: 9999;
    top: 0;
`

const Menu = styled.ul`
    display:flex;
    align-items:center;
    justify-content: space-between;
    list-style:none;
    margin:0;
    height:100%;
    padding-left:10px;
    padding-right:10px;
`

const MenuItem = styled.li`
    padding-right:20px;
`

const UserProfile = styled.div`
    ${center}
    height:100%;
`


class GlobalNavigationBar extends Component {

    render() {
        const { 
            menus,
            user,
            intl
        } = this.props;

        const { 
            email,
            username
         } = user.toJS();


        return (
            <MenuWrapper>
                <Menu>
                    <MenuItem>
                        <Breadcrumb size='large'>
                            <Breadcrumb.Section>
                                <Link to='/' >
                                    <Header as='h5' color='grey'>
                                        <Icon name='home' />
                                    </Header> 
                                </Link>
                            </Breadcrumb.Section>
                            {
                                menus.toJS().map( (v,i) => (
                                    <Aux key={i}>
                                        <Breadcrumb.Section>
                                            <Link to={v.url ? v.url : window.location.pathname}>
                                                <Header as='h5' color='grey'>
                                                    {v.title}
                                                </Header>
                                            </Link>
                                        </Breadcrumb.Section>
                                        {
                                            i !== menus.toJS().length - 1 ? 
                                            <Breadcrumb.Divider icon='right chevron' /> : 
                                            null
                                        }
                                    </Aux>
                                ))
                            }
                        </Breadcrumb>
                    </MenuItem>
                </Menu>
                <Menu>
                    <MenuItem>
                        <Header as='h5' color='grey'>
                            <Icon name='user circle' style={{ paddingTop: '3px' }}/>
                            {username}
                        </Header>
                    </MenuItem>
                    <MenuItem>
                        <Link to='/logout'>
                            <Button
                                color='grey'
                                size='tiny' 
                                type='button'
                            >
                                <Icon name='sign out alternate' />
                                {intl.formatMessage({id: 'GNB_LOGOUT'})}
                            </Button>
                        </Link>
                    </MenuItem>
                </Menu>
            </MenuWrapper>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
            user: state.user.get('user'),
            menus: state.common.get('menus') 
        }),
        dispatch => ({
        })
    )     
)(GlobalNavigationBar);

import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Label, Table, Button, Menu} from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import styled from 'styled-components';

import InfoPanel from './InfoPanel';
import LogPanel from './LogPanel';
import StatPanel from './StatPanel';

const MenuPanel = styled.div`
	padding: 10px;
`;

class ContainerDetailPage extends Component {

    render() {
		const { 
			intl, 
			match,
			history
		} = this.props;

		const menus = [
			{
				url: `${match.url}/info`,
				icon: 'info',
				title: 'Information'
			},
			{
				url: `${match.url}/logs`,
				icon: 'terminal',
				title: 'Logs'
			},
			{
				url: `${match.url}/stats`,
				icon: 'chart line',
				title: 'Stats'
			}
		];


        return (
            <Aux>
				<Menu pointing secondary color='blue'>
					{
						menus.map((v,i) => (
							<Menu.Item 
								key={i}
								as={Link}	
								to={v.url}
								active={v.url == history.location.pathname}
							>
								<Icon name={v.icon} />
								{v.title}
							</Menu.Item>
						))
					}
				</Menu>
				<MenuPanel>
					<Switch>
						<Route exact path={`${match.path}/info`} component={InfoPanel}/>
						<Route exact path={`${match.path}/logs`} component={LogPanel}/>
						<Route exact path={`${match.path}/stats`} component={StatPanel}/>
					</Switch>
				</MenuPanel>
            </Aux>
        )
    }
}


export default compose(
    withRouter,
    injectIntl,
    connect(
        state => ({
        }),
        dispatch => ({
        })
    )
)(ContainerDetailPage);

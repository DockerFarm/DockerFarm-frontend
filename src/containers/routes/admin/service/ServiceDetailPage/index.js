import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Label, Table, Button, Menu} from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { bindActionCreators } from 'redux';
import * as common from 'store/modules/common';
import * as service from 'store/modules/service';
import styled from 'styled-components';

import InfoPanel from './InfoPanel';
import LogPanel from './LogPanel';

const MenuPanel = styled.div`
	padding: 10px;
`;

class ServiceDetailPage extends Component {

    componentDidMount(){
    }

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
            inspectData: state.container.get('inspectData')
        }),
        dispatch => ({
            CommonAction: bindActionCreators(common, dispatch),
            ServiceAction: bindActionCreators(service, dispatch)
        })
    )
)(ServiceDetailPage);

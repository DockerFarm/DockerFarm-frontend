import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter, Link, Switch, Route } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Label, Table, Button, Menu} from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import * as common from 'store/modules/common';
import styled from 'styled-components';


import InfoPanel from './InfoPanel';
import ImagePanel from './ImagePanel';

const MenuPanel = styled.div`
	padding: 10px;
`;

class RegistryDetailPage extends Component {

    componentDidMount(){
        const { CommonAction,  match } = this.props;
        try {
            CommonAction.updateMenuTitle({
                index: 1,
                menu: Map({
                    title: match.params.id 
                })
            })
        } catch(e) {
            console.log(e);
        }
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
				url: `${match.url}/images`,
				icon: 'clone',
				title: 'Images'
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
						<Route exact path={`${match.path}/images`} component={ImagePanel}/>
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
        })
    )
)(RegistryDetailPage);

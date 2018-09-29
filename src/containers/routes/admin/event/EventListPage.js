import React, {Component} from 'react';
import { Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { EventList } from 'components/admin/event';
import { bindActionCreators } from 'redux';
import { SectionHeader } from 'components/base/ui/header';
import { Aux } from 'components/hoc';
import * as event from 'store/modules/event';

class EventListPage extends Component {

	async componentDidMount() {
		const { EventAction } = this.props;

		try {
			await EventAction.getEventList();
		} catch(e) {

		}
	}

	render() {
		const {
			events
		} = this.props;

		const processEventList = (list, type) => {
			return list.toJS()
					.filter(v => v.type == type)
		};

		return (
			<Aux>
				<SectionHeader 
					title='Event'	
					icon='bell'
				/>
				<Grid columns={2} divided>
					<Grid.Row>
						<Grid.Column>
							<SectionHeader
								title='Container'
								icon='list'
							/>
							<EventList 
								list={processEventList(events, 'container')}	
							/>
						</Grid.Column>
						<Grid.Column>
							<SectionHeader
								title='Image'
								icon='clone'
							/>
							<EventList 
								list={processEventList(events, 'image')}	
							/>
						</Grid.Column>
					</Grid.Row>
					<Grid.Row>
						<Grid.Column>
							<SectionHeader
								title='Volume'
								icon='hdd'
							/>
							<EventList 
								list={processEventList(events, 'volume')}	
							/>
						</Grid.Column>
						<Grid.Column>
							<SectionHeader
								title='Network'
								icon='sitemap'
							/>
							<EventList 
								list={processEventList(events, 'network')}	
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Aux>
		)
	}
}

export default compose(
	withRouter,
	injectIntl,
	connect(
		state => ({
			events: state.event.get('list')
		}),
		dispatch => ({
			EventAction: bindActionCreators(event, dispatch)
		})
	)
)(EventListPage);

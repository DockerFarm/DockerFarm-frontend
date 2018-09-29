import React, { Component } from 'react';
import { Segment, List, Label, Icon } from 'semantic-ui-react';
import { Box } from 'components/base/ui';
import styled from 'styled-components';

const EventWrapper = styled(Segment)`
	height: 350px;
	overflow-y:auto;
`

const EventList = ({
	list
}) => (
	<EventWrapper>
		<List divided>
			{
				list.map((v,i) => (
					<List.Item key={i}>
						<List.Header>
							{v.name || v.id}
						</List.Header>
						<List.Content>
							<Box mt={1}>
								<Label color='grey'>
									<Icon name='rocket' color='white'/>{v.action}	
								</Label>
							</Box>
							<Box mt={1}>
								<Icon 
									name='calendar' 
									color='grey'
								/>{v.created}
							</Box>
						</List.Content>
					</List.Item>
				))
			}
		</List>
	</EventWrapper>
)


export default EventList;

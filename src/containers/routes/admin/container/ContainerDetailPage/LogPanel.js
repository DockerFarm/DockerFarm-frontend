import React, { Component  } from 'react';
import { withRouter  } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose'; 
import { Aux } from 'components/hoc';
import { LogOutput } from 'components/base/ui';
import { Map, List } from 'immutable';
import { Box } from 'components/base/ui';
import { SectionHeader } from 'components/base/ui/header';

import * as ContainerApi from 'lib/api/container';

class LogPanel extends Component {

    state = {
        data: Map({
            log: ''
        })
    }

    componentDidMount(){
        const { match } = this.props;
        const { data } = this.state;

        const requestLog = async _ => {
            try {
                const response = await ContainerApi.getContainerLog({
                    id: match.params.id,
                    param: {
                        follow:0,
                        stdout:1,
                        stderr:1,
                        tail:2000
                    }
                });

                this.setState({
                    data: data
                        .set('log', data.get('log')
                        .concat(response.data.result))
                })
            } catch (e) {
                /* handle error */
            }
        }

        this.timer = setInterval(requestLog, 2000);
        requestLog();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

	render() {
        const { data } = this.state;
		return (
			<Aux>
                <SectionHeader
                    title='Log Viewer'
                    icon='file'
                />
                <LogOutput
                    height='600px' 
                >
                    {
                        data.get('log')
                            .split('\n')
                            .map((v,i) => (
                                <Box 
                                    key={i} 
                                    fontWeight='bold'
                                    fontSize='14px'
                                    minHeight='15px'
                                >
                                    {v.trim().slice(8)}
                                </Box>
                            ))
                    }
                </LogOutput>
			</Aux>
		)
	}
}

export default compose(
	withRouter,
	injectIntl
)(LogPanel)

import React, { Component  } from 'react';
import { withRouter  } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose'; 
import { Aux } from 'components/hoc';
import { LogOutput } from 'components/base/ui';
import { Map, List } from 'immutable';
import { Box } from 'components/base/ui';
import { Form, Checkbox } from 'semantic-ui-react';
import { SectionHeader } from 'components/base/ui/header';


class LogViewer extends Component {

    state = {
        data: Map({
            log: '',
            isAutoScroll: true
        })
    }

    componentDidMount(){
        const { match } = this.props;

        const requestLog = async _ => {
            try {
                const { data } = this.state;
                const log = await this.props.getLog();
                this.setState({
                    data: data
                        .set('log', log)
                })
            } catch (e) {
                /* handle error */
            }
        }

        this.timer = setInterval(requestLog, 5000);
        setTimeout(requestLog, 100);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    handleAutoScroll(){
        const { data } = this.state;
        this.setState({
            data: data.set('isAutoScroll', !data.get('isAutoScroll'))
        })
    }

	render() {
        const { data } = this.state;
		return (
			<Aux>
                <SectionHeader
                    title='Log Viewer'
                    icon='file'
                />
                <Box mb={20} mt={20}>
                    <Checkbox 
                        toggle
                        label='Auto Scroll'
                        checked={data.get('isAutoScroll')}
                        onChange={this.handleAutoScroll}
                    />
                </Box>
                <LogOutput
                    height='600px' 
                    autoScroll={data.get('isAutoScroll')}
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
)(LogViewer)

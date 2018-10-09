import React, { Component  } from 'react';
import { withRouter  } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose'; 
import { Aux } from 'components/hoc';
import { LogViewer } from 'containers/common';

import * as ContainerApi from 'lib/api/container';

class LogPanel extends Component {

    handleGetLog = async _ => {
        const { match } = this.props;
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
            return response.data.result;
        } catch(e) {

        }
    }

	render() {
		return (
			<Aux>
                <LogViewer 
                    getLog={this.handleGetLog}
                />
			</Aux>
		)
	}
}

export default compose(
	withRouter,
	injectIntl
)(LogPanel)

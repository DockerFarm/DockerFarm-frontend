import React, { Component  } from 'react';
import { withRouter  } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose'; 
import { Aux } from 'components/hoc';

import * as container from 'store/modules/container';

class LogPanel extends Component {

	render() {
		return (
			<Aux>
				LogPanel
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
			ContainerAction: bindActionCreators(container, dispatch)
		})
	)
)(LogPanel)

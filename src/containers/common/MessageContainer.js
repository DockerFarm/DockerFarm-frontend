import React, { Component } from 'react';
import { Aux } from 'components/hoc';
import { Confirm, Icon } from 'semantic-ui-react';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import * as common from 'store/modules/common';
import { bindActionCreators } from 'redux';

class MessageContainer extends Component {

    render() {
        const {
            intl,
            confirm
        } = this.props;

        const typeMap = {
            info: intl.formatMessage({id: 'CONFIRM_INFO_HEADER'}),
            confirm: intl.formatMessage({id: 'CONFIRM_DEFAULT_HEADER'}),
            warn: intl.formatMessage({id: 'CONFIRM_WARN_HEADER'}) 
        };

        const { 
            show,
            message,
            onClose,
            onConfirm,
            size,
            type
        } = confirm.toJS();

        return (
            <Aux>
                <Confirm 
                    open={show} 
                    header={typeMap[type]}
                    content={message}
                    onCancel={onClose} 
                    onConfirm={onConfirm}
                    size={size}
                    confirmButton={intl.formatMessage({id: 'CONFIRM_BTN_OK'})}
                    cancelButton={intl.formatMessage({id: 'CONFIRM_BTN_CANCEL'})}
                />
            </Aux>
        )
    }

}

export default compose(
    injectIntl,
    connect(
        state => ({
            confirm: state.common.get('confirm')
        }),
        dispatch => ({
            CommonAction: bindActionCreators(common, dispatch)
        })
    )
)(MessageContainer);
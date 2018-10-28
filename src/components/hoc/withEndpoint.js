import React, { Component } from 'react';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { LinkTitle } from 'components/base/ui';
import { injectIntl } from 'react-intl';
import * as user from 'store/modules/user';

export default function withEndpoint(InnerComponent) {
    class WrappedEndpoint extends Component {

        render() {
            const { alterComponent, user, intl } = this.props;
            let defaultComponent = (
                <div>
                    <LinkTitle 
                        fontSize={20}
                        label={intl.formatMessage({ id : 'EP_MSG_GUIDE'})}
                        to={'/admin/endpoints'}
                    />
                </div>
            );
            let renderComponent = alterComponent || defaultComponent;

            renderComponent = user.get('endpoint') != null ? <InnerComponent/> : renderComponent;
            return renderComponent;
        }
    }

    return compose(
        injectIntl,
        connect(
            state => ({
                user: state.user.get('user')
            }),
            null
        )
    )(WrappedEndpoint)
}


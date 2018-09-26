import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Label, Table, Button, Menu} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as container from 'store/modules/container';
import * as common from 'store/modules/common';
import { ContainerInfo, ContainerDetail, ContainerVolume } from 'components/admin/container';
import { toast } from 'react-toastify';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';



class InfoPanel extends Component {

    async componentDidMount() {
        const { ContainerAction, CommonAction, match } = this.props
        try {
            await ContainerAction.getContainerInfo(match.params.id)
            CommonAction.updateMenuTitle({
                index: 1,
                menu: {
                    title: this.props.inspectData.getIn(['info','name'])
                }
            })
        } catch(e) {

        }
    }
    
    handleCommand = async command => {
        const { ContainerAction, history, match } = this.props;
        
        try {
            await ContainerAction.commandToContainer({id: match.params.id, command});
            toast.success("🚀 Command Successed !", );
            if( command === 'remove' ){
                history.push('/admin/containers');
            } else {
                await ContainerAction.getContainerInfo(match.params.id)
            }
        } catch(e){

        }
    }

    render() {
		const { 
			inspectData, 
			CommonAction, 
			intl
		} = this.props;

        return (
            <Aux>
				<SectionHeader
					title={intl.formatMessage({id: 'CON_INFO_HEADER'})}
					icon='list'
				/>
				<ContainerInfo 
					{...inspectData.get('info').toJS()}
					onCommand={this.handleCommand}
				/>
				<SectionHeader
					title={intl.formatMessage({id: 'CON_DETAIL_HEADER'})}
					icon='list'
				/>
				<ContainerDetail 
					{...inspectData.get('detail').toJS()}
				/>
				<SectionHeader
					title={intl.formatMessage({id: 'CON_VOLUME_HEADER'})}
					icon='hdd'
				/>
				<ContainerVolume 
					volume={inspectData.get('volume').toJS()}
				/>                        
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
            ContainerAction: bindActionCreators(container, dispatch),
            CommonAction: bindActionCreators(common, dispatch) 
        })
    )
)(InfoPanel);

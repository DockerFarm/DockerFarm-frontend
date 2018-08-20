import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Label, Table, Button} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as container from 'store/modules/container';
import * as common from 'store/modules/common';
import { ContainerInfo, ContainerDetail, ContainerVolume } from 'components/admin/container';
import { toast } from 'react-toastify';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';



class ContainerDetailPage extends Component {

    async componentDidMount() {
        const { ContainerAction, match } = this.props
        try {
            await ContainerAction.getContainerInfo(match.params.id)
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
        const { inspectData, CommonAction } = this.props;

        CommonAction.updateMenuTitle({
            index: 1,
            menu: {
                title: inspectData.getIn(['info','name'])
            }
        })

        return (
            <Aux>
                <SectionHeader
                    title='Container Information'
                    icon='list'
                />
                <ContainerInfo 
                    {...inspectData.get('info').toJS()}
                    onCommand={this.handleCommand}
                />
                <SectionHeader
                    title='Container Details'
                    icon='list'
                />
                <ContainerDetail 
                    {...inspectData.get('detail').toJS()}
                />
                <SectionHeader
                    title='Container Volume'
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
    connect(
        state => ({
            inspectData: state.container.get('inspectData')
        }),
        dispatch => ({
            ContainerAction: bindActionCreators(container, dispatch),
            CommonAction: bindActionCreators(common, dispatch) 
        })
    )
)(ContainerDetailPage);
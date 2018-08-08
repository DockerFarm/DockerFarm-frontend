import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { Segment, Header, Icon, Label, Table, Button} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import * as container from 'store/modules/container';
import { ContainerInfo, ContainerDetail } from 'components/admin/container';
import { toast } from 'react-toastify';



class ContainerDetailPage extends Component {

    async componentWillMount() {
        const { ContainerAction, match } = this.props
        try {
            await ContainerAction.getContainerInfo(match.params.id);
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
        const { inspectData } = this.props;


        return (
            <React.Fragment>
                <Segment.Group>
                    <Segment>
                        <Header as='h5'>
                            <Icon name='list'/>
                            Container Information
                        </Header>
                    </Segment>
                    <Segment>
                        <ContainerInfo 
                            {...inspectData.get('info').toJS()}
                            onCommand={this.handleCommand}
                        />
                    </Segment>
                </Segment.Group>
                <Segment.Group>
                    <Segment>
                        <Header as='h5'>
                            <Icon name='list'/>
                            Container Details
                        </Header>
                    </Segment>
                    <Segment>
                        <ContainerDetail 
                            {...inspectData.get('detail').toJS()}
                        />
                    </Segment>
                </Segment.Group>
            </React.Fragment>
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
            ContainerAction: bindActionCreators(container, dispatch)
        })
    )
)(ContainerDetailPage);
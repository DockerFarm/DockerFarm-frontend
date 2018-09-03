import React, { Component } from 'react';
import { withSocketProgress } from 'components/hoc';
import { Modal, Icon, List, Button, Loader } from 'semantic-ui-react';
import { LogOutput } from 'components/base/ui';
import { Map, List as IList, fromJS } from 'immutable';
import { toast } from 'react-toastify';

class ImagePullModal extends Component {

    componentDidMount() {
        const { 
            setDone,
            onDone
        } = this.props;
        setDone( _ => {
            toast.success(`${this.props.image.get('name')} pull success!`);
            if(onDone) {
                onDone();
            }
        })
    }


    componentWillUpdate(nextProps, nextState) {
        const { setStatus } = this.props;
        if( this.props.image !== nextProps.image ) {
            setStatus({
                loading: false,
                status: []
            })
        }
    }

    handlePull = () => {
        const { setStatus, socket, image } = this.props;
        setStatus({
            loading: true,
            status: []
        })
        socket.emit('pull', JSON.stringify({ fromImage: image.get('name'), tag: 'latest' }));
    }


    render() {
        const {
            show,
            image,
            onClose,
            loading,
            status
        } = this.props;

        const { name, description } = image.toJS();
        return (
            <Modal 
                open={show}
                closeIcon
                onClose={onClose}
            >
                <Modal.Header>
                    {name}
                </Modal.Header>
                <Modal.Content>
                    <List>
                        <List.Item>{description}</List.Item>
                        <List.Item>
                            <Button 
                                color='blue' 
                                size='tiny'
                                type='button'
                                onClick={this.handlePull}
                                loading={loading}
                             >
                                <Icon name='download' /> 
                                Pull Image
                            </Button>
                            <Loader active inline inverted/>
                        </List.Item>
                        <List.Item>
                            <LogOutput height='400px'>
                                {
                                    status.map( v => (
                                        <div>
                                            {v.status} {v.progress}
                                        </div>
                                    ))
                                }
                            </LogOutput>
                        </List.Item>
                    </List>
                </Modal.Content>
            </Modal>
        )
    }
}

export default withSocketProgress(ImagePullModal);
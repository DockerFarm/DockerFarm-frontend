import React, { Component } from 'react';
import { Modal, Icon, List, Button, Loader } from 'semantic-ui-react';
import { LogOutput } from 'components/base/ui';
import { Map, List as IList, fromJS } from 'immutable';
import { toast } from 'react-toastify';
import io from 'socket.io-client';
import config from 'config';

class ImagePullModal extends Component {

    state = {
        data: Map({
            loading: false,
            pullStatus: IList([])
        })
    }

    componentDidMount() {
        this.socket = io(config.backendUrl);
        this.socket.on('pullProgress', resp => {
            const { data } = this.state;
            this.setState({
                data: data.update('pullStatus', arr => arr.push(fromJS(JSON.parse(resp))))
            });
        });
        this.socket.on('pullEnd', _ => {
            const { image } = this.props;
            const { data } = this.state;
            this.setState({
                data: data.set('loading', false)
            });
            toast.success(`${image.get('name')} pull success!`);
        });
    }

    componentWillUnmount() {
        this.socket.off('pullProgress');
        this.socket.off('pullEnd');
        this.socket.disconnect();
    }

    componentWillUpdate(nextProps, nextState) {
        if( this.props.image !== nextProps.image ) {
            this.setState({
                data: Map({
                    loading:false,
                    pullStatus: IList([])
                })
            })
        }
    }

    handlePull = () => {
        const { image } = this.props;
        const { data } = this.state;
        this.setState({
            data: data.set('loading', true)
                      .set('pullStatus', fromJS([{ status: 'Please Waiting...'}]))
        })
        this.socket.emit('pull', JSON.stringify({ fromImage: image.get('name'), tag: 'latest' }));
    }


    render() {
        const {
            show,
            image,
            onClose
        } = this.props;

        const { name, description } = image.toJS();
        const { data } = this.state;
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
                                loading={data.get('loading')}
                             >
                                <Icon name='download' /> 
                                Pull Image
                            </Button>
                            <Loader active inline inverted/>
                        </List.Item>
                        <List.Item>
                            <LogOutput height='400px'>
                                {
                                    data.get('pullStatus').toJS().map( v => (
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

export default ImagePullModal;
import React, { Component } from 'react';
import { Map, fromJS, List } from 'immutable';
import io from 'socket.io-client';
import config from 'config';

const withSocketProgress = WrappedComponent => {
    return class extends Component {

        state = {
            data: Map({
                loading: false,
                status: List([])
            })
        }

        constructor(props) {
            super(props);
            this.socket = io(config.backendUrl);
        }

        componentDidMount() {
            this.socket.on('progress', resp => {
                const { data } = this.state;
                try {
                    this.setState({
                        data: data.update('status', arr => arr.push(fromJS(JSON.parse(resp))))
                    });
                } catch(e) {

                }
            });
            this.socket.on('done', _ => {
                const { data } = this.state;
                this.setState({
                    data: data.set('loading', false) 
                });
                this.onDone();
            });
        }

        componentWillUnmount() {
            this.socket.off('progress');
            this.socket.off('end');
            this.socket.disconnect();
        }

        setDone = fn => {
            this.onDone = fn;
        }

        setStatus = param => {
            const { data } = this.state;
            this.setState({
                data: data.set('status', fromJS(param.status))
                          .set('loading', param.loading)
            })
        }

        render() {
            const {
                loading,
                status
            } = this.state.data.toJS();
            return (
                <WrappedComponent 
                    {...this.props}
                    status={status}
                    loading={loading}
                    setStatus={this.setStatus}
                    setDone={this.setDone}
                    socket={this.socket}
                />
            )
        }
    }
}

export default withSocketProgress;
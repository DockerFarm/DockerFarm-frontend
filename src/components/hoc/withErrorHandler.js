import React, { Component } from 'react';
import http from 'lib/httpClient';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import  Aux  from './Aux';

const withErrorHandler = (WrappedComponent) => {
    return class extends Component {
        state = {
            isAuth: true
        }
        componentDidMount() {
            const { history } = this.props;
            this.requsetInterceptor = http.interceptors.request.use(req => {
                return req;
            });

            this.responseInterceptor = http.interceptors.response.use(res => res, error => {
                if( error.response ) {
                    const status = get(error, 'response.status' );
                    if( status === 401 ) {
                        toast.error('UnAuthorized');
                        history.push('/login');
                    } else {
                        toast.error(error.response.data.message);
                    }
                } else {
                    toast.error('Internal Server Error');
                }
                return Promise.reject(error);
            });

        }

        componentWillUnmount() {
            http.interceptors.request.eject(this.requsetInterceptor);
            http.interceptors.request.eject(this.responseInterceptor);
        }

        render() {
            return (
                <Aux>
                    <WrappedComponent {...this.props} /> 
                </Aux>
            )
        }
    }
}

export default withErrorHandler;
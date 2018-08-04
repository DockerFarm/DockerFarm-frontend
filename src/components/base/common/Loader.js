import React, { Component } from 'react';
import { Spinner } from 'components/base/ui';
import { connect } from 'react-redux';

const Loader = ({pending}) => {
    const loading = Object.keys(pending).filter( v=> pending[v]).length > 0;

    return (
        <Spinner
            visible={loading} 
        />
    )
} 

export default connect(
    state => ({
        pending: state.pender.pending
    }),
    null
)(Loader);
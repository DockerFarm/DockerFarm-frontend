import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    border: 1px solid #ddd;
    background: #333;
    color:white;
    padding:3px;
    height: ${props => props.height || 'auto'};
    overflow-y:scroll;
`

class LogOutput extends Component {

    static defaultProps = {
        autoScroll: true
    }

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
    }

    componentDidUpdate(nextProps, nextState) {
        if( this.props.children !== nextProps.children ) {
            const { current } = this.wrapperRef;
            if( current && this.props.autoScroll )
                current.scrollTop = current.scrollHeight
        }
    }

    render() {
        return (
            <Wrapper
                innerRef={this.wrapperRef}
                height={this.props.height}
            >
                {this.props.children}
            </Wrapper>
        )
    }
}

export default LogOutput;

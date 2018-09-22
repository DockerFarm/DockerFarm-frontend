import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';

class RadioGroup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue
        }
    }
    
    render() {
        const {
            labels,
            values,
            onChange,
            group,
            button
        } = this.props;

        return (
            <Button.Group 
                size='tiny'
                {...group}
            >
                {
                    labels.map( (v,i) => (
                        <Button 
                            {...button}
                            size='tiny'
                            attached
                            color='grey'
                            key={i}
                            active={this.state.value === values[i]}
                            onClick={
                                _ => {
                                    this.setState({ value: values[i]});
                                    onChange(values[i]);
                                }
                            }
                        >
                            {v}
                        </Button>
                    ))
                }
            </Button.Group>
        )
    }
}

export default RadioGroup;
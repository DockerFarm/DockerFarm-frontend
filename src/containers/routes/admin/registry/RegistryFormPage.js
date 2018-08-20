import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { SectionHeader } from 'components/base/ui/header';
import { ControlInput, ControlCheckbox } from 'components/base/form';
import RegistryForm from './RegistryForm';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Aux } from 'components/hoc';


class RegistryFormPage extends Component {

    render() {
        return (
            <Aux>
                <SectionHeader 
                    title='Create Registry'
                    icon='database'
                />
                <Segment>
                    <RegistryForm />
                </Segment>
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    connect(
        state => ({

        }),
        dispatch => ({

        })
    )    
)(RegistryFormPage);
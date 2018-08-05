import React, { Component } from 'react';
import { initialize} from 'redux-form/immutable';
import { compose } from 'recompose';
import * as endPoint from 'store/modules/endpoint';
import { bindActionCreators } from 'redux';
import { EndpointForm, EndpointList } from 'components/admin/SettingPage';
import { 
    Segment, 
    Header,
    Icon
} from 'semantic-ui-react';
import { connect } from 'react-redux';


class SettingPage extends Component {


    async componentWillMount() {
        const { EndpointAction } = this.props;
        try{
            await EndpointAction.selectAllEndpoint(); 
        }catch(e){

        }
    }

    submit = async values => {
        const { EndpointAction, selectRow, setForm } = this.props;
        try {
            if( selectRow && selectRow.get('_id') ){
                await EndpointAction.updateEndpoint(selectRow.get('_id'), values.toJS());
                alert('Endpoint updated!');
            } else {
                await EndpointAction.addEndpoint(values.toJS());
                alert('Endpoint registered!');
                setForm(null);
            }
            await EndpointAction.selectAllEndpoint();
        } catch(e) {
        
        }
    }


    selectRow = row => {
        const { EndpointAction, setForm } = this.props;
        EndpointAction.selectRow(row);
        setForm(row);
    }

    onDelete = async () => {
        const { EndpointAction, selectRow, setForm } = this.props;
        
        try { 
            await EndpointAction.removeEndpoint(selectRow.get('_id'));
            alert('Endpoint is Deleted!');
            setForm(null);
            await EndpointAction.selectAllEndpoint();
        } catch(e) {

        }
    }


    onAdd = () => {
        const { EndpointAction, setForm} = this.props;
        EndpointAction.selectRow(null);
        setForm(null);
    }


    render() {
        const { 
            error, 
            mode, 
            selectRow
        } = this.props;
        const list = this.props.list.toJS();

        return (
            <Segment.Group>
                <Segment>
                    <Header as='h5'>
                        <Icon name='plug'/>
                        Connect to Docker EndPoint
                    </Header>
                </Segment>
                <Segment>
                    <EndpointList 
                        list={list}
                        selectRow={selectRow}
                        onRowSelect={this.selectRow}
                        onAdd={this.onAdd}
                    />
                    <Header as='h4'>
                        <Icon name='file' />
                        { mode === endPoint.REGISTER_MODE ? 'Endpoint Register' : 'Endpoint Modify'}
                    </Header>
                    <EndpointForm
                        onSubmit={this.submit}
                        onDelete={this.onDelete}
                        serverError={error}
                    />
                </Segment>
            </Segment.Group>
        )
    }
    
}


export default compose(
    connect(
        state => ({
            list: state.endPoint.get('list'),
            error: state.endPoint.getIn(['error','message']),
            mode: state.endPoint.get('mode'),
            selectRow: state.endPoint.get('selectRow') 
        }),
        dispatch => ({
            EndpointAction: bindActionCreators(endPoint, dispatch),
            setForm: data => {
                dispatch(initialize('endpoint', data));
            }
        })
    )
)(SettingPage);

import React, { Component } from 'react';
import { initialize} from 'redux-form/immutable';
import { compose } from 'recompose';
import * as endPoint from 'store/modules/endpoint';
import * as common from 'store/modules/common';
import { bindActionCreators } from 'redux';
import { EndpointForm, EndpointList } from 'components/admin/setting';
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui';
import { 
    Segment, 
    Header,
    Icon
} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';


class SettingPage extends Component {


    async componentWillMount() {
        const { EndpointAction, CommonAction } = this.props;
        try{
            CommonAction.setMenuTitle([
                {
                    title: 'Setting',
                    url: '/admin/settings'
                }
            ]) 
            await EndpointAction.selectAllEndpoint(); 
        }catch(e){

        }
    }

    submit = async values => {
        const { EndpointAction, selectRow, setForm } = this.props;
        try {
            if( selectRow && selectRow.get('_id') ){
                await EndpointAction.updateEndpoint(selectRow.get('_id'), values.toJS());
                toast.success("🚀 Endpoint registered !");
            } else {
                await EndpointAction.addEndpoint(values.toJS());
                toast.success("🚀 Endpoint updated !");
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
            toast.success("🚀 Endpoint deleted !");
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
            <Aux>
                <SectionHeader 
                    title='Connect to Docker Endpoint'
                    icon='plug'
                />
                <EndpointList 
                    list={list}
                    selectRow={selectRow}
                    onRowSelect={this.selectRow}
                    onAdd={this.onAdd}
                />
                <SectionHeader 
                    title={ mode === endPoint.REGISTER_MODE ? 'Endpoint Register' : 'Endpoint Modify'}
                    icon='file'
                />
                <Segment>
                    <EndpointForm
                        onSubmit={this.submit}
                        onDelete={this.onDelete}
                        serverError={error}
                    />
                </Segment>
            </Aux>
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
            CommonAction: bindActionCreators(common, dispatch),
            setForm: data => {
                dispatch(initialize('endpoint', data));
            }
        })
    )
)(SettingPage);

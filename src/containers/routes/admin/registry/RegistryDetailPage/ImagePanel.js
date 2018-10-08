import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Map, List, fromJS } from 'immutable';
import { bindActionCreators } from 'redux';
import { SectionHeader } from 'components/base/ui/header';
import { Label } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import * as registry from 'store/modules/registry';
import DataTable from 'containers/ui/DataTable';

class ImagePanel extends Component {

    state = {
        data: Map({
            imageList: List([])
        })
    }

    async componentDidMount(){
        const { RegistryAction, match } = this.props;
        const { data } = this.state;
        try {
            const { data: {result} }  = await RegistryAction.selectAllImages(match.params.id);
            this.setState({
                data: data.set('imageList', fromJS(result))
            }) 
        } catch (e) {
            /* handle error */
        }
    }

    render() {
        const imageList = this.state.data.get('imageList').toJS();
        const { intl } = this.props;

        return (
            <Aux>
                <SectionHeader 
                   title='Registry Images' 
                   icon='list'
                />
                <DataTable 
                    columns={[
                        {
                            header: 'Name',
                            id: 'name',
                            width: '200px',
                            cellAlign:'center'
                        },
                        {
                            header: 'Size',
                            id: 'size',
                            width: '200px',
                            cellAlign:'center'
                        },
                        {
                            header: 'Tags',
                            id: 'tags',
                            width: '200px',
                            cellAlign:'center',
                            template: ({tags}) => (
                                <Aux>
                                    {
                                        tags.map((v,i) => (
                                            <Label key={i}>{v}</Label> 
                                        ))
                                    }
                                </Aux>
                            )
                        }
                    ]}
                    data={imageList}
                />
            </Aux>
        )
    }
}

export default compose(
    withRouter, 
    injectIntl,
    connect(
        state => ({

        }),
        dispatch => ({
            RegistryAction: bindActionCreators(registry, dispatch)
        })
    )
)(ImagePanel);

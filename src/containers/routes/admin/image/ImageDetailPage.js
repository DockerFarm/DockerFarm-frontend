import React, { Component } from 'react';
import { SectionHeader } from 'components/base/ui/header';
import { ImageInfo, ImageDetail, ImageHistory } from 'components/admin/image';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Aux } from 'components/hoc';
import * as image from 'store/modules/image';
import * as common from 'store/modules/common';


class ImageDetailPage extends Component {

    async componentWillMount() {
        const { ImageAction, match } = this.props;

        try {
            await ImageAction.getImageInfo(match.params.id);
        } catch(e) {

        }
    }

    render() {
        const { inspectData, CommonAction, match } = this.props;

        CommonAction.updateMenuTitle({
            index: 1,
            menu: {
                title: inspectData.getIn(['info','tag']) 
            }
        })

        return (
            <Aux>
                <SectionHeader 
                    title='Image Info'
                />
                <ImageInfo 
                    {...inspectData.get('info').toJS()} 
                />

                <SectionHeader 
                    title='Image Details'
                />
                <ImageDetail
                    {...inspectData.get('detail').toJS()}
                />

                <SectionHeader 
                    title='Image History'
                />
                <ImageHistory
                    history={inspectData.get('history').toJS()}     
                />
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            inspectData: state.image.get('inspectData'),
            history: state.image.get('history')
        }),
        dispatch => ({
            ImageAction: bindActionCreators(image, dispatch),
            CommonAction: bindActionCreators(common, dispatch)
        })
    )
)(ImageDetailPage);
import React, { Component } from 'react';
import { SectionHeader } from 'components/base/ui/header';
import { ImageInfo, ImageDetail, ImageHistory } from 'components/admin/image';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Aux } from 'components/hoc';
import { toast } from 'react-toastify';
import * as image from 'store/modules/image';
import * as common from 'store/modules/common';


class ImageDetailPage extends Component {

    async componentDidMount() {
        const { ImageAction, CommonAction, match, history } = this.props;
        try {
            await ImageAction.getImageInfo(match.params.id);
            CommonAction.updateMenuTitle({
                index: 1,
                menu: {
                    title: match.params.id 
                }
            })
        } catch(e) {
            alert(e.message);
        }
    }

    handleDelete = async id => {
        const { ImageAction, history, match } = this.props;

        try {
            await ImageAction.deleteImage(match.params.id);
            toast.success('Image delete success!');
            history.push('/admin/images');
        } catch(e) {
            alert(e.message);
        }
    }

    render() {
        const { inspectData, CommonAction, match } = this.props;


        return (
            <Aux>
                <SectionHeader 
                    title='Image Info'
                />
                <ImageInfo 
                    {...inspectData.get('info').toJS()} 
                    onDelete={this.handleDelete}
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
    connect(
        state => ({
            inspectData: state.image.get('inspectData')
        }),
        dispatch => ({
            ImageAction: bindActionCreators(image, dispatch),
            CommonAction: bindActionCreators(common, dispatch)
        })
    )
)(ImageDetailPage);
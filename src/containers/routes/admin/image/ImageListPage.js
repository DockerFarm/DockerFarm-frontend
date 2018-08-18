import React, { Component } from 'react';
import { SectionHeader } from 'components/base/ui/header';
import { Aux } from 'components/hoc';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ImageList, ImageSearchForm } from 'components/admin/image';
import * as image from 'store/modules/image';

class ImageListPage extends Component {

    async componentWillMount() {
        const { ImageAction } = this.props;
        
        try {
            await ImageAction.getImageList();           
        } catch(e) {

        }
    }

    render() {
        const { list } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='Search Image'
                    icon='search'
                />
                <ImageSearchForm 
                />
                <SectionHeader 
                    title='Image Management'
                    icon='list'
                />
                <ImageList
                    list={list.toJS()}
                />
            </Aux>
        ) 
    }
}


export default compose(
    withRouter, 
    connect(
        state => ({
            list: state.image.get('list')           
        }),
        dispatch => ({
            ImageAction : bindActionCreators(image, dispatch)
        })
    )

)(ImageListPage);
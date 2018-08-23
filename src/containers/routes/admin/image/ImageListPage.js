import React, { Component } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import { SectionHeader } from 'components/base/ui/header';
import { Aux } from 'components/hoc';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ImageList, ImageSearchForm } from 'components/admin/image';
import * as image from 'store/modules/image';

class ImageListPage extends Component {

    async componentDidMount() {
        const { ImageAction } = this.props;
        
        try {
            await ImageAction.getImageList();           
        } catch(e) {

        }
    }

    render() {
        const { list, match } = this.props;
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
                <div>
                    <Button
                        as={Link}
                        color='blue'
                        size='tiny'
                        to={`${match.path}/build`}
                    >
                        <Icon name='plus'/>
                        Build a New Image
                    </Button>
                </div>
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
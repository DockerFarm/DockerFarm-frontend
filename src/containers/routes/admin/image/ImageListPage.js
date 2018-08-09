import React, { Component } from 'react';
import { Segment, Header, Icon} from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ImageList } from 'components/admin/image';
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
            <Segment.Group>
                <Segment>
                    <Header as='h5'>
                        <Icon name='list'/>
                        Image Management
                    </Header>
                </Segment>
                <Segment>
                    <ImageList
                        list={list.toJS()}
                    />
                </Segment>
            </Segment.Group>
        
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
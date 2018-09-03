import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Label, Segment, Icon, List } from 'semantic-ui-react';
import ImagePullModal from 'containers/common/ImagePullModal';
import { LinkTitle } from 'components/base/ui';
import { SectionHeader } from 'components/base/ui/header';
import { Aux } from 'components/hoc';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ImageSearchForm, ImageSearchResult } from 'components/admin/image';
import { toast } from 'react-toastify';
import DataTable from 'containers/ui/DataTable';
import * as image from 'store/modules/image';

class ImageListPage extends Component {

    async componentDidMount() {
        const { ImageAction } = this.props;
        
        try {
            ImageAction.setSearchResult([]);
            await ImageAction.getImageList();           
        } catch(e) {

        }
    }

    handleSearch = async form => {
        const { ImageAction } = this.props;
        const { query } = form.toJS();
        try { 
            await ImageAction.searchImage(query);
        } catch(e) {

        }
    }

    handlePrune = async _ => {
        const { ImageAction } = this.props;
        
        try {
            await ImageAction.pruneImage();
            await ImageAction.getImageList();
            toast.success('Garbege Collection Success!');
        } catch(e) {

        }
    }

    handleClear = _ => {
        const { ImageAction } = this.props;
        ImageAction.setSearchResult([]);
    }

    openImageModal = image => {
        const { ImageAction } = this.props;
        ImageAction.setModalState({
            show: true,
            image
        });
    }

    onClose = async () => {
        const { ImageAction } = this.props;
        
        try {
            ImageAction.setModalState({
                show: false,
                image: {} 
            });
            await ImageAction.getImageList();           
        } catch(e) {

        }
    }

    render() {
        const { list, searchResult, modalState, match, intl } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'IMG_SEARCH_HEADER'})}
                    icon='search'
                />
                <Segment>
                    <ImageSearchForm 
                        onSubmit={this.handleSearch}
                    />
                    <ImageSearchResult 
                        list={searchResult.toJS()}
                        onItemClick={this.openImageModal}
                        onClear={this.handleClear}
                    />
                </Segment>
                <SectionHeader 
                    title={intl.formatMessage({id: 'IMG_LIST_HEADER'})}
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
                        {intl.formatMessage({id: 'IMG_BTN_BUILD'})}
                    </Button>
                    <Button
                        color='red'
                        size='tiny'
                        type='button'
                        onClick={this.handlePrune}
                    >
                        <Icon name='trash' />
                        {intl.formatMessage({id: 'BTN_GARBEGE_COLLECTION'})}
                    </Button>
                </div>
                <DataTable 
                    data={list.toJS()}
                    paging
                    checkable
                    columns={[
                        {
                            header: 'Id',
                            id: 'id',
                            width: '100px',
                            cellAlign: 'center',
                            template: ({id}) => (
                                <LinkTitle 
                                    to={`/admin/images/${id}`}
                                    label={id} 
                                />
                            )
                        },
                        {
                            header: 'Tag',
                            id: 'tag',
                            width: '300px',
                            template: ({tag}) => (
                                <Label color='blue'>{tag}</Label>
                            )
                        },
                        {
                            header: 'Size',
                            id: 'size',
                            width: '100px',
                            cellAlign: 'center'
                        },
                        {
                            header: 'Created',
                            id: 'created',
                            width: '100px',
                            cellAlign: 'center'
                        }
                    ]}
                />
                <ImagePullModal 
                    show={modalState.get('show')}                    
                    image={modalState.get('image')}
                    onClose={this.onClose}
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
            list: state.image.get('list'),
            searchResult: state.image.get('searchResult'),
            modalState: state.image.get('modalState')
        }),
        dispatch => ({
            ImageAction : bindActionCreators(image, dispatch)
        })
    )

)(ImageListPage);
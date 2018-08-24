import React, { Component } from 'react';
import { Button, Label, Segment, Icon, List } from 'semantic-ui-react';
import ImagePullModal from 'containers/common/ImagePullModal';
import { LinkTitle } from 'components/base/ui';
import { SectionHeader } from 'components/base/ui/header';
import { Aux } from 'components/hoc';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { ImageSearchForm } from 'components/admin/image';
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
        const { list, searchResult, modalState, match } = this.props;
        return (
            <Aux>
                <SectionHeader 
                    title='Search Image'
                    icon='search'
                />
                <Segment>
                    <ImageSearchForm 
                        onSubmit={this.handleSearch}
                    />
                    {
                        searchResult.toJS().length > 0 ?
                        <List divided>
                            {
                                searchResult.toJS().map( v => (
                                    <List.Item key={v.name}>
                                        <List.Icon name='clone' size='large' verticalAlign='middle'/>
                                        <List.Content>
                                            <List.Header as='h4'>
                                                <LinkTitle
                                                    onClick={ _ => this.openImageModal({
                                                        name: v.name,
                                                        description: v.description
                                                    })}
                                                    label={v.name}
                                                />
                                            </List.Header>
                                            <List.Description>
                                                {v.description}
                                            </List.Description>
                                        </List.Content>
                                    </List.Item>
                                ))
                            }
                            <List.Item>
                                <Button
                                    size='tiny'
                                    type='button'
                                    onClick={this.handleClear}
                                >
                                    <Icon name='sync'/>
                                    Clear
                                </Button>
                            </List.Item>
                        </List>
                        : null
                    }
                </Segment>
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
import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Card, Image, Header, List, Icon } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SectionHeader } from 'components/base/ui/header';
import { ImageLoader, LinkTitle } from 'components/base/ui';
import ImagePullModal from 'containers/common/ImagePullModal';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';
import * as library from 'store/modules/library';
import * as image from 'store/modules/image';

const HeaderWrapper = styled.div`
    padding-top:10px;
    padding-bottom:10px;
` 

const ImageHeader = styled(Header)`
    margin-top:10px !important;
`

const StyledCard = styled(Card)`
    &:first-child {
        margin-top:1em !important;
    }
`

const masonryOptions = {
    gutter: 30
};

class LibraryListPage extends Component {
    
    async componentDidMount() {
        const { LibraryAction } = this.props;

        try {
            await LibraryAction.getLibraryList({
                page:1,
                page_size:50
            });
        } catch(e) {

        }
    }

    openImageModal = image => {
        const { ImageAction } = this.props;
        ImageAction.setModalState({
            show: true,
            image
        });
    }

    onClose = () => {
        const { ImageAction } = this.props;
        ImageAction.setModalState({
            show: false,
            image: {} 
        });
    }
    render() {
        const { list, modalState, intl } = this.props;
        return (
            <Aux>
                <SectionHeader
                    // title='You can look around the Offial Image and get a Pull'
                    title={intl.formatMessage({id: 'LIB_DESCRIPTION_HEADER'})}
                />
                <Masonry
                    options={masonryOptions}
                >

                    {
                        list.toJS().map( v =>(
                                <StyledCard key={v.name}>
                                    <Card.Header>
                                        <HeaderWrapper>
                                            <ImageLoader 
                                                src={v.logo} 
                                                size='small'
                                                brokenImage='/img/default.jpg'
                                                centered
                                                rounded
                                            />
                                            <ImageHeader 
                                                as='h3'
                                                textAlign='center'
                                                color='grey'
                                            >
                                                <LinkTitle 
                                                    label={v.name}
                                                    onClick={ _ => this.openImageModal(v)}
                                                />
                                            </ImageHeader>
                                        </HeaderWrapper>
                                    </Card.Header>
                                    <Card.Content>
                                        <div>
                                            {v.description}
                                        </div>
                                        <List>
                                            <List.Item>
                                                <Icon name='star'/> {v.startCount}
                                            </List.Item>
                                            <List.Item>
                                                <Icon name='arrow down'/> {v.pullCount}
                                            </List.Item>
                                        </List>
                                    </Card.Content>
                                </StyledCard>
                        ))
                    }
                </Masonry>
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
            modalState: state.image.get('modalState'),
            list: state.library.get('list')
        }),
        dispatch => ({
            ImageAction: bindActionCreators(image, dispatch),
            LibraryAction: bindActionCreators(library, dispatch)            
        })
    )    
)(LibraryListPage);
import React, { Component } from 'react';
import { Button, Card, Image, Header, List, Icon } from 'semantic-ui-react';
import { Aux } from 'components/hoc';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SectionHeader } from 'components/base/ui/header';
import { ImageLoader } from 'components/base/ui';
import Masonry from 'react-masonry-component';
import styled from 'styled-components';
import * as library from 'store/modules/library';

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

const imagesLoadedOptions = {
    background: '.test'
}

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

    render() {
        const { list } = this.props;
        return (
            <Aux>
                <SectionHeader
                    title='You can look around the Offial Image and get a Pull'
                />
                <Masonry
                    options={masonryOptions}
                    imagesLoadedOptions={imagesLoadedOptions}
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
                                            {v.name} 
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
                                            <List.Item>
                                                <Button 
                                                    color='blue'
                                                    type='button'
                                                    size='tiny'
                                                    floated='right'
                                                >
                                                    <Icon name='arrow down'/> Pull
                                                </Button>
                                            </List.Item>
                                        </List>
                                    </Card.Content>
                                </StyledCard>
                        ))
                    }
                </Masonry>
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    connect(
        state => ({
            list: state.library.get('list')
        }),
        dispatch => ({
            LibraryAction: bindActionCreators(library, dispatch)            
        })
    )    
)(LibraryListPage);
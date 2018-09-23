import React, { Component } from 'react';
import { Aux } from 'components/hoc';
import { Field, reduxForm, submit } from 'redux-form/immutable';
import { SectionHeader } from 'components/base/ui/header';
import { ButtonWrapper } from 'components/base/ui';
import { withRouter, Link } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { bindActionCreators } from 'redux';
import { Form, Button, Icon} from 'semantic-ui-react';
import { ControlSelectbox } from 'components/base/form';
import { ImageSearchForm, ImageSearchResult }from 'components/admin/image';
import ImagePullModal from 'containers/common/ImagePullModal';
import { required } from 'lib/validation';

import * as image from 'store/modules/image';
import * as container from 'store/modules/container';

class Step1 extends Component {

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

    handleNextStep = _ => {
        const { 
            ContainerAction,
            history,
        } = this.props;

        ContainerAction.setStep(1);
        history.push('/admin/containers/new/step2');
    }


    render() {
        const { 
            imageList,
            searchResult,
            modalState,
            intl,
            handleSubmit
        } = this.props;

        return (
            <Aux>
                <SectionHeader 
                    title={intl.formatMessage({id: 'CON_STEP1_IMAGE_HEADER'})}
                />
                <Form as='form'>
                    <Form.Group>
                        <Form.Field width={14}>
                            <Field 
                                label={intl.formatMessage({id: 'CON_STEP1_FIELD_IMAGE'})}
                                name='image'
                                options={imageList.toJS().map(v => ({ text: v.tag, value : v.tag, key: v._id}))}
                                validate={[required]}
                                component={ControlSelectbox} 
                            />
                        </Form.Field>
                    </Form.Group>
                </Form>
                <SectionHeader
                    title={intl.formatMessage({id: 'CON_STEP1_HUB_HEADER'})}
                />
                <ImageSearchForm
                    onSubmit={this.handleSearch}
                />
                <ImageSearchResult 
                    list={searchResult.toJS()}
                    onItemClick={this.openImageModal}
                />
                <ButtonWrapper>
                    <Button.Group floated='right'>
                        <Button
                            as={Link}
                            to={`/admin/containers`}
                            size='tiny'
                        >
                            <Icon name='list' />
                            {intl.formatMessage({id: 'BTN_LIST'})}
                        </Button>
                        <Button
                            size='tiny'
                            color='blue'
                            onClick={handleSubmit(this.handleNextStep)}
                        >
                            <Icon 
                                name='arrow right'
                                style={{ marginLeft:0, marginRight: '3px'}}
                            />
                            {intl.formatMessage({id: 'BTN_NEXT'})}
                        </Button>
                    </Button.Group>
                </ButtonWrapper>
                <ImagePullModal 
                    show={modalState.get('show')}                    
                    image={modalState.get('image')}
                    onDone={this.handlePullDone}
                    onClose={this.onClose}
                />
            </Aux>
        )
    }
}

export default compose(
    withRouter,
    injectIntl,
    reduxForm({
        form: 'step1',
        destroyOnUnmount: false,        // <------ preserve form data
        forceUnregisterOnUnmount: false,  // <------ unregister fields on unmount
    }),
    connect(
        state => ({
            imageList: state.image.get('list'),
            searchResult: state.image.get('searchResult'),
            modalState: state.image.get('modalState') 
        }),
        dispatch => ({
            ImageAction: bindActionCreators(image, dispatch),
            ContainerAction: bindActionCreators(container, dispatch),
        })
    )
)(Step1)

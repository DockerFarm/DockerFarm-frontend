import React from 'react';
import { Modal, Icon } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

const ContainerInspectModal = ({
    name,
    data,
    show,
    onClose
}) => (
    <Modal 
        open={show}
        closeIcon
        onClose={onClose}
    >
        <Modal.Header>
            <Icon name='info circle' color='blue'/>
            {name} inspect info
        </Modal.Header>
        <Modal.Content>
            <ReactJson 
                src={data}
            />
        </Modal.Content>
    </Modal>
)

export default ContainerInspectModal;
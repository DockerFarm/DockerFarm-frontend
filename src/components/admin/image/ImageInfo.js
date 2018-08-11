import React, { Component } from 'react';
import { Table, Button, Icon, Label} from 'semantic-ui-react';

const ImageInfo = ({
    id,
    size,
    created,
    dockerversion,
    os,
    architecture,
    onDelete
}) => (
    <Table>
        <Table.Body>
            <Table.Row>
                <Table.Cell>Id</Table.Cell>
                <Table.Cell>
                    <Label style={{marginRight:'10px'}}>{id}</Label>
                    <Button color='red' onClick={onDelete}>
                        <Icon name='trash'/> 
                        Delete this Image
                    </Button>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Size</Table.Cell>
                <Table.Cell>{size}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Created</Table.Cell>
                <Table.Cell>{created}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Build</Table.Cell>
                <Table.Cell>Docker {dockerversion} on {os}, {architecture}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
);


export default ImageInfo;

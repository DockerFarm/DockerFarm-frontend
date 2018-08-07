import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { LinkTitle } from 'components/base/ui'; 
import moment from 'moment';

const EndpointListItem = ({
    ep,
    selectRow,
    onRowSelect
}) => (
    <Table.Row key={ep.name} positive={ selectRow && selectRow.get('_id') == ep._id}>
        <Table.Cell textAlign='center'>
            {
                ep.isActive ? 
                <Icon name='checkmark' color='teal'/> : null
            }
        </Table.Cell>
        <Table.Cell textAlign='left'>
            <LinkTitle onClick={ () => onRowSelect(ep)}>
                {ep.name}
            </LinkTitle>
        </Table.Cell>
        <Table.Cell textAlign='left'>{ep.url}</Table.Cell>
        <Table.Cell textAlign='center'>{moment(ep.createdAt).format('YYYY.MM.DD')}</Table.Cell>
        <Table.Cell textAlign='center'>{moment(ep.updatedAt).format('YYYY.MM.DD')}</Table.Cell>
    </Table.Row>
);


export default EndpointListItem;
import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

const NetworkContainers = ({
    containers,
    onLeave
}) => (
    <Table>
        <Table.Header>
            <Table.HeaderCell>Container Name</Table.HeaderCell>
            <Table.HeaderCell>IPv4 Address</Table.HeaderCell>
            <Table.HeaderCell>IPv6 Address</Table.HeaderCell>
            <Table.HeaderCell>Mac Address</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
            {
                containers.map( v => (
                    <Table.Row key={v.id}>
                        <Table.Cell>{v.name}</Table.Cell>
                        <Table.Cell>{v.ipv4}</Table.Cell>
                        <Table.Cell>{v.ipv6}</Table.Cell>
                        <Table.Cell>{v.mac}</Table.Cell>
                        <Table.Cell>
                            <Button 
                                color='red' 
                                size='tiny'
                                onClick={ () => onLeave(v.id)}
                            >
                                <Icon name='trash' />
                                Leave Network
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
);

export default NetworkContainers;
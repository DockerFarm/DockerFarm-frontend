import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';

const NetworkInfo = ({
    name,
    id,
    driver,
    scope,
    subnet,
    gateway,
    onDelete
}) => (
    <Table>
        <Table.Body>
            <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>
                    {name}
                    <Button color='red' size='tiny' style={{marginLeft:'10px'}}>
                        <Icon name='trash' />
                        Delete Network
                    </Button>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Id</Table.Cell>
                <Table.Cell>{id}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Driver</Table.Cell>
                <Table.Cell>{driver}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Scope</Table.Cell>
                <Table.Cell>{scope}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Subnet</Table.Cell>
                <Table.Cell>{subnet}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Gateway</Table.Cell>
                <Table.Cell>{gateway}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default NetworkInfo;
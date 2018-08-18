import React from 'react';
import { Table } from 'semantic-ui-react';

const VolumeContainers = ({
    list
}) => (
    <Table>
        <Table.Header>
            <Table.HeaderCell>Container Name</Table.HeaderCell>
            <Table.HeaderCell>Mounted At</Table.HeaderCell>
            <Table.HeaderCell>Read-Only</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
            {
                list.map( (v,i) => (
                    <Table.Row key={i}>
                        <Table.Cell>{v.name}</Table.Cell>
                        <Table.Cell>{v.mountat}</Table.Cell>
                        <Table.Cell>{v.readonly}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
)

export default VolumeContainers;
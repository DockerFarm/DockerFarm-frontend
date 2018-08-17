import React from 'react';
import { Table } from 'semantic-ui-react';

const VolumeInfo = ({
    name,
    driver,
    mountpath
}) => (
    <Table>
        <Table.Body>
            <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>{name}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Driver</Table.Cell>
                <Table.Cell>{driver}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>MountPath</Table.Cell>
                <Table.Cell>{mountpath}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default VolumeInfo;
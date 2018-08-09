import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

const ContainerVolume = ({
    volume
}) => (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Host/Volume</Table.HeaderCell>
                <Table.HeaderCell>Path in Container</Table.HeaderCell>
                <Table.HeaderCell>mode</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                volume.map( (v,i) => (
                    <Table.Row key={i}>
                        <Table.Cell>{v.src}</Table.Cell>
                        <Table.Cell>{v.dest}</Table.Cell>
                        <Table.Cell>{v.mode}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
);


export default ContainerVolume
import React from 'react';
import { Table } from 'semantic-ui-react';

const ImageHistory = ({
    history
}) => (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Order</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>Layer</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                history.map( (v,i) => (
                    <Table.Row key={i}>
                        <Table.Cell>{i}</Table.Cell>
                        <Table.Cell>{v.size}</Table.Cell>
                        <Table.Cell>{v.layer}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
)

export default ImageHistory;
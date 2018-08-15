import React from 'react';
import { Table } from 'semantic-ui-react';
import { keys } from 'lodash';

const NetworkOptions = ({
    options
}) => (
    <Table>
        <Table.Body>
            {
                keys(options).map( v => (
                    <Table.Row>
                        <Table.Cell>{v}</Table.Cell>
                        <Table.Cell>{options[v]}</Table.Cell>
                    </Table.Row>
                ))     
            }
        </Table.Body>
    </Table>
);

export default NetworkOptions;
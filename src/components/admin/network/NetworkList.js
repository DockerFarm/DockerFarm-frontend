import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { LinkTitle } from 'components/base/ui';



const NetworkList = ({
    list
}) => (
    <Table>
        <Table.Header>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Scope</Table.HeaderCell>
            <Table.HeaderCell>Driver</Table.HeaderCell>
            <Table.HeaderCell>IPAM Driver</Table.HeaderCell>
            <Table.HeaderCell>IPAM Subnet</Table.HeaderCell>
            <Table.HeaderCell>IPAM Gateway</Table.HeaderCell>
        </Table.Header>
        <Table.Body>
            {
                list.map( (v,i) => (
                    <Table.Row key={v.id}>
                        <Table.Cell>
                            <LinkTitle 
                                to={`/admin/networks/${v.id}`} 
                                label={v.name}
                            />
                        </Table.Cell>
                        <Table.Cell>{v.scope}</Table.Cell>
                        <Table.Cell>{v.driver}</Table.Cell>
                        <Table.Cell>{v.ipamdriver}</Table.Cell>
                        <Table.Cell>{v.subnet}</Table.Cell>
                        <Table.Cell>{v.gateway}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
)

export default NetworkList;
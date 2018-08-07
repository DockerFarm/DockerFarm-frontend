import React, { Component } from 'react';
import { TableNoData } from 'components/base/ui';
import ContainerListItem from './ContainerListItem';
import {
    Table,
    Icon,
    Label
} from 'semantic-ui-react';

const ContainerList = ({
    list,
    onInspect
}) => {

    const noData = (
        <TableNoData
            numOfCell={6}
        />
    );

    const listData = (
        <React.Fragment>
            {
                list.map(container => (
                    <ContainerListItem
                        key={container.id}
                        container={container}
                        onInspect={onInspect}
                    />
                ))
            }
        </React.Fragment>
    );

    return (
            <Table color='teal' fixed>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign='center'>Id</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Name</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Image</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Command</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>State</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Status</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Ip</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Port<br/>(internal:public)</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        list.length > 0 ? 
                        listData :
                        noData           
                    }
                </Table.Body>
            </Table>
        )
}


export default ContainerList;
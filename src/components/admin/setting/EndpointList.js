import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { TableNoData, TableColGroup } from 'components/base/ui';
import EndpointListItem from './EndpointListItem';

const EndpointList = ({
    list,
    selectRow,
    onRowSelect,
    onAdd
}) => {
    const noData = (
        <TableNoData 
            numOfCell={5} 
        />
    );
    
    const listData = (
            <React.Fragment>
                {
                    list.map( ep => (
                        <EndpointListItem 
                            key={ep._id}
                            ep={ep}
                            selectRow={selectRow}
                            onRowSelect={onRowSelect}
                        />
                    ))
                }
            </React.Fragment>
    );

    return (
        <Table fixed color='teal'>
            <TableColGroup
                cols={['30px','80px','350px','60px','60px']}
            />
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>Active</Table.HeaderCell>
                    <Table.HeaderCell textAlign='left'>Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>EndPoint URL</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>CreatedAt</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>UpdatedtAt</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                { 
                    list.length > 0 ? listData : noData
                }
            </Table.Body>
            <Table.Footer>
                <Table.Row>
                    <Table.HeaderCell colSpan={5}>
                        <Button 
                            floated='right' 
                            color='blue'
                            onClick={onAdd}
                        ><Icon name='plus'/>Add Endpoint</Button> 
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}

export default EndpointList;
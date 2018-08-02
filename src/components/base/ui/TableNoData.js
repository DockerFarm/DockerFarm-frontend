import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const TableNoData = ({numOfCell}) => (
    <Table.Row>
       <Table.Cell colSpan={numOfCell}>
            <Label>No Data Found!!</Label>
       </Table.Cell> 
    </Table.Row>
);


export default TableNoData;
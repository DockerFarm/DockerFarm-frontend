import React from 'react';
import { Table, Label, Select } from 'semantic-ui-react';

const ImageList = ({
    list
}) => (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Id</Table.HeaderCell>
                <Table.HeaderCell>Tag</Table.HeaderCell>
                <Table.HeaderCell>Size</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                list.map( v => (
                    <Table.Row key={v.id}>
                        <Table.Cell>{v.id}</Table.Cell>
                        <Table.Cell><Label color='blue'>{v.tag}</Label></Table.Cell>
                        <Table.Cell>{v.size}</Table.Cell>
                        <Table.Cell>{v.created}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={4}>
                Items for Pages
                <Select options={[
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5}
                ]}></Select>
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
)


export default ImageList;
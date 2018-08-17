import React from 'react';
import { Table, Label, Select } from 'semantic-ui-react';
import { LinkTitle } from 'components/base/ui';

const ImageList = ({
    list
}) => (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell textAlign='center'>Id</Table.HeaderCell>
                <Table.HeaderCell textAlign='left'>Tag</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Size</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Created</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                list.map( v => (
                    <Table.Row key={v.id}>
                        <Table.Cell textAlign='center'>
                            <LinkTitle 
                                to={`/admin/images/${v.id}`}
                                label={v.id} 
                            />
                        </Table.Cell>
                        <Table.Cell textAlign='left'><Label color='blue'>{v.tag}</Label></Table.Cell>
                        <Table.Cell textAlign='center'>{v.size}</Table.Cell>
                        <Table.Cell textAlign='center'>{v.created}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
        <Table.Footer>
            <Table.Row>
                <Table.HeaderCell colSpan={4}>
                Items for Pages
                {/* <Select options={[
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5},
                    { key : 5, value : 5, text:5}
                ]}></Select> */}
                </Table.HeaderCell>
            </Table.Row>
        </Table.Footer>
    </Table>
)


export default ImageList;
import React from 'react';
import { Table, Label } from 'semantic-ui-react';

const ImageDetail = ({
    cmd,
    entrypoint,
    port,
    env
}) => (
    <Table>
        <Table.Body>
            <Table.Row>
                <Table.Cell>CMD</Table.Cell>
                <Table.Cell>
                    <Label>{cmd}</Label>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>ENTRYPOINT</Table.Cell>
                <Table.Cell>
                    <Label>{entrypoint}</Label>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>PORT</Table.Cell>
                <Table.Cell>{port}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>ENV</Table.Cell>
                    <Table.Cell>
                        <Table>
                            <Table.Body>
                                {
                                    env.map( (v,i) => (
                                        <Table.Row key={i}>
                                            <Table.Cell>{v.split('=')[0]}</Table.Cell>                               
                                            <Table.Cell>{v.split('=')[1]}</Table.Cell>                               
                                        </Table.Row>
                                    ))
                                }
                            </Table.Body>
                        </Table>
                    </Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default ImageDetail;
import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import { keys } from 'lodash';

const ContainerDetail = ({
   image,
   command,
   env,
   labels,
   restartPolicy,
   maxRetryCount
}) => {
    return (
        <Table>
            <Table.Row> 
                <Table.Cell>Image</Table.Cell>
                <Table.Cell>{image}</Table.Cell>
            </Table.Row>
            <Table.Row> 
                <Table.Cell>Command</Table.Cell>
                <Table.Cell>{command}</Table.Cell>
            </Table.Row>
            <Table.Row> 
                <Table.Cell>ENV</Table.Cell>
                <Table.Cell>
                    <Table>
                        {
                            env.map( (v,i) => (
                                <Table.Row>
                                    <Table.Cell>{v.split('=')[0]}</Table.Cell>                               
                                    <Table.Cell>{v.split('=')[1]}</Table.Cell>                               
                                </Table.Row>
                            ))
                        }
                    </Table>
                </Table.Cell>
            </Table.Row>
            <Table.Row> 
                <Table.Cell>Labels</Table.Cell>
                <Table.Cell>
                    <Table>
                        {
                            keys(labels).map( k => (
                                <Table.Row>
                                    <Table.Cell>{k}</Table.Cell>
                                    <Table.Cell>{labels[k]}</Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table>
                </Table.Cell>
            </Table.Row>
            <Table.Row> 
                <Table.Cell>RestartPolicy</Table.Cell>
                <Table.Cell>
                    <Table>
                        <Table.Row>
                            <Table.Cell>Name</Table.Cell>
                            <Table.Cell>{restartPolicy}</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>maxRetryCount</Table.Cell>
                            <Table.Cell>{maxRetryCount}</Table.Cell>
                        </Table.Row>
                    </Table>
                </Table.Cell>
            </Table.Row>
        </Table>
    );
}

export default ContainerDetail;
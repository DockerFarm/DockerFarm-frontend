import React from 'react';
import { Table } from 'semantic-ui-react';
import { LinkTitle } from 'components/base/ui';

const VolumeList = ({
    list
}) => (
    <Table>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Driver</Table.HeaderCell>
                <Table.HeaderCell>MountPoint</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            {
                list.map((volume,index) => (
                    <Table.Row key={index}>
                        <Table.Cell>
                            <LinkTitle 
                                to={`/admin/volumes/${volume.name}`}
                                label={volume.name}
                            />
                        </Table.Cell>
                        <Table.Cell>{volume.driver}</Table.Cell>
                        <Table.Cell>{volume.mountpoint}</Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
)

export default VolumeList;
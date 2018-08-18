import React from 'react';
import { Table, Button, Icon} from 'semantic-ui-react';

const VolumeInfo = ({
    name,
    driver,
    mountpath,
    onDelete
}) => (
    <Table>
        <Table.Body>
            <Table.Row>
                <Table.Cell>Name</Table.Cell>
                <Table.Cell>
                    {name}
                    <Button 
                        color='red' 
                        size='tiny' 
                        type='button'
                        style={{marginLeft:'10px'}}
                        onClick={ onDelete}
                    >
                        <Icon name='trash' />
                        Delete Volume
                    </Button>
                </Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>Driver</Table.Cell>
                <Table.Cell>{driver}</Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell>MountPath</Table.Cell>
                <Table.Cell>{mountpath}</Table.Cell>
            </Table.Row>
        </Table.Body>
    </Table>
)

export default VolumeInfo;
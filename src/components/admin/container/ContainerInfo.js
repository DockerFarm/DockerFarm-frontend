import React, { Component } from 'react';
import { Table, Button, Icon} from 'semantic-ui-react';
import moment from 'moment';

const GrpButton = ({
    color,
    onClick,
    icon,
    label
}) => (

    <Button
        color={color}
        onClick={onClick}
        type='button'
    >
        <Icon name={icon}/>{label}
   </Button>
)

const createBtn = (color, onClick, icon, label) => (
    {
        color,
        onClick,
        icon,
        label
    }
) ;
const ContainerInfo = ({
    id,
    name,
    status,
    image,
    startedAt,
    created,
    onStart,
    onStop,
    onKill,
    onRestart,
    onPause,
    onResume,
    onRemove,
    onRecreate
}) => {

    const btnGroup = [
        createBtn('teal',onStart,'play','Start'),
        createBtn('red',onStop,'stop','Stop'),
        createBtn('red',onKill,'bomb','Kill'),
        createBtn('blue',onRestart,'sync','Restart'),
    ];
    const btnGroup2 = [
        createBtn('blue',onPause,'pause','Pause'),
        createBtn('blue',onResume,'forward','Resume'),
        createBtn('red',onRemove,'trash','Remove'),
        createBtn('red',onRecreate,'sync','Recreate')
    ];
    return (
            <Table>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>ID</Table.Cell>
                        <Table.Cell>{id}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Name</Table.Cell>
                        <Table.Cell>{name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Status</Table.Cell>
                        <Table.Cell>{status}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Image</Table.Cell>
                        <Table.Cell>{image}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Started</Table.Cell>
                        <Table.Cell>{moment(startedAt).format('YYYY-MM-DD HH:MM:SS')}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Created</Table.Cell>
                        <Table.Cell>{moment(created).format('YYYY-MM-DD HH:MM:SS')}</Table.Cell>
                    </Table.Row>
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='2'>
                            <Button.Group style={{marginRight:'4px', marginBottom:'4px'}}>
                                {
                                    btnGroup.map( btn => (
                                        <GrpButton
                                            key={btn.label}
                                            color={btn.color} 
                                            icon={btn.icon} 
                                            label={btn.label} 
                                            onClick={btn.onClick} 
                                        />
                                    ))
                                }
                            </Button.Group>
                            <Button.Group >
                                {
                                    btnGroup2.map( btn => (
                                        <GrpButton
                                            key={btn.label}
                                            color={btn.color} 
                                            icon={btn.icon} 
                                            label={btn.label} 
                                            onClick={btn.onClick} 
                                        />
                                    ))
                                }
                            </Button.Group>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
    )
}

export default ContainerInfo;
import React from 'react';
import { Table, Icon, Label } from 'semantic-ui-react';
import { LinkTitle } from 'components/base/ui';

const ContainerListItem = ({
    container,
    onInspect
}) => {
    const {
        id,
        image,
        command,
        status,
        state,
        port,
        name,
        ip
    } = container;

    return (
        <Table.Row >
            <Table.Cell textAlign='center'>{id}</Table.Cell>
            <Table.Cell textAlign='center'>
                <LinkTitle>{name}</LinkTitle>
                <Icon onClick={ () => onInspect(id,name) } name='info circle' color='blue' style={{marginLeft: '5px'}}/> 
            </Table.Cell>
            <Table.Cell textAlign='center'>{image}</Table.Cell>
            <Table.Cell textAlign='center'>{command}</Table.Cell>
            <Table.Cell textAlign='center'>
                <Label color={state == 'running' ? 'teal' : 'red'}>{state}</Label>
            </Table.Cell>
            <Table.Cell textAlign='center'>{status}</Table.Cell>
            <Table.Cell textAlign='center'>{ip}</Table.Cell>
            <Table.Cell textAlign='center'>
                { 
                    port.map( v =>
                        <Label color='blue'>{`${v.private}:${v.public}`}</Label>
                    )
                }
            </Table.Cell>
        </Table.Row>
    )
}

export default ContainerListItem;
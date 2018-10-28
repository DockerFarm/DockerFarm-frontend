import React, { Component } from 'react';
import { Table, Button, Icon, Label} from 'semantic-ui-react';
import { forIn } from 'lodash';
import { Aux } from 'components/hoc';
import { InfoTable } from 'components/base/ui';
import moment from 'moment';

const GrpButton = ({
    color,
    onClick,
    icon,
    label,
    disabled
}) => (

    <Button
        size='tiny'
        attached
        color={color}
        onClick={onClick}
        disabled={disabled}
    >
        <Icon name={icon}/>{label}
   </Button>
)

const createBtn = ({color, onClick, icon, label, disableStatus}) => (
    {
        color,
        onClick,
        icon,
        label,
        disableStatus
    }
) ;

const renderStatus = status => {
    let color = ''
    const colorMap = {
        teal: ['created', 'restarting', 'running'],
        red: ['removing', 'paused', 'exited', 'dead']
    };

    forIn(colorMap, (v,k) => {
        if(v.indexOf(status) !== -1) color = k;
    });

    return <Label color={color}>{status}</Label>
};

const ContainerInfo = ({
    id,
    name,
    status,
    image,
    startedAt,
    created,
    onCommand
}) => {
    
    const createCommand = command => () => onCommand(command);

    const commandGroup1 = [
        createBtn({ 
            color: 'teal', 
            onClick: createCommand('start'), 
            icon: 'play', 
            label: 'Start', 
            disableStatus: ['running','restarting']
        }),
        createBtn({ 
            color: 'red', 
            onClick: createCommand('stop'), 
            icon: 'stop', 
            label: 'Stop', 
            disableStatus: ['exited','removing','dead']
        }),
        createBtn({ 
            color: 'red', 
            onClick: createCommand('kill'), 
            icon: 'bomb', 
            label: 'Kill', 
            disableStatus: ['exited','removing','dead']
        }),
        createBtn({ 
            color: 'blue', 
            onClick: createCommand('restart'), 
            icon: 'sync', 
            label: 'Restart', 
            disableStatus: []
        })
    ];

    const commandGroup2 = [
        createBtn({ 
            color: 'blue', 
            onClick: createCommand('pause'), 
            icon: 'pause', 
            label: 'Pause', 
            disableStatus: ['exited','dead','removing']
        }),
        createBtn({ 
            color: 'blue', 
            onClick: createCommand('resume'), 
            icon: 'forward', 
            label: 'Resume', 
            disableStatus: ['running','restarting','created','exited','dead','removing']
        }),
        createBtn({ 
            color: 'red', 
            onClick: createCommand('remove'), 
            icon: 'remove', 
            label: 'Remove', 
            disableStatus: ['removing']
        }),
        createBtn({ 
            color: 'red', 
            onClick: createCommand('update'), 
            icon: 'sync', 
            label: 'Recreate', 
            disableStatus: []
        })
    ];

    return (
        <Aux>
            <div>
                <Button.Group style={{marginRight:'4px', marginBottom:'4px'}}>
                    {
                        commandGroup1.map( btn => (
                            <GrpButton
                                key={btn.label}
                                color={btn.color} 
                                icon={btn.icon} 
                                label={btn.label} 
                                onClick={btn.onClick} 
                                disabled={btn.disableStatus.indexOf(status) != -1}
                            />
                        ))
                    }
                </Button.Group>
                <Button.Group >
                    {
                        commandGroup2.map( btn => (
                            <GrpButton
                                key={btn.label}
                                color={btn.color} 
                                icon={btn.icon} 
                                label={btn.label} 
                                onClick={btn.onClick} 
                                disabled={btn.disableStatus.indexOf(status) != -1}
                            />
                        ))
                    }
                </Button.Group>
            </div>
            <InfoTable 
                widths={[100,800]} 
                data={[
                    {
                       header: 'ID',
                       cell: id
                    },
                    {
                        header: 'Name',
                        cell: name
                    },
                    {
                        header: 'Status',
                        cell: renderStatus(status)
                    },
                    {
                        header: 'Image',
                        cell: image
                    },
                    {
                        header: 'Started',
                        cell: moment(startedAt).format('YYYY-MM-DD HH:MM:SS')
                    },
                    {
                        header: 'Created',
                        cell: moment(created).format('YYYY-MM-DD HH:MM:SS')
                    }
                ]}
            />
        </Aux>
    )
}

export default ContainerInfo;

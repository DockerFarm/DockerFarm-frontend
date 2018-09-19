import React from 'react';
import { Table, Icon, Button } from 'semantic-ui-react';
import { InfoTable } from 'components/base/ui';
import { Aux } from 'components/hoc';

const NetworkInfo = ({
    name,
    id,
    driver,
    scope,
    subnet,
    gateway,
    onDelete
}) => (
    <InfoTable 
        widths={[100, 800]}
        data={[
            {
                header: 'Name',
                cell: (
                    <Aux>
                        {name}
                        <Button 
                            color='red' 
                            size='tiny' 
                            type='button'
                            style={{marginLeft:'10px'}}
                            onClick={ () => onDelete()}
                        >
                            <Icon name='trash' />
                            Delete Network
                        </Button>
                    </Aux>
                )
            },
            {
                header: 'Id',
                cell: id
            },
            {
                header: 'Driver',
                cell: driver 
            },
            {
                header: 'Scope',
                cell: scope
            },
            {
                header: 'Subnet',
                cell: subnet
            },
            {
                header: 'Gateway',
                cell: gateway
            }
        ]}
    />
)

export default NetworkInfo;
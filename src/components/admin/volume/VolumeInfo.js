import React from 'react';
import { Table, Button, Icon} from 'semantic-ui-react';
import { InfoTable } from 'components/base/ui';
import { Aux } from 'components/hoc';

const VolumeInfo = ({
    name,
    driver,
    mountpath,
    onDelete
}) => (
    <InfoTable
        widths={[100,800]}
        data={[
            {
                header: 'Name',
                cell:(
                    <Aux>
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
                    </Aux>
                )
            },
            {
                header: 'Driver',
                cell: driver
            },
            {
                header: 'MountPath',
                cell: mountpath
            }
        ]}
    />
)

export default VolumeInfo;
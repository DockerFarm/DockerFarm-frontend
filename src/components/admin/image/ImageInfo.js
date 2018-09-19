import React, { Component } from 'react';
import { Table, Button, Icon, Label} from 'semantic-ui-react';
import { InfoTable } from 'components/base/ui';
import { Aux } from 'components/hoc';

const ImageInfo = ({
    id,
    size,
    created,
    dockerversion,
    os,
    architecture,
    onDelete
}) => (
    <InfoTable 
        widths={[100,800]}
        data={[
            {
                header: 'Id',
                cell: (
                    <Aux>
                        <Label style={{marginRight:'10px'}}>{id}</Label>
                        <Button 
                            color='red' 
                            size='tiny'
                            onClick={ _ => onDelete(id)}
                        >
                            <Icon name='trash'/> 
                            Delete this Image
                        </Button>
                    </Aux>
                )
            },
            {
                header: 'Size',
                cell: size
            },
            {
                header: 'Created',
                cell: created
            },
            {
                header: 'Build',
                cell: (
                    <Aux>
                        Docker {dockerversion} on {os}, {architecture}
                    </Aux>
                )
            }
        ]}
    />
);


export default ImageInfo;

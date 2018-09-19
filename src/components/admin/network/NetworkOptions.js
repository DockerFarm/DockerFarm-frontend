import React from 'react';
import { keys } from 'lodash';
import { InfoTable } from 'components/base/ui';

const NetworkOptions = ({
    options
}) => (
    <InfoTable 
        widths={[100,800]}
        data={
            keys(options).map( v => ({
                header: v,
                cell: options[v]
            }))     
        }
    />
);

export default NetworkOptions;
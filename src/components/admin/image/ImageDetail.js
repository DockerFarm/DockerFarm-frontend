import React from 'react';
import { Table, Label } from 'semantic-ui-react';
import { InfoTable } from 'components/base/ui';

const ImageDetail = ({
    cmd,
    entrypoint,
    port,
    env
}) => (
    <InfoTable 
        widths={[100,800]}
        data={[
            {
                header: 'CMD',
                cell: cmd
            },
            {
                header: 'ENTRYPOINT',
                cell: entrypoint
            },
            {
                header: 'PORT',
                cell: port
            },
            {
                header: 'ENV',
                cell: (
                    <InfoTable 
                        widths={[100,800]}
                        data={
                            env.map((v,i) => ({
                                header: v.split('=')[0],
                                cell: v.split('=')[1]
                            }))
                        }
                    />
                )
            }
        ]}
    />
)

export default ImageDetail;
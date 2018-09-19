import React, { Component } from 'react';
import { InfoTable } from 'components/base/ui';
import { Table } from 'semantic-ui-react';
import { keys } from 'lodash';

const ContainerDetail = ({
   image,
   command,
   env,
   labels,
   restartPolicy,
   maxRetryCount
}) => {
    return (
        <InfoTable
            widths={[100,800]}
            data={[
                {
                    header: 'Images',
                    cell: image
                },
                {
                    header: 'Command',
                    cell: command
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
                },
                {
                    header: 'Labels',
                    cell: (
                        <InfoTable 
                            widths={[100,800]}
                            data={
                                keys(labels).map((v,i) => ({
                                    header: v,
                                    cell: labels[v] 
                                }))
                            }
                        />
                    )
                },
                {
                    header: 'RestartPolicy',
                    cell: (
                        <InfoTable 
                            widths={[100,800]}
                            data={[
                                {
                                    header: 'Name',
                                    cell: restartPolicy
                                },
                                {
                                    header: 'MaxRetryCount',
                                    cell: maxRetryCount
                                }
                            ]}
                        />
                    )                    
                }
            ]}
        />
    );
}

export default ContainerDetail;
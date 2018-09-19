import React from 'react';
import { Table } from 'semantic-ui-react';
import { If, Aux } from 'components/hoc';
import { map } from 'lodash';
import styled from 'styled-components';

const HeaderCell = styled(Table.Cell)`
    background: #F9FAFB;
    text-align:center !important;
`
const InfoTable = ({
    data,
    widths
}) => (
    <Table>
        <colgroup>
            {
                widths.map((v,i) => (
                    <col width={`${v}px`}></col>
                ))
            }
        </colgroup>
        <Table.Header></Table.Header>
        <Table.Body>
            {
                data.map((v,i) => (
                    <Table.Row key={i}>
                        <HeaderCell>{v.header}</HeaderCell>
                        <Table.Cell>
                            {v.cell}
                        </Table.Cell>
                    </Table.Row>
                ))
            }
        </Table.Body>
    </Table>
)

export default InfoTable;
import React from 'react';

const TableColGroup = ({
    cols
}) => (
    <colgroup>
        {
            cols.map( (v,i) => 
                <col key={i} width={v}></col>
            )
        } 
    </colgroup>
)

export default TableColGroup;
import React, { Component } from 'react';
import { Table, Pagination, Select, Checkbox } from 'semantic-ui-react';
import styled from 'styled-components';
import { Aux, If } from 'components/hoc';
import { Map, List, fromJS} from 'immutable';
import { difference, union } from 'lodash';



const PagingWrapper = styled.div`
    display:flex;
    justify-content:space-between;
`
const HeaderCell = styled(Table.HeaderCell)`
    overflow:visible !important;
`

const buildPageSizeOption = gap => {
    const options = [];
    for( let i = gap ; i <= gap*5 ; i += gap ) {
        options.push({ key: i, value: i, text: i});
    }
    return options;
}

class DataTable extends Component {

    state = {
        data: Map({
            allCheck: false,
            currentPage: 1,
            pageSize: this.props.paging.pageSize || 10,
            checkedList: List([])
        })
    }

    handlePageSizeChange = ({value}) => {
        const { data } = this.state;
        this.setState({
            data: data.set('currentPage', 1)
                      .set('pageSize', value) 
        })
    }
    
    handlePageChange = ({activePage}) => {
        const { data } = this.state;
        this.setState({
            data: data.set('currentPage', activePage)
                      .set('allCheck', false)
        })
    }

    handleCheck = index => {
        const { data } = this.state;
        const checkedList = data.get('checkedList').toJS();
        if(  checkedList.findIndex(v => v === index) !== -1 ) {
            this.setState({
                data: data.set('checkedList', fromJS(checkedList.filter((v,i) => v !== index )))
            })
        } else {
            this.setState({
                data: data.update('checkedList', arr => arr.push(index))
            })
        }
        
        if( this.props.onCheckChange ) {
            this.props.onCheckChange(this.state.data.get('checkedList').toJS());
        }
    }

    handleAllCheck = _ => {
        const { paging, data } = this.props;
        const { currentPage, pageSize, checkedList, allCheck } = this.state.data.toJS();

        let firstIndex = 0;
        let lastIndex = data.length; 
        let checkedArray = checkedList.concat([]);
        let pageArray = [];

        if( paging ) {
            firstIndex = (currentPage-1)* pageSize;
            lastIndex  = firstIndex + pageSize;
        }

        for( let i = firstIndex ; i < lastIndex ; i ++ ) {
            pageArray.push(i);
        }

        this.setState({
            data: this.state.data
                        .set('checkedList', 
                            !allCheck ? 
                                fromJS(union(checkedArray, pageArray)) :
                                fromJS(difference(checkedArray, pageArray)))
                        .set('allCheck', !allCheck)
        })
    }

    render() {
        const { 
            data, 
            columns, 
            checkable, 
            paging
        } = this.props;

        const {
            currentPage,
            pageSize,
            checkedList,
            allCheck
        } = this.state.data.toJS();

        let currentDataIndex = 0;
        let currentDataList = data;
        let pageBlockSize;


        if( paging ) {
            pageBlockSize = paging.pageBlockSize || 10;
            currentDataIndex = (currentPage-1) * pageSize;
            currentDataList = data.slice(currentDataIndex, currentDataIndex+pageSize)
        }

        return (
            <Table fixed>
                    <colgroup>
                        <If 
                            condition={checkable}
                            then={
                                <col width='30px'></col>
                            }
                        />
                        { 
                            columns.map((column,i) => (
                                <col key={i} width={column.width}></col>
                            ))
                        }
                    </colgroup>
                <Table.Header>
                    <Table.Row>
                        <Aux>
                            <If 
                                condition={checkable}
                                then={
                                    <Table.HeaderCell
                                        textAlign='center'
                                    >
                                        <Checkbox 
                                            name='allcheck'
                                            checked={allCheck}
                                            onClick={this.handleAllCheck}

                                        />

                                    </Table.HeaderCell>
                                }
                            />
                            {
                                columns.map( (column,i) => (
                                        <Table.HeaderCell 
                                            textAlign={column.headerAlign || 'center'}
                                            key={i}
                                        >
                                            {column.header}
                                        </Table.HeaderCell>
                                )) 
                            }
                        </Aux>                  
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <If
                        condition={currentDataList.length > 0} 
                        then={
                            currentDataList.map( (row, i) => (
                                <Table.Row key={i}>
                                    <If 
                                        condition={checkable}
                                        then={
                                            <Table.Cell
                                                textAlign='center'
                                            >
                                                <Checkbox 
                                                    checked={ checkedList.findIndex(v => v === (i+currentDataIndex)) !== -1}
                                                    onClick={ _ => this.handleCheck(i+currentDataIndex)}
                                                />
                                            </Table.Cell>
                                        }
                                    />
                                    {
                                        columns.map( (column,i) => (
                                            <Table.Cell 
                                                textAlign={column.cellAlign || 'left'}
                                                key={i}
                                            >
                                                {
                                                    column.template ? 
                                                    column.template(row):
                                                    row[column.id]
                                                }
                                            </Table.Cell>
                                        ))
                                    }
                                </Table.Row>
                            ))
                        }
                        else={

                            <Table.Row>
                                <Table.Cell colSpan={columns.length + (checkable ? 1 : 0)}>
                                    No Data Found
                                </Table.Cell>
                            </Table.Row>
                        }
                    />
                </Table.Body>
                <If 
                    condition={paging}
                    then={
                        <Table.Footer>
                            <Table.Row>
                                <HeaderCell 
                                    colSpan={columns.length + (checkable ? 1 : 0)}
                                >
                                    <PagingWrapper>
                                            <div>
                                                <label style={{marginRight: '6px'}}>
                                                    Number Of Pages
                                                </label>
                                                <Select 
                                                    value={pageSize}
                                                    onChange={ (e,props) => this.handlePageSizeChange(props)}
                                                    options={buildPageSizeOption(10)}
                                                />
                                            </div>
                                            <Pagination 
                                                defaultActivePage={1}
                                                totalPages={Math.ceil(data.length / pageSize)}
                                                onPageChange={ (e,data) => this.handlePageChange(data)}
                                                boundaryRange={pageBlockSize}
                                                firstItem={null}
                                                lastItem={null}
                                            />
                                    </PagingWrapper>
                                </HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    }
                />
            </Table>
        )
    }

}

export default DataTable;
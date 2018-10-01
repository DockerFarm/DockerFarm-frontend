import React, { Component  } from 'react';
import { 
    LineChart, 
    AreaChart, 
    Area,
    Line, 
    XAxis, 
    YAxis, 
    ResponsiveContainer, 
    CartesianGrid, 
    Tooltip, 
    Legend 
} from 'recharts';
import { Grid, Icon } from 'semantic-ui-react';
import { withRouter  } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose'; 
import { Aux } from 'components/hoc';
import { SectionHeader } from 'components/base/ui/header';
import { Map, List, fromJS } from 'immutable';
import { Box } from 'components/base/ui';
import DataTable from 'containers/ui/DataTable';

import * as ContainerApi from 'lib/api/container';

const convertBytes = bytes => {
   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes == 0) return '0 Byte';
   const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const customTick = props => {
    const {x, y, stroke, payload} = props;

    return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-50)">{payload.value}</text>
        </g>
    );
}

class StatPanel extends Component {
    state = {
        data: Map({
            memoryData: List([]),
            cpuData: List([]),
            networkData: List([]),
            process: Map({
                columns: List([]),
                data: List([])
            })
        })
    }

    async componentDidMount() {
        const { match } = this.props;
        const requestStat = async _ => {
            try {
                const response = await ContainerApi.getContainerStat(match.params.id);

                const { data } = this.state;
                const {
                    memoryUsage,
                    cpuUsage,
                    network: {
                        rx,
                        tx
                    },
                    time
                } = response.data.result;

                this.setState({
                    data: data.updateIn(['memoryData'], arr => arr.push({ time, memoryUsage}))
                              .updateIn(['cpuData'], arr => arr.push({time, cpuUsage}))
                              .updateIn(['networkData'], arr => arr.push({time, rx, tx}))
                })
            } catch (e) {
                /* handle error */
                console.log(e);
            }
        }

        try {
            //get Process List
            const { data } = this.state;
            const response = await ContainerApi.getProcessInsideContainer(match.params.id);
            const { Processes, Titles } = response.data.result;
            this.setState({
                data: data.setIn(['process', 'columns'], fromJS(Titles))
                          .setIn(['process', 'data'], fromJS(Processes))
            })
        } catch (e) {
            /* handle error */
        }
        this.timerId = setInterval(requestStat, 5000);
        requestStat();
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

	render() {
        const { data } = this.state;

        const columns = data.getIn(['process','columns']).toJS();
        const body = data.getIn(['process','data']).toJS();

		return (
			<Aux>
                <Grid columns={3}>
                    <Grid.Row>
                        <Grid.Column>
                            <SectionHeader 
                                title='Memory Usage' 
                            />
                            <ResponsiveContainer width='100%' height={300}>
                                <AreaChart 
                                    data={data.get('memoryData').toJS()}
                                 >
                               <XAxis dataKey="time" tick={customTick} height={50}/>
                               <YAxis tickFormatter={convertBytes}/>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <Tooltip/>
                               <Legend verticalAlign='top'/>
                               <Area 
                                   type="monotone" 
                                   dataKey="memoryUsage" 
                                   stroke='#8884d8' 
                                   fill='#8884d8'
                                   activeDot={{r: 8}}
                               />
                              </AreaChart>
                            </ResponsiveContainer>

                        </Grid.Column>
                        <Grid.Column>
                            <SectionHeader 
                                title='CPU Usage' 
                            />
                            <ResponsiveContainer width='100%' height={300}>
                                <AreaChart 
                                    data={data.get('cpuData').toJS()}
                                 >
                               <XAxis dataKey="time" tick={customTick} height={50}/>
                               <YAxis tickFormatter={v => v + '%'} domain={[0, 1]}/>
                               <CartesianGrid strokeDasharray="3 3"/>
                               <Tooltip/>
                               <Legend verticalAlign='top'/>
                               <Area 
                                   type="monotone" 
                                   dataKey="cpuUsage" 
                                   stroke='#8884d8' 
                                   fill='#8884d8'
                                   activeDot={{r: 8}}
                               />
                              </AreaChart>
                            </ResponsiveContainer>
                        </Grid.Column>
                        <Grid.Column>
                            <SectionHeader 
                                title='Network Usage' 
                            />
                            <ResponsiveContainer width='100%' height={300}>
                                <LineChart 
                                    data={data.get('networkData').toJS()}
                                 >
                               <XAxis dataKey="time" tick={customTick} height={50}/>
                               <YAxis tickFormatter={convertBytes} />
                               <CartesianGrid strokeDasharray="3 3"/>
                               <Tooltip/>
                               <Legend verticalAlign='top'/>
                               <Line type="monotone" dataKey="rx" stroke="#8884d8" activeDot={{r: 8}}/>
                               <Line type="monotone" dataKey="tx" stroke="#333333" activeDot={{r: 8}}/>
                              </LineChart>
                            </ResponsiveContainer>

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Box mt={40}>
                    <SectionHeader 
                        title='Processes' 
                    />
                    <DataTable 
                        columns={
                            columns.map(v => {
                                return {
                                    header: v,
                                    id: v,
                                    width: 'auto',
                                    cellAlign: 'center'
                                }
                            })
                        } 
                        data={
                            body.map(v => {
                                return v.reduce((acc,v,i) => {
                                    acc[columns[i]] = v;
                                    return acc;
                                },{})
                            })
                        }
                    />
                </Box>
			</Aux>
		)
	}
}

export default compose(
	withRouter,
	injectIntl,
)(StatPanel)

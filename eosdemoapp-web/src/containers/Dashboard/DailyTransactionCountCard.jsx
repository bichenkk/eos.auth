import React from 'react'
import { Card } from 'antd'
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from 'bizcharts'

class WeeklyTransactionCountCard extends React.Component {
  render() {
    const {
      transactionCountByDate7Day,
    } = this.props
    if (!transactionCountByDate7Day) {
      return null
    }
    const data = transactionCountByDate7Day
    const cols = {
      sales: {
        tickInterval: 5,
      },
    }
    return (
      <Card>
        <h4 style={{ marginBottom: '24px' }}>Daily Redemptions (Last 7 Days)</h4>
        <div style={{ textAlign: 'center' }}>
          <Chart height={300} data={data} scale={cols} width={600} padding={['auto', 'auto', 'auto', 'auto']}>
            <Axis name='date' />
            <Axis name='count' />
            <Tooltip
              crosshairs={{
                type: 'y',
              }}
            />
            <Geom
              color='#edd247'
              type='interval'
              position='date*count'
              size='50'
            />
          </Chart>
        </div>
      </Card>
    )
  }
}

export default WeeklyTransactionCountCard

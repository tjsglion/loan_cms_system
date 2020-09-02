import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, /* MiniArea */ } from './Charts';
// import { VisitDataType } from '../data.d';
import Yuan from '../utils/Yuan';


const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: {[key: string]: any} }) => (
  <Row gutter={24}>
    <Col span={8}>
      <ChartCard
        bordered={false}
        title="意向客户"
        action={
          <Tooltip
            title='意向客户'
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>{visitData.loanCustomerCount || 0}</Yuan>}
        contentHeight={46}
      >
        {/* <MiniArea color="#975FE4" data={visitData} /> */}
      </ChartCard>
    </Col>

    <Col span={8}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="签约客户"
        action={
          <Tooltip
            title="签约客户"
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(`${visitData.potentialCustomerCount || 0}`).format('0,0')}
        contentHeight={46}
      >
        {/* <MiniArea color="#975FE4" data={visitData} /> */}
      </ChartCard>
    </Col>
    <Col span={8}>
      <ChartCard
        bordered={false}
        loading={loading}
        title="放款金额"
        action={
          <Tooltip
            title='放款金额'
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={`￥${  numeral(`${visitData.totalLoanMoney}`).format('0,0')}`}
        contentHeight={46}
      >
        {/* <MiniArea color="#975FE4" data={visitData} /> */}
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;

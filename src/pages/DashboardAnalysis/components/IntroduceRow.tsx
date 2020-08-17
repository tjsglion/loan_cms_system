import { InfoCircleOutlined } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';

import { FormattedMessage } from 'umi';
import React from 'react';
import numeral from 'numeral';
import { ChartCard, MiniArea } from './Charts';
import { VisitDataType } from '../data.d';
import Yuan from '../utils/Yuan';


const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: VisitDataType[] }) => (
  <Row gutter={24}>
    <Col span={8}>
      <ChartCard
        bordered={false}
        title={
          <FormattedMessage id="dashboardanalysis.analysis.total-sales" defaultMessage="Total Sales" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboardanalysis.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>126560</Yuan>}
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>

    <Col span={8}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="dashboardanalysis.analysis.visits" defaultMessage="Visits" />}
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboardanalysis.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(8846).format('0,0')}
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
    <Col span={8}>
      <ChartCard
        bordered={false}
        loading={loading}
        title={<FormattedMessage id="dashboardanalysis.analysis.payments" defaultMessage="Payments" />}
        action={
          <Tooltip
            title={
              <FormattedMessage id="dashboardanalysis.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <InfoCircleOutlined />
          </Tooltip>
        }
        total={numeral(6560).format('0,0')}
        contentHeight={46}
      >
        <MiniArea color="#975FE4" data={visitData} />
      </ChartCard>
    </Col>
  </Row>
);

export default IntroduceRow;

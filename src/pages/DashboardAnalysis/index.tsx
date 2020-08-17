/* eslint-disable @typescript-eslint/lines-between-class-members */
import { Col, Row, Card, List } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';
import { connect } from 'umi';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import PageLoading from './components/PageLoading';
// import { getTimeDistance } from './utils/utils';
import { AnalysisData } from './data.d';
// import styles from './style.less';
import { Pie } from './components/Charts';
import { fetchAdList } from '../Config/Ad/server';
import { fetchStaticData } from './service';


const IntroduceRow = React.lazy(() => import('./components/IntroduceRow'));

type RangePickerValue = RangePickerProps<moment.Moment>['value'];

interface DashboardAnalysisProps {
  dashboardAnalysis: AnalysisData;
  // dispatch: Dispatch<any>;
  loading: boolean;
}

interface DashboardAnalysisState {
  salesType: 'all' | 'online' | 'stores';
  currentTabKey: string;
  rangePickerValue: RangePickerValue;
}

class DashboardAnalysis extends Component<
  DashboardAnalysisProps,
  DashboardAnalysisState
> {

  reqRef: number = 0;
  // timeoutId: number = 0;
  // selectDate = (type: 'today' | 'week' | 'month' | 'year') => {
  //   // const { dispatch } = this.props;
  //   this.setState({
  //     rangePickerValue: getTimeDistance(type),
  //   });
  // };

  // @ts-ignore
  state = {
    adLists: [],
    staticData: {}
  }
  
  // isActive = (type: 'today' | 'week' | 'month' | 'year') => {
  //   const { rangePickerValue } = this.state;
  //   if (!rangePickerValue) {
  //     return '';
  //   }
  //   const value = getTimeDistance(type);
  //   if (!value) {
  //     return '';
  //   }
  //   if (!rangePickerValue[0] || !rangePickerValue[1]) {
  //     return '';
  //   }
  //   if (
  //     rangePickerValue[0].isSame(value[0] as moment.Moment, 'day') &&
  //     rangePickerValue[1].isSame(value[1] as moment.Moment, 'day')
  //   ) {
  //     return styles.currentDate;
  //   }
  //   return '';
  // };

  componentDidMount () {
    fetchAdList({
      pageIndex: 1,
      pageSize: 10
    }).then(res => {
      const {data} = res;
      this.setState({
        // @ts-ignore
        adLists: data
      });
    });
    // 加载统计数据
    fetchStaticData({}).then(res => {
      if (res.status === 0) {
        this.setState({
          // @ts-ignore
          // staticData: Object.assign({...res.data}, {totalLoanMoney: 30000})
          staticData: res.data
        })
      }
    })
  }

  render() {
    const { /* dashboardAnalysis, */ loading } = this.props;
    // const {
    //   visitData,
    // } = dashboardAnalysis;

    // @ts-ignore
    const columns: ProColumns<Array<{[key: string]: any}>> = [
      {
        title: '计划时间',
        dataIndex: 'a'
      },
      {
        title: '客户姓名',
        dataIndex: 'b'
      },
      {
        title: '计划内容',
        dataIndex: 'c'
      },
      {
        title: '金额',
        dataIndex: 'd'
      },
    ];

    const {adLists, staticData} = this.state;

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <IntroduceRow loading={loading} visitData={staticData} />
          </Suspense>

          <Card style={{ marginTop: '10px'}}>
            <Row justify="space-between">
              <Col span={11}>
                <h2>公司动态</h2>
                  <Pie
                    animate={false}
                    inner={0.8}
                    tooltip={false}
                    margin={[0, 0, 0, 0]}
                    percent={90 * 100}
                    height={200}
                  />

                  <List
                    style={{ marginTop: '10px' }}
                    header={false}
                    footer={false}
                    dataSource={adLists}
                    renderItem={(item: {[key: string]: any}) => (
                      <List.Item>
                        {item.content}
                      </List.Item>
                    )}
                  />
              </Col>
              <Col span={12}>
                <h2>计划列表</h2>
                <ProTable 
                  rowKey="id"
                  toolBarRender={false}
                  search={false}
                  // @ts-ignore
                  columns={columns}
                  pagination={false}
                />
              </Col>
            </Row>
          </Card>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default connect(
  ({
    dashboardAnalysis,
    loading,
  }: {
    dashboardAnalysis: any;
    loading: {
      effects: { [key: string]: boolean };
    };
  }) => ({
    dashboardAnalysis,
    loading: loading.effects['dashboardAnalysis/fetch'],
  }),
)(DashboardAnalysis);

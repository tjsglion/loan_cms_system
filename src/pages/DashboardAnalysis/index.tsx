/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable prefer-object-spread */
import { Col, Row, Card, List } from 'antd';
import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import moment from 'moment';
import { connect } from 'umi';
import numeral from 'numeral';
import ProTable, { ProColumns } from '@ant-design/pro-table';
import { DATETIME } from '@/constants';
import PageLoading from './components/PageLoading';
// import { getTimeDistance } from './utils/utils';
import { AnalysisData } from './data.d';
// import styles from './style.less';
import { Pie } from './components/Charts';
import { fetchAdList } from '../Config/Ad/server';
import { fetchStaticData } from './service';
import { fetchFollowLogList } from '../OrderCenter/MakeFollowUp/server';
import { MakeFollowUpParmas } from '../OrderCenter/MakeFollowUp/data';


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
    staticData: {},
    signData: [
      {
        x: '续费签约',
        y: 45
      },
      {
        x: '待转化客户',
        y: 56
      },
    ]
  }
  
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
        const {potentialCustomerCount, loanCustomerCount} = res.data;
        const $signData = [
          {
            x: '续费签约',
            y: potentialCustomerCount
          },
          {
            x: '待转化客户',
            y: loanCustomerCount
          }
        ];
        this.setState({
          // @ts-ignore
          staticData: res.data,
          signData: $signData
        })
      }
    });
    // 加载做单列表信息
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
        dataIndex: 'followTime',
        width: '25%',
        render: (_, record) => {
          if (record.followTime) return moment(record.followTime).format(DATETIME);
          return '--';
        }
      },
      {
        title: '客户姓名',
        dataIndex: 'customerName',
        width: '15%',
        render: val => val || '--'
      },
      {
        title: '计划内容',
        dataIndex: 'followDetails',
        width: '25%',
        render: val => val || '--'
      },
      {
        title: '金额',
        dataIndex: 'expectLoanMoney',
        width: '25%',
        render: val => `${numeral(val).format('0,00.00')}元` ||'--'
      },
    ];

    const {adLists, staticData, signData} = this.state;

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
                    hasLegend
                    animate={false}
                    title="签约"
                    subTitle="签约"
                    data={signData}
                    total={() => (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: signData.reduce((pre, now) => now.y + pre, 0)
                        }}
                      />
                    )}
                    valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
                    height={155}
                    lineWidth={0}
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
                  // @ts-ignore
                  request={(params: {[key: string]: any}) => {
                    if (params) {
                      const tempParms: MakeFollowUpParmas = {
                        ...params,
                        pageIndex: params.pageIndex || 1,
                        pageSize: params.pageSize || 10
                      }
                      delete tempParms.current;
                      // @ts-ignore
                      delete tempParms._timestamp;
                      return fetchFollowLogList(tempParms)
                    }
                    return {data: []}
                  }}
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

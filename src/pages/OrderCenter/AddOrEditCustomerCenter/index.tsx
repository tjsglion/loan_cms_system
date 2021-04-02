/* eslint-disable prefer-object-spread */
import React, {useState, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'umi';
import { DATEFORMAT } from '@/constants';
import moment from 'moment';
import AddOrEditInfo from './components/AddOrEditInfo';
// import AddOrEditBaseInfo from './components/AddOrEditBaseInfo';
import AddOrEditJob from './components/AddOrEditJob';
import AddOrEditCompany from './components/AddOrEditCompany';
import AddOrEditPartner from './components/AddOrEditPartner';
import AddOrEditChange from './components/AddOrEditChange';
import AddOrEditCourt from './components/AddOrEditCourt';
import AddOrEditCredit from './components/AddOrEditCredit';
import AddOrEditPerson from './components/AddOrEditPerson';
import { StateType } from './model';
import { 
  fetchInfoById,
  fetchCompanyByCustomerId,
  // fetchBaseInfoByCustomerId,
  fetchJobInfoByCustomerId,
  fetchPartnerByCompanyId,
  fetchChangeByCompanyId,
  fetchCourtByCompanyId,
} from './components/server';
import AddOrEditProductExpandField from './components/AddOrEditProductExpandField';

interface AddOrEditCustomerCenterProps {
  location: {
    query: {
      customerId: string;
      workNo: string;
    }
  }
  // customerId?: StateType['customerId'];
  // @ts-ignore
  dispatch: Dispatch<any>;
}

const AddOrEditCustomerCenter: React.FC<AddOrEditCustomerCenterProps> = (props) => {
  const { location: {query}, dispatch } = props;
  const [baseForm, setBaseForm] = useState({});
  // const [baseInfoForm, setBaseInfoForm] = useState({});
  const [jobInfo, setJobInfo] = useState({});
  const [companyInfo, setCompanyInfo] = useState({})
  const [partnerInfo, setPartnerInfo] = useState<{[key: string]: any}>({});
  const [changeInfo, setChangeInfo] = useState<{[key: string]: any}>({});
  const [courtInfo, setCourtInfo] = useState<{[key: string]: any}>({});

  useEffect(() => {
    // 根据 customerId 获取客户信息
    if (query.customerId) {
      const $id = query.customerId;
      // 保存当前用户的 customerId
      dispatch({
        type: 'customerCenter/addCustomerId',
        payload: {
          customerId: $id
        }
      })
      fetchInfoById({
        customerId: $id
      }).then(res => {
        const {data} = res;
        setBaseForm(data);
      })
      
      // 获取基本信息
      // fetchBaseInfoByCustomerId({
      //   customerId:  $id
      // }).then(res => {
      //   const {data = {}} = res;
      //   if (data.list && data.list[0]) {
      //     const bInfo = data.list[0];
      //     bInfo.expectGetMoneyTime = moment(bInfo.expectGetMoneyTime, DATEFORMAT);
      //     setBaseInfoForm(bInfo);
      //   }
      // });
      // 获取产品信息

      // 获取职业信息
      fetchJobInfoByCustomerId({
        customerId:  $id
      }).then(res => {
        const {data} = res;
        if (data) {
          data.registerTime = moment(data.registerTime, DATEFORMAT);
        }
        setJobInfo(data || {});
      });
      // 获取企业信息
      fetchCompanyByCustomerId({
        customerId:  $id
      }).then(res => {
        // 获取第一个
        const {data: {list = []}} = res;
        if (list[0]) {
          const comp = list[0];
          comp.registerTime = moment(comp.registerTime, DATEFORMAT);
          setCompanyInfo(comp);
          const {companyId} = comp;
          dispatch({
            type: 'customerCenter/addCompanyId',
            payload: {
              companyId
            }
          });

          // 获取股东信息
          fetchPartnerByCompanyId({
            companyId
          }).then(pRes => {
            const {data = {}} = pRes;
            setPartnerInfo({
              partner: data.list
            });
          });
          // 获取变更信息
          fetchChangeByCompanyId({
            companyId
          }).then(pRes => {
            const {data = {}} = pRes;
            setChangeInfo({
              change: data.list.map((d: { [key: string]: any }) => Object.assign({}, d, {'changeTime': moment(d.changeTime, DATEFORMAT)}))
            });
          });
          // 获取法院判决
          fetchCourtByCompanyId({
            companyId
          }).then(pRes => {
            const {data = {}} = pRes;
            setCourtInfo({
              court: data.list.map((d: { [key: string]: any }) => Object.assign({}, d, {'judgeTime': moment(d.judgeTime, DATEFORMAT)}))
            });
          });
        }
      })
    }
  }, []);

  return (
    <PageHeaderWrapper>
      <AddOrEditInfo formInfo={baseForm}/>
      {/* <AddOrEditBaseInfo baseInfoForm={baseInfoForm}/> */}
      {/* 添加产品信息 */}
      <AddOrEditProductExpandField customerId={query.customerId} workNo={query.workNo}/>
      <AddOrEditJob jobInfo={jobInfo}/>
      <AddOrEditCompany companyInfo={companyInfo}/>
      <AddOrEditPartner partnerInfo={partnerInfo}/>
      <AddOrEditChange changeInfo={changeInfo}/>
      <AddOrEditCourt courtInfo={courtInfo}/>
      <AddOrEditCredit />
      <AddOrEditPerson />
    </PageHeaderWrapper> 
  );
}

// export default AddOrEditCustomerCenter;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId
  })
)(
  AddOrEditCustomerCenter
);

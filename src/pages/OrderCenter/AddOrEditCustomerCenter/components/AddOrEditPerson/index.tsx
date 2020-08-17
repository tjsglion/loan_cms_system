/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable prefer-object-spread */
import React, { useState, useEffect } from 'react';
import { Collapse } from 'antd';
import { connect } from 'umi';
import { DATEFORMAT } from '@/constants';
import moment from 'moment';
import { StateType } from '../../model';
import OwnHouseInfo from './OwnHouseInfo';
import LoanHouseInfo from './LoanHouseInfo';
import InsuranceInfo from './InsuranceInfo';
import OwnCarInfo from './OwnCarInfo';
import AccumulationFundInfo from './AccumulationFundInfo';
import LoanCarInfo from './LoanCarInfo';
import SocialSecurityInfo from './SocialSecurityInfo';
import PunchCardInfo from './PunchCardInfo';
import CreditCardInfo from './CreditCardInfo';
import { 
  fetchOwnHouseByCustomerId,
  fetchLoanHouseByCustomerId,
  fetchInsuranceByCustomerId,
  fetchOwnCarByCustomerId,
  fetchLoanCarByCustomerId,
  fetchCreditCardByCustomerId,
  fetchPunchCardByCustomerId,
  fetchAccFundByCustomerId,
  fetchSocialSecurityByCustomerId
} from '../server';


interface AddOrEditPersonProps {
  customerId?: StateType['customerId'];
  // companyId?: StateType['companyId']
}

const { Panel } = Collapse;

const AddOrEditPerson: React.FC<AddOrEditPersonProps> = (props) => {

  const {customerId} = props;
  // 设置是否可见标志
  const [ownHouseDisable, setOwnHouseDisable] = useState(false);
  const [loanHouseDisable, setLoanHouseDisable] = useState(false);
  const [insuranceDisable, setInsuranceDisable] = useState(false);
  const [ownCarDisable, setOwnCarDisable] = useState(false);
  const [loanCarDisable, setLoanCarDisable] = useState(false);
  const [accumuDisable, setAccumuDisable] = useState(false);
  const [socialDisable, setSocialDisable] = useState(false);
  const [punchDisable, setPunchDisable] = useState(false);
  const [creditDisable, setCreditDisable] = useState(false);
  // 设置表单值
  const [accumulationFundInfo, setAccumulationFundInfo] = useState<{[key: string]: any}>({});
  const [creditCardInfo, setCreditCardInfo] = useState<{[key: string]: any}>({});
  const [insuranceInfo, setInsuranceInfo] = useState<{[key: string]: any}>({});
  const [loanCarInfo, setLoanCarInfo] = useState<{[key: string]: any}>({});
  const [loanHouseInfo, setLoanHouseInfo] = useState<{[key: string]: any}>({});
  const [ownCarInfo, setOwnCarInfo] = useState<{[key: string]: any}>({});
  const [ownHouseInfo, setOwnHouseInfo] = useState<{[key: string]: any}>({});
  const [punchCardInfo, setPunchCardInfo] = useState<{[key: string]: any}>({});
  const [socialSecurityInfo, setSocialSecurityInfo] = useState<{[key: string]: any}>({});
  // 设置类型
  const [punchType, setPunchType] = useState('add');
  const [socialType, setSocialType] = useState('add');
  const [accumuType, setAccumuType] = useState('add');

  const editMaps = {
    'ownHouseKey': () => setOwnHouseDisable(false),
    'loanHouseKey': () => setLoanHouseDisable(false),
    'insuranceKey': () => setInsuranceDisable(false),
    'ownCarKey': () => setOwnCarDisable(false),
    'loanCarKey': () => setLoanCarDisable(false),
    'accumuKey': () => setAccumuDisable(false),
    'socialKey': () => setSocialDisable(false),
    'punchKey': () => setPunchDisable(false),
    'creditKey': () => setCreditDisable(false)
  }
  useEffect(() => {
    // @ts-ignore
    const handleResp = (res, setWrap, type: string) => {
      if (res.status === 0) {
        const {data = { }} = res;
        if (type === 'ownHouse') {
          const {list} = data;
          const $res = list.map((l: {[key: string]: any}) => Object.assign({...l}, {address: l.address.split(',')}));
          setWrap({[type]: $res});
        } else if (type === 'ownCar') {
          const {list} = data;
          const $res = list.map((l: {[key: string]: any}) => Object.assign({...l}, {registerTime: moment(l.registerTime, DATEFORMAT)}));
          setWrap({[type]: $res});
        } else if (type === 'punch') {
          data.punchTime = moment(data.punchTime, DATEFORMAT);
          setWrap(data);
        } else if (type === 'accumu' || type === 'social') {
          setWrap(data);
        } else {
          const {list} = data;
          setWrap({[type]: list});
        }
      }
    }
    if (customerId) {
      // 获取全款房
      fetchOwnHouseByCustomerId({customerId}).then(
        res => handleResp(res, setOwnHouseInfo, 'ownHouse')
      )
      // 获取按揭房
      fetchLoanHouseByCustomerId({customerId}).then(
        res => handleResp(res, setLoanHouseInfo, 'loanHouse')
      )
      // 获取保单
      fetchInsuranceByCustomerId({customerId}).then(
        res => handleResp(res, setInsuranceInfo, 'insurance')
      );
      // 获取全款车
      fetchOwnCarByCustomerId({customerId}).then(
        res => handleResp(res, setOwnCarInfo, 'ownCar')
      );
      // 获取按揭车
      fetchLoanCarByCustomerId({customerId}).then(
        res => handleResp(res, setLoanCarInfo, 'loanCar')
      );
      // 获取公积金
      fetchAccFundByCustomerId({customerId}).then(
        res => handleResp(res, setAccumulationFundInfo, 'accumu')
      );
      // 获取社保
      fetchSocialSecurityByCustomerId({customerId}).then(
        res => handleResp(res, setSocialSecurityInfo, 'social')
      );
      // 获取打卡信息
      fetchPunchCardByCustomerId({customerId}).then(
        res => handleResp(res, setPunchCardInfo, 'punch')
      );
      // 获取信用卡
      fetchCreditCardByCustomerId({customerId}).then(
        res => handleResp(res, setCreditCardInfo, 'credit')
      );
    }
  }, [customerId]);

  // 银行贷款
  const handleEdit = (e: React.MouseEvent<HTMLElement, MouseEvent>, type: string) => {
    e.stopPropagation();
    e.preventDefault();
    editMaps[type] && editMaps[type]();
    if (type === 'punchKey') {
      setPunchType('edit');
    }
    if (type === 'accumuKey') {
      setAccumuType('edit');
    }
    if (type === 'socialKey') {
      setSocialType('edit');
    }
  }
  return (
    <Collapse
      defaultActiveKey={1}
    >
      <Panel 
        header="个人信息" 
        key="1"
      >
        
        <Collapse>
          <Panel 
            header='全款房'
            key="1"
            extra={customerId && ownHouseDisable ? <a onClick={(e) => handleEdit(e, 'ownHouseKey')}>编辑</a> : ''}
          >   
            <OwnHouseInfo
              ownHouseInfo={ownHouseInfo}
              isDisabled={ownHouseDisable}
              setDisabled={
                (flag: boolean) => setOwnHouseDisable(flag)
              }
            />
          </Panel>
          <Panel 
            header="按揭房"
            key="2"
            extra={customerId && loanHouseDisable ? <a onClick={(e) => handleEdit(e, 'loanHouseKey')}>编辑</a> : ''}
          >
            <LoanHouseInfo
              loanHouseInfo={loanHouseInfo}
              isDisabled={loanHouseDisable}
              setDisabled={
                (flag: boolean) => setLoanHouseDisable(flag)
              }
            />
          </Panel>
          <Panel 
            header="保单"
            key="3"
            extra={customerId && insuranceDisable ? <a onClick={(e) => handleEdit(e, 'insuranceKey')}>编辑</a> : ''}
          >
            <InsuranceInfo
              insuranceInfo={insuranceInfo}
              isDisabled={insuranceDisable} 
              setDisabled={
                (flag: boolean) => {
                  setInsuranceDisable(flag)
                }
              }
            />
          </Panel>
          <Panel 
            header="全款车"
            key="4"
            extra={customerId && ownCarDisable ? <a onClick={(e) => handleEdit(e, 'ownCarKey')}>编辑</a> : ''}
          >
            <OwnCarInfo
              ownCarInfo={ownCarInfo}
              isDisabled={ownCarDisable} 
              setDisabled={
                (flag: boolean) => setOwnCarDisable(flag)
              }
            />
          </Panel>
          <Panel 
            header="按揭车"
            key="5"
            extra={customerId && loanCarDisable ? <a onClick={(e) => handleEdit(e, 'loanCarKey')}>编辑</a> : ''}
          >
            <LoanCarInfo 
              loanCarInfo={loanCarInfo}
              isDisabled={loanCarDisable}
              setDisabled={
                (flag: boolean) => setLoanCarDisable(flag)
              }
            />
          </Panel>
          <Panel 
            header="公积金"
            key="6"
            extra={customerId && accumuDisable ? <a onClick={(e) => handleEdit(e, 'accumuKey')}>编辑</a> : ''}
          >
            <AccumulationFundInfo
              accumuInfo={accumulationFundInfo}
              isDisabled={accumuDisable}
              type={accumuType}
              setDisabled={
                (flag: boolean) => setAccumuDisable(flag)
              }
              onSetType={
                (type: string) => setAccumuType(type)
              }
            />
          </Panel>
          <Panel 
            header="社保"
            key="7"
            extra={customerId && socialDisable ? <a onClick={(e) => handleEdit(e, 'socialKey')}>编辑</a> : ''}
          >
            <SocialSecurityInfo 
              socialInfo={socialSecurityInfo}
              isDisabled={socialDisable}
              type={socialType}
              setDisabled={
                (flag: boolean) => setSocialDisable(flag)
              }
              onSetType={
                (type: string) => setSocialType(type)
              }
            />
          </Panel>
          <Panel 
            header="打卡"
            key="8"
            extra={customerId && punchDisable ? <a onClick={(e) => handleEdit(e, 'punchKey')}>编辑</a> : ''}
          >
            <PunchCardInfo 
              punchInfo={punchCardInfo}
              isDisabled={punchDisable}
              type={punchType}
              setDisabled={
                (flag: boolean) => setPunchDisable(flag)
              }
              onSetType={
                (type: string) => setPunchType(type)
              }
            />
          </Panel>
          <Panel 
            header="信用卡"
            key="9"
            extra={customerId && creditDisable ? <a onClick={(e) => handleEdit(e, 'creditKey')}>编辑</a> : ''}
          >
            <CreditCardInfo 
              creditCardInfo={creditCardInfo}
              isDisabled={creditDisable}
              setDisabled={
                (flag: boolean) => setCreditDisable(flag)
              }
            />
          </Panel>
        </Collapse>
      </Panel>
      
    </Collapse>
  )
}

// export default AddOrEditPerson;
export default connect(
  ({
    customerCenter
  }: {
    customerCenter: StateType
  }) => ({
    customerId: customerCenter.customerId,
    companyId: customerCenter.companyId
  })
)(
  AddOrEditPerson
);
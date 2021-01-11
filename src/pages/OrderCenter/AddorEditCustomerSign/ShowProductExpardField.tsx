import { Card, Col, Descriptions, Modal, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { CompanyChangeLogFields, CompanyDisputeInfoFields, CompanyShareholderFields, CustomerAccumulationFundFields, CustomerBaseFields, CustomerCompanyInfoFields, CustomerCreditCardFields, CustomerCreditCardSummaryFields, CustomerCreditLoanDetailsFields, CustomerCreditLoanInfoFields, CustomerInsuranceFields, CustomerJobInfoFields, CustomerLoanCarInfoFields, CustomerLoanHouseInfoFields, CustomerOwnCarInfoFields, CustomerOwnHouseInfoFields, CustomerPicInfoFields, CustomerPunchCardInfoFields, CustomerSocialSecurityFields } from '@/constants/product';
import { COLSPAN, HightEducation, HousePosition, HouseType, InsuranceType, JobName, LENDER, Locations, MarriageInfo, PartnerPos, PayType, Repayment, YESORNO, YESORNO2 } from '@/constants';
import moment from 'moment';
import { queryCompanyBuCustomerId, queryProductExpandInfoByProductIdAndCustomerId } from './server';
import { fetchChangeByCompanyId, fetchCompanyByCustomerId, fetchCourtByCompanyId, fetchPartnerByCompanyId } from '../AddOrEditCustomerCenter/components/server';
import styles from './index.less';

interface ShowProductExpandFieldIProps {
  productId: string;
  customerId: string;
  // companyId: string;
}

const ShowProductExpandField: React.FC<ShowProductExpandFieldIProps> = (props) => {

  const {productId, customerId} = props;
  const [companies, setCompanies] = useState<Array<{[key: string]: any}>>([]);
  const [companyId, setCompanyId] = useState<string>('-1');
  const [CustomerBase, setCustomerBase] = useState<{[key: string]: any}>({});
  const [CustomerAccumulationFund, setCustomerAccumulationFund] = useState<{[key: string]: any}>({});
  const [CustomerCreditCard, setCustomerCreditCard] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerCreditCardSummary, setCustomerCreditCardSummary] = useState<{[key: string]: any}>({});
  const [CustomerCreditLoanDetails, setCustomerCreditLoanDetails] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerCreditLoanInfo, setCustomerCreditLoanInfo] = useState<{[key: string]: any}>({});
  const [CustomerInsurance, setCustomerInsurance] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerJobInfo, setCustomerJobInfo] = useState<{[key: string]: any}>({});
  const [CustomerLoanCarInfo, setCustomerLoanCarInfo] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerLoanHouseInfo, setCustomerLoanHouseInfo] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerOwnCarInfo, setCustomerOwnCarInfo] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerOwnHouseInfo, setCustomerOwnHouseInfo] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerPicInfo, setCustomerPicInfo] = useState<Array<{[key: string]: any}>>([]);
  const [CustomerPunchCardInfo, setCustomerPunchCardInfo] = useState<{[key: string]: any}>({});
  const [CustomerSocialSecurity, setCustomerSocialSecurity] = useState<{[key: string]: any}>({});
  const [CustomerCompanyInfo, setCustomerCompanyInfo] = useState<Array<{[key: string]: any}>>([]);
  const [CompanyShareholder, setCompanyShareholder] = useState<Array<{[key: string]: any}>>([]);
  const [CompanyDisputeInfo, setCompanyDisputeInfo] = useState<Array<{[key: string]: any}>>([]);
  const [CompanyChangeLog, setCompanyChangeLog] = useState<Array<{[key: string]: any}>>([]);
  const [visible, setVisible] = useState(false);
  const [imgUrl, setImgUrl] = useState('');

  // 根据产品、客户id获取信息
  const findKey = (arrs: Array<{[key: string]: any}>, value: any) => {
    return (arrs.find(item => item.value === value) || {}).key;
  } 
  useEffect(() => {

    if (productId && customerId) {
      queryProductExpandInfoByProductIdAndCustomerId({
        productId, 
        customerId
      }).then(res => {
        if (res.status === 0) {
          // setResult(res.data);
          if (res.data) {
            const {data} = res;
            const base = data.CustomerBase;
            if (base) {
              const sex = base.sex === 1 ? '男' : '女';
              const marriageInfo = findKey(MarriageInfo, base.marriageInfo);
              const highestEducation = findKey(HightEducation, base.highestEducation);
              setCustomerBase(Object.assign(base, {sex, marriageInfo, highestEducation}));
            }
            if (data.CustomerAccumulationFund) {
              const haveBreakRecord = findKey(YESORNO, data.CustomerAccumulationFund.haveBreakRecord)
              setCustomerAccumulationFund(Object.assign(data.CustomerAccumulationFund, {haveBreakRecord}));
            }
            if (data.CustomerCreditCard) {
              const CreditCards = data.CustomerCreditCard.list;
              const creditCards = CreditCards.map(item => Object.assign(item, {
                haveCashOut: findKey(YESORNO, item.haveCashOut)
              }));
              setCustomerCreditCard(creditCards);
            }
            if (data.CustomerCreditCardSummary) {
              setCustomerCreditCardSummary(data.CustomerCreditCardSummary);
            }
            if (data.CustomerCreditLoanDetails) {
              // 银行贷款信息
              const CreditLoanDetails = data.CustomerCreditLoanDetails.list;
              const creditLoanDetails = CreditLoanDetails.map(item => Object.assign(item, {
                loanTime: moment(item.loanTime).format('YYYY-MM-DD HH:mm:ss'),
                haveLoan: findKey(YESORNO, item.haveLoan),
                loanOrganization: findKey(LENDER, item.loanOrganization),
                repayType: findKey(Repayment, item.repayType)
              }))
              setCustomerCreditLoanDetails(creditLoanDetails);
            }
            if (data.CustomerCreditLoanInfo) {
              const CustomerCreditLoan = data.CustomerCreditLoanInfo;
              const customerCreditLoan = Object.assign(CustomerCreditLoan, {
                postLoanMaterials: findKey(LENDER, CustomerCreditLoan.postLoanMaterials),
                overdueInfo: findKey(LENDER, CustomerCreditLoan.overdueInfo)
              });
              setCustomerCreditLoanInfo(customerCreditLoan);
            }
            if (data.CustomerInsurance) {
              const Insurance = data.CustomerInsurance.list;
              const customerInsurance = Insurance.map(item => Object.assign(item, {
                payType: findKey(PayType, item.payType),
                type: findKey(InsuranceType, item.type)
              }))
              setCustomerInsurance(customerInsurance);
            }
            if (data.CustomerJobInfo) {
              const job = data.CustomerJobInfo;
              setCustomerJobInfo(Object.assign(job, {
                jobName: findKey(JobName, job.jobName),
                hasLicense: findKey(JobName, job.jobName),
                registerTime: moment(job.registerTime).format('YYYY-MM-DD HH:mm:ss'),
                companyResidence: findKey(YESORNO2, job.companyResidence),
                needDependCompany: findKey(YESORNO, job.needDependCompany),
                companyPhone: findKey(YESORNO, job.companyPhone),
                administrationPunish: findKey(YESORNO2, job.companyPhone),
                disputeRecord: findKey(YESORNO2, job.companyPhone),
                hasSideline: findKey(YESORNO2, job.companyPhone),
              }));
            }
            if (data.CustomerLoanCarInfo) {
              setCustomerLoanCarInfo(data.CustomerLoanCarInfo.list);
            }
            if (data.CustomerLoanHouseInfo) {
              const houses = data.CustomerLoanHouseInfo.list.map(item => Object.assign(item, {
                type: findKey(HouseType, item.type),
                position: findKey(HousePosition, item.position),
                location: findKey(Locations, item.location)
              }));
              setCustomerLoanHouseInfo(houses);
            }
            if (data.CustomerOwnCarInfo) {
              const cars = data.CustomerOwnCarInfo.list.map(item => Object.assign(item, {
                registerTime: moment(item.registerTime).format('YYYY-MM-DD HH:mm:ss')
              }));
              setCustomerOwnCarInfo(cars);
            }
            if (data.CustomerOwnHouseInfo) {
              const ownHouse = data.CustomerOwnHouseInfo.list || [];
              const owns = ownHouse.map(item => Object.assign(item, {
                type: findKey(HouseType, item.type),
                position: findKey(HousePosition, item.position),
                haveCert: findKey(YESORNO, item.haveCert),
                location: findKey(Locations, item.location)
              }));
              setCustomerOwnHouseInfo(owns);
            }
            if (data.CustomerPicInfo) {
              setCustomerPicInfo(data.CustomerPicInfo.list);
            }
            if (data.CustomerPunchCardInfo) {
              const punch = data.CustomerPunchCardInfo;
              setCustomerPunchCardInfo(Object.assign(punch, {
                punchTime: moment(punch.punchTime).format('YYYY-MM-DD HH:mm:ss'),
                fixPunch: findKey(YESORNO, punch.fixPunch)
              }));
            }
            if (data.CustomerSocialSecurity) {
              setCustomerSocialSecurity(Object.assign(data.CustomerSocialSecurity, {
                haveBreakRecord: data.CustomerSocialSecurity.haveBreakRecord
              }));
            }
          }
        }
      })
    }

    if (customerId) {
      // 公司信息
      queryCompanyBuCustomerId({customerId}).then(res => {
        if (res.status === 0) {
          setCompanies(res.data.list);
        }
      });
    }
  }, [productId, customerId]);

  useEffect(() => {
    if (!companyId || companyId === '-1') {
      setCustomerCompanyInfo({});
      setCompanyShareholder([]);
      setCompanyDisputeInfo([]);
      setCompanyChangeLog([]);
    } else {
      fetchCompanyByCustomerId({companyId}).then(res => {
        if (res.status === 0) {
          const coms = res.data.list || [];
          const cs = coms.map(item => Object.assign(item, {
            registerTime: moment(cs.registerTime).format('YYYY-MM-DD HH:mm:ss')
          }))
          setCustomerCompanyInfo(cs);
        }
      });
      // 股东信息
      fetchPartnerByCompanyId({companyId}).then(res => {
        if (res.status === 0) {
          const partners = res.data.list || [];
          const p = partners.map(item => Object.assign(item, {
            position: findKey(PartnerPos, item.position)
          }));
          setCompanyShareholder(p || []);
        }
      });
      // 公司变更信息
      fetchChangeByCompanyId({companyId}).then(res => {
        if (res.status === 0) {
          const chs = res.data.list || [];
          const c = chs.map(item => Object.assign(item, {
            changeTime: moment(item.changeTime).format('YYYY-MM-DD HH:mm:ss'),
          }))
          setCompanyChangeLog(c);
        }
      });
      // 法院判决
      fetchCourtByCompanyId({companyId}).then(res => {
        if (res.status === 0) {
          const disps = res.data.list || [];
          const d = disps.map(item => Object.assign(item, {
            judgeTime: moment(item.judgeTime).format('YYYY-MM-DD HH:mm:ss'),
          }))
          setCompanyDisputeInfo(d);
        }
      });
    };
  }, [companyId]);

  const handleChange = (value: string) => {
    setCompanyId(value);
  }
  const showImage = (url: string) => {
    setVisible(true);
    setImgUrl(url);
  }
  return (
    <> 
      {/* 公司列表 */}
      <Card>
        <Row gutter={24}>
          <Col {...COLSPAN} className={styles.d_f}>
            <span className={styles.d_f_1}>公司列表</span>
            <Select 
                className={styles.d_f_2} 
                value={companyId}
                showSearch
                optionFilterProp="children"
                onChange={handleChange}
                style={{ width: '200px'}}
              >
                <Select.Option key="-1" value="-1">全部</Select.Option>
                {companies.map(d => (
                  <Select.Option key={d.companyId} value={d.companyId}>{d.name}</Select.Option>
                ))}
              </Select> 
          </Col>
        </Row> 
      </Card>
      
    {/* 基本信息 */}
      {
        Object.keys(CustomerBase).length > 0 ?
          <Card>
            <Descriptions title="客户基础信息" bordered>
              {
                Object.keys(CustomerBase).map(key => {
                  if (CustomerBaseFields[key]) {
                    return <Descriptions.Item label={CustomerBaseFields[key]}>
                      {key === 'idCardUrl' ? (
                        <span className={styles.d_f_2}><img alt="" onClick={() => showImage(CustomerBase[key])} style={{ width: '100px', height: '80px'}} src={CustomerBase[key]} /> </span>
                      ) : CustomerBase[key]}
                    </Descriptions.Item>
                  }
                  return ''
                })
              }
            </Descriptions> 
          </Card>
          : ''
      }
      {/* 客户公积金信息 */}
      {
        Object.keys(CustomerAccumulationFund).length > 0 ?
          <Card>
            <Descriptions title="客户公积金信息" bordered>
              {
                Object.keys(CustomerAccumulationFund).map(key => {
                  if (CustomerAccumulationFundFields[key]) {
                    return <Descriptions.Item label={CustomerAccumulationFundFields[key]}>
                      {CustomerAccumulationFund[key]}
                    </Descriptions.Item>
                  }
                  return ''
                })
              }
            </Descriptions> 
          </Card> : ''
      }

      {/* 客户信用卡信息 */}
      {
        CustomerCreditCard.length > 0 ? 
          <Card>
            <Descriptions title="客户信用卡信息" bordered>
              {
                CustomerCreditCard.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerCreditCardFields[key]) {
                      return <Descriptions.Item label={CustomerCreditCardFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
            </Descriptions>
          </Card> : ''
      }
        
      {/* 客户信用卡汇总 */}
      {
        Object.keys(CustomerCreditCardSummary).length > 0 ?
          <Card>
            <Descriptions title="客户信用卡汇总" bordered>
              {
                Object.keys(CustomerCreditCardSummary).map(key => {
                  if (CustomerCreditCardSummaryFields[key]) {
                    return <Descriptions.Item label={CustomerCreditCardSummaryFields[key]}>
                      {CustomerCreditCardSummary[key]}
                    </Descriptions.Item>
                  }
                  return ''
                })
              }
            </Descriptions>
          </Card> : ''
      }

      {/* 客户信用贷款详情 */}
      {
        CustomerCreditLoanDetails.length > 0 ? 
          <Card>
            <Descriptions title="客户信用贷款详情" bordered>
              {
                CustomerCreditLoanDetails.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerCreditLoanDetailsFields[key]) {
                      return <Descriptions.Item label={CustomerCreditLoanDetailsFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }

      {/* 客户信用贷款信息 */}
      {
        Object.keys(CustomerCreditLoanInfo).length > 0 ?
          <Card>
            <Descriptions title="客户信用贷款信息" bordered>
              {
                Object.keys(CustomerCreditLoanInfo).map(key => {
                  if (CustomerCreditLoanInfoFields[key]) {
                    return <Descriptions.Item label={CustomerCreditLoanInfoFields[key]}>
                      {CustomerCreditLoanInfo[key]}
                    </Descriptions.Item>
                  }
                  return ''
                })
              }
            </Descriptions>
          </Card> : ''
      }

      {/* 客户保险信息 */}
      {
        CustomerInsurance.length > 0 ? 
          <Card>
            <Descriptions title="客户保险信息" bordered>
              {
                CustomerInsurance.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerInsuranceFields[key]) {
                      return <Descriptions.Item label={CustomerInsuranceFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }

      {/* 客户工作信息 */}
      {
        Object.keys(CustomerJobInfo).length > 0 ?
          <Card>
            <Descriptions title="客户工作信息" bordered>
              {
                Object.keys(CustomerJobInfo).map(key => {
                  if (CustomerJobInfoFields[key]) {
                    return <Descriptions.Item label={CustomerJobInfoFields[key]}>
                      {CustomerJobInfo[key]}
                    </Descriptions.Item>
                  }
                  return ''
                })
              }
            </Descriptions>
          </Card> : ''
      }

      {/* 客户贷款车信息 */}
      {
        CustomerLoanCarInfo.length > 0 ? 
          <Card>
            <Descriptions title="客户贷款车信息" bordered>
              {
                CustomerLoanCarInfo.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerLoanCarInfoFields[key]) {
                      return <Descriptions.Item label={CustomerLoanCarInfoFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }
      

      {/* 客户贷款房信息 */}
      {
        CustomerLoanHouseInfo.length > 0 ? 
          <Card>
            <Descriptions title="客户贷款房信息" bordered>
              {
                CustomerLoanHouseInfo.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerLoanHouseInfoFields[key]) {
                      return <Descriptions.Item label={CustomerLoanHouseInfoFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }

      {/* 客户全款车信息 */}
      {
        CustomerOwnCarInfo.length > 0 ? 
          <Card>
            <Descriptions title="客户全款车信息" bordered>
              {
                CustomerOwnCarInfo.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerOwnCarInfoFields[key]) {
                      return <Descriptions.Item label={CustomerOwnCarInfoFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }

      {/* 客户全款房信息 */}
      {
        CustomerOwnHouseInfo.length > 0 ? 
          <Card>
            <Descriptions title="客户全款房信息" bordered>
              {
                CustomerOwnHouseInfo.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerOwnHouseInfoFields[key]) {
                      return <Descriptions.Item label={CustomerOwnHouseInfoFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }

      {/* 客户影像资料 */}
      {
        CustomerPicInfo.length > 0 ? 
          <Card>
            <Descriptions title="客户影像资料" bordered>
              {
                CustomerPicInfo.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerPicInfoFields[key]) {
                      return <Descriptions.Item label={CustomerPicInfoFields[key]}>
                        {/* {item[key]} */}
                        <img alt="" onClick={() => showImage(item[key])} style={{ width: '100px', height: '80px'}} src={item[key]} />
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }
      
      {/* 客户打卡信息 */}
      {
        CustomerPunchCardInfo.length > 0 ? 
          <Card>
            <Descriptions title="客户打卡信息" bordered>
              {
                CustomerPunchCardInfo.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerPunchCardInfoFields[key]) {
                      return <Descriptions.Item label={CustomerPunchCardInfoFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }
      

      {/* 客户社保信息 */}
      {
        CustomerSocialSecurity.length > 0 ? 
          <Card>
            <Descriptions title="客户社保信息" bordered>
              {
                CustomerSocialSecurity.map(item => {
                  return Object.keys(item).map(key => {
                    if (CustomerSocialSecurityFields[key]) {
                      return <Descriptions.Item label={CustomerSocialSecurityFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }


      {/* 公司信息 */}
      {
        CustomerCompanyInfo.length > 0 ? 
          <Card>
            <Descriptions title="公司信息" bordered>
              {
                CustomerCompanyInfo.map(item => {
                  debugger;
                  return Object.keys(item).map(key => {
                    if (CustomerCompanyInfoFields[key]) {
                      return <Descriptions.Item label={CustomerCompanyInfoFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
            </Descriptions>
          </Card> : ''
      }

      {/* 公司股权信息 */}
      {
        CompanyShareholder.length > 0 ? 
          <Card>
            <Descriptions title="公司股权信息" bordered>
              {
                CompanyShareholder.map(item => {
                  return Object.keys(item).map(key => {
                    if (CompanyShareholderFields[key]) {
                      return <Descriptions.Item label={CompanyShareholderFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }

      {/* 公司纠纷信息 */}
      {
        CompanyDisputeInfo.length > 0 ? 
          <Card>
            <Descriptions title="公司纠纷信息" bordered>
              {
                CompanyDisputeInfo.map(item => {
                  return Object.keys(item).map(key => {
                    if (CompanyDisputeInfoFields[key]) {
                      return <Descriptions.Item label={CompanyDisputeInfoFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }

      {/* 公司变更信息 */}
      {
        CompanyChangeLog.length > 0 ? 
          <Card>
            <Descriptions title="公司变更信息" bordered>
              {
                CompanyChangeLog.map(item => {
                  return Object.keys(item).map(key => {
                    if (CompanyChangeLogFields[key]) {
                      return <Descriptions.Item label={CompanyChangeLogFields[key]}>
                        {item[key]}
                      </Descriptions.Item>
                    }
                    return ''
                  })
                })
              }
              
            </Descriptions>
          </Card> : ''
      }



      <Modal
        width='70%'
        title="图片预览"
        visible={visible}
        closable
        onCancel={() => setVisible(false)}
        onOk={() => setVisible(false)}
        style={{ height: '80%', overflow: 'auto' }}
        okText="确定"
        cancelText="取消"
      >
        {
          imgUrl ? 
              <div style={{ maxHeight: '500px', overflow: 'auto' }}>
                <img src={imgUrl} alt=""/> 
              </div>
            : ''
        }
      </Modal>
    </>
  );
};

export default ShowProductExpandField;
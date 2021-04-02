export const routes = [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/',
            redirect: '/dashboardanalysis',
          },
          {
            name: 'dashboard.analysis',
            icon: 'smile',
            path: '/dashboardanalysis',
            component: './DashboardAnalysis',
          },
          // {
          //   name: 'list',
          //   icon: 'reconciliation',
          //   path: '/list',
          //   authority: ['admin'],
          //   component: './ListTableList',
          // },
          // 客户中心
          {
            name: 'customer',
            icon: 'user',
            path: 'customer',
            routes: [
              {
                path: '/customer',
                redirect: '/customer/manager',
              },
              // 客户管理
              {
                path: '/customer/manager',
                name: 'manager',
                authority: ['admin', '1', '2', '4', '5', '6', '7', '9', '11'],
                component: './OrderCenter'
              },
              // 客户修改
              {
                path: '/customer/manager/profile',
                name: 'manager.profile',
                component: './OrderCenter/AddOrEditCustomerCenter',
                hideInMenu: true
              },
              // 客户跟进
              {
                path: '/customer/manager/add',
                name: 'followup',
                component: './OrderCenter/AddOrEditCustomerFollowUp',
                hideInMenu: true
              },
              {
                path: '/customer/followup',
                name: 'followup',
                authority: ['admin', '6', '7', '10', '8', '9'],
                component: './OrderCenter/CustomerFollowUp'
                // component: './OrderCenter/AddOrEditCustomerFollowUp'
              },
              {
                path: '/customer/followup/profile',
                name: 'followup.profile',
                component: './OrderCenter/CustomerFollowUp/Profile',
                hideInMenu: true
              },
              // {
              //   path: '/order/follup/add',
              //   name: 'customerFollowUp.add',
              //   component: './OrderCenter/AddCustomerFollowUp'
              // },
              // 签单
              {
                path: '/customer/manager/sign',
                name: 'manager.sign',
                component: './OrderCenter/AddorEditCustomerSign',
                hideInMenu: true,
              },
              // 客户分配
              {
                path: '/customer/allot',
                name: 'allot',
                authority: ['admin', '15', '16', '17', '18'],
                component: './OrderCenter/CustomerAllot'
              },
              {
                path: '/customer/allot/profile',
                name: 'allot.profile',
                component: './OrderCenter/CustomerAllot/Profile',
                hideInMenu: true
              }
              // 申请做单
              // {
              //   path: '/customer/applyOrder',
              //   name: 'applyOrder',
              //   authority: ['admin', '11', '12', '13', '14'],
              //   component: './OrderCenter/MakeFollowUp'
              // },
            ]
          },
          // 做单中心
          {
            name: 'order',
            icon: 'reconciliation',
            path: '/order',
            // component: './OrderCenter'
            routes: [
              {
                path: '/order',
                redirect: '/order/waiting'
              },
              {
                path: '/order/waiting',
                name: 'waiting',
                authority: ['admin', '11', '12', '13', '14'],
                component: './OrderCenter/MakeFollowUp/WaitingOrder'
              },
              {
                path: '/order/processing',
                name: 'processing',
                authority: ['admin', '11', '12', '13', '14'],
                component: './OrderCenter/MakeFollowUp/ProcessingOrder'
              },
              {
                path: '/order/pause',
                name: 'pause',
                authority: ['admin', '11', '12', '13', '14'],
                component: './OrderCenter/MakeFollowUp/PauseOrder'
              },
              {
                path: '/order/completed',
                name: 'completed',
                authority: ['admin', '11', '12', '13', '14'],
                component: './OrderCenter/MakeFollowUp/CompletedOrder'
              },
              {
                path: '/order/unfinished',
                name: 'unfinished',
                authority: ['admin', '11', '12', '13', '14'],
                component: './OrderCenter/MakeFollowUp/UnfinishedOrder'
              },
              {
                path: '/order/expired',
                name: 'expired',
                authority: ['admin', '11', '12', '13', '14'],
                component: './OrderCenter/MakeFollowUp/ExpiredOrder'
              },
              // 客户中心
              // {
              //   path: '/order/customer',
              //   icon: 'user',
              //   name: 'customerCenter',
              //   authority: ['admin', '1', '2', '4', '5', '6', '7', '9', '11'],
              //   component: './OrderCenter'
              // },
              // {
              //   path: '/order/customer/profile',
              //   icon: 'user',
              //   name: 'customerCenter.profile',
              //   component: './OrderCenter/AddOrEditCustomerCenter',
              //   hideInMenu: true
              // },
              // {
              //   path: '/order/customer/followUp',
              //   icon: 'user',
              //   name: 'customerCenter.followup',
              //   component: './OrderCenter/AddOrEditCustomerFollowUp',
              //   hideInMenu: true
              // },
              // {
              //   path: '/order/customer/sign',
              //   icon: 'user',
              //   name: 'customerCenter.sign',
              //   component: './OrderCenter/AddorEditCustomerSign',
              //   hideInMenu: true
              // },
              // // 客户跟进
              // {
              //   path: '/order/follup',
              //   name: 'customerFollowUp',
              //   authority: ['admin', '6', '7', '10', '8', '9'],
              //   component: './OrderCenter/CustomerFollowUp'
              // },
              // {
              //   path: '/order/follup/profile',
              //   name: 'customerFollowUp.profile',
              //   component: './OrderCenter/CustomerFollowUp/Profile',
              //   hideInMenu: true
              // },
              // {
              //   path: '/order/follup/add',
              //   name: 'customerFollowUp.add',
              //   component: './OrderCenter/AddCustomerFollowUp'
              // },
              // 做单跟进
              // {
              //   path: '/order/make/follup',
              //   name: 'makeFollowUp',
              //   authority: ['admin', '11', '12', '13', '14'],
              //   component: './OrderCenter/MakeFollowUp'
              // },
              // {
              //   path: '/order/make/follup/profile',
              //   name: 'makeFollowUp.profile',
              //   component: './OrderCenter/MakeFollowUp/Profile',
              //   hideInMenu: true
              // },
              // 待接订单
              {
                path: '/order/waiting/sign',
                name: 'sign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              {
                path: '/order/waiting/editSign',
                name: 'editSign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              // 进行中的订单
              {
                path: '/order/processing/sign',
                name: 'sign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              {
                path: '/order/processing/editSign',
                name: 'editSign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              // 暂停的订单
              {
                path: '/order/pause/sign',
                name: 'sign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              {
                path: '/order/pause/editSign',
                name: 'editSign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              // 已完成的订单
              {
                path: '/order/completed/sign',
                name: 'sign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              {
                path: '/order/completed/editSign',
                name: 'editSign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              // 未完成的订单
              {
                path: '/order/unfinished/sign',
                name: 'sign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              {
                path: '/order/unfinished/editSign',
                name: 'editSign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              // 过期的订单
              {
                path: '/order/expired/sign',
                name: 'sign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              {
                path: '/order/expired/editSign',
                name: 'editSign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              
              // 客户分配
              // {
              //   path: '/order/allot',
              //   name: 'customerAllot',
              //   authority: ['admin', '15', '16', '17', '18'],
              //   component: './OrderCenter/CustomerAllot'
              // },
              // {
              //   path: '/order/allot/profile',
              //   name: 'customerAllot.profile',
              //   component: './OrderCenter/CustomerAllot/Profile',
              //   hideInMenu: true
              // }
            ]
          },
          // 贷后回访
          {
            name: 'loan',
            icon: 'table',
            path: '/loan',
            authority: ['admin', '19', '20', '21'],
            routes: [
              {
                path: '/loan',
                redirect: '/loan/visit'
              },
              {
                path: '/loan/record',
                name: 'record',
                component: './LoanManager/Record',
                hideInMenu: true
              },
              {
                path: '/loan/visit',
                name: 'visit',
                component: './LoanManager/Visit'
              }
            ]
          },
          // 权限管理
          {
            name: 'account',
            icon: 'UserSwitch',
            path: '/account',
            authority: ['admin', '33', '34', '35', '36', '37', '38', '39', '40', '41' , '42', '43', '44', '45', '46', '47', '48', '49', '50', '51'],
            routes: [
              {
                path: '/account',
                redirect: '/account/user',
              },
              {
                path: '/account/user',
                name: 'user',
                authority: ['admin', '39', '40', '41' , '42', '43', '44', '45', '46'],
                component: './Authorities'
              },
              {
                path: '/account/role',
                name: 'role',
                authority: ['admin', '33', '34', '35', '36', '37', '38'],
                component: './Authorities/Role'
              },
              {
                path: '/account/role/add',
                name: 'role.add',
                component: './Authorities/Role/AddOrEditRole',
                hideInMenu: true
              },
              {
                path: '/account/role/edit',
                name: 'role.add',
                component: './Authorities/Role/AddOrEditRole',
                hideInMenu: true
              },
              {
                path: '/account/role/edit',
                name: 'role.edit',
                component: './Authorities/Role/AddOrEditRole',
                hideInMenu: true
              },
              {
                path: '/account/department',
                name: 'department',
                authority: ['admin', '47', '48', '49', '50', '51'],
                component: './Authorities/Department'
              }
            ]
          },
          // 基础配置
          {
            name: 'config',
            icon: 'setting',
            path: '/config',
            routes: [
              {
                path: '/config',
                redirect: '/config/product'
              },
              {
                path: '/config/product',
                name: 'product',
                authority: ['admin', '52'],
                component: './Config/Product'
              },
              {
                path: '/config/product/profile',
                name: 'product.profile',
                authority: ['admin', '52'],
                component: './Config/Product/AddOrEditProductExpandFields',
                hideInMenu: true
              },
              {
                path: '/config/funders',
                name: 'funders',
                authority: ['admin', '57', '58', '59', '60', '61'],
                component: './Config/Funders'
              },
              {
                path: '/config/logs',
                name: 'logs',
                authority: ['admin', '62', '63'],
                component: './Config/Logs'
              },
              {
                path: '/config/ad',
                name: 'ad',
                component: './Config/Ad'
              },
              {
                path: '/config/seas',
                name: 'seas',
                component: './Config/Seas',
                hideInMenu: true
              }
            ]
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
]

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
          // 做单中心
          {
            name: 'order',
            icon: 'reconciliation',
            path: '/order',
            // component: './OrderCenter'
            routes: [
              {
                path: '/order',
                redirect: '/order/customer'
              },
              // 客户中心
              {
                path: '/order/customer',
                icon: 'user',
                name: 'customerCenter',
                authority: ['admin', '1', '2', '4', '5', '6', '7', '9', '11'],
                component: './OrderCenter'
              },
              {
                path: '/order/customer/profile',
                icon: 'user',
                name: 'customerCenter.profile',
                component: './OrderCenter/AddOrEditCustomerCenter',
                hideInMenu: true
              },
              {
                path: '/order/customer/followUp',
                icon: 'user',
                name: 'customerCenter.followup',
                component: './OrderCenter/AddOrEditCustomerFollowUp',
                hideInMenu: true
              },
              {
                path: '/order/customer/sign',
                icon: 'user',
                name: 'customerCenter.sign',
                component: './OrderCenter/AddorEditCustomerSign',
                hideInMenu: true
              },
              // 客户跟进
              {
                path: '/order/follup',
                name: 'customerFollowUp',
                authority: ['admin', '6', '7', '10', '8', '9'],
                component: './OrderCenter/CustomerFollowUp'
              },
              {
                path: '/order/follup/profile',
                name: 'customerFollowUp.profile',
                component: './OrderCenter/CustomerFollowUp/Profile',
                hideInMenu: true
              },
              // {
              //   path: '/order/follup/add',
              //   name: 'customerFollowUp.add',
              //   component: './OrderCenter/AddCustomerFollowUp'
              // },
              // 做单跟进
              {
                path: '/order/make/follup',
                name: 'makeFollowUp',
                authority: ['admin', '11', '12', '13', '14'],
                component: './OrderCenter/MakeFollowUp'
              },
              {
                path: '/order/make/follup/profile',
                name: 'makeFollowUp.profile',
                component: './OrderCenter/MakeFollowUp/Profile',
                hideInMenu: true
              },
              {
                path: '/order/make/follup/sign',
                name: 'makeFollowUp.sign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              {
                path: '/order/make/follup/editSign',
                name: 'makeFollowUp.editSign',
                component: './OrderCenter/MakeFollowUp/Sign',
                hideInMenu: true
              },
              
              // 客户分配
              {
                path: '/order/allot',
                name: 'customerAllot',
                authority: ['admin', '15', '16', '17', '18'],
                component: './OrderCenter/CustomerAllot'
              },
              {
                path: '/order/allot/profile',
                name: 'customerAllot.profile',
                component: './OrderCenter/CustomerAllot/Profile',
                hideInMenu: true
              }
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
            icon: 'user',
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

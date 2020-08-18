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
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          // {
          //   name: 'list.table-list',
          //   icon: 'table',
          //   path: '/list',
          //   component: './ListTableList',
          // },
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
                component: './OrderCenter/MakeFollowUp'
              },
              {
                path: '/order/make/follup/profile',
                name: 'makeFollowUp.profile',
                component: './OrderCenter/MakeFollowUp/Profile',
                hideInMenu: true
              },
              // 客户分配
              {
                path: '/order/allot',
                name: 'customerAllot',
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
            routes: [
              {
                path: '/account',
                redirect: '/account/user'
              },
              {
                path: '/account/user',
                name: 'user',
                component: './Authorities'
              },
              {
                path: '/account/role',
                name: 'role',
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
                name: 'role.edit',
                component: './Authorities/Role/AddOrEditRole',
                hideInMenu: true
              },
              {
                path: '/account/department',
                name: 'department',
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
                component: './Config/Product'
              },
              {
                path: '/config/funders',
                name: 'funders',
                component: './Config/Funders'
              },
              {
                path: '/config/logs',
                name: 'logs',
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

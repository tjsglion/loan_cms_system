import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { token } from '@/utils/utils';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  // state: SecurityLayoutState = {
  //   isReady: false,
  // };

  // componentDidMount() {
  //   this.setState({
  //     isReady: true,
  //   });
  //   const { dispatch } = this.props;
  //   if (dispatch) {
  //     dispatch({
  //       type: 'user/fetchCurrent',
  //     });
  //   }
  // }

  render() {
    const {children} = this.props;
    const queryString = stringify({
      redirect: window.location.href,
    });
    console.log(queryString);
    // @ts-ignore
    const _ = token();
    // if ((!isLogin && loading) || !isReady) {
    //   return <PageLoading />;
    // }
    // if (!isLogin && window.location.pathname !== '/user/login') {
    //   return <Redirect to={`/user/login?${queryString}`} />;
    // }
    if (!_.token && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);

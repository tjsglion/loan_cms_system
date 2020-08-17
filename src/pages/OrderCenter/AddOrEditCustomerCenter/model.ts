import { Effect, Reducer } from 'umi';

export interface StateType {
  customerId: string;
  companyId: string;
}

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    addCustomerId: Effect;
    addCompanyId: Effect;
  },
  reducers: {
    saveCustomerId: Reducer<StateType>;
    saveCompanyId: Reducer<StateType>;
  }
}

const Model: ModelType = {
  namespace: 'customerCenter',
  state: {
    customerId: '',
    companyId: '',
  },
  effects: {
    * addCustomerId ({payload}, {put}) {
      yield put({
        type: 'saveCustomerId',
        payload: payload.customerId
      });
    },
    * addCompanyId ({payload}, {put}) {
      yield put({
        type: 'saveCompanyId',
        payload: payload.companyId
      });
    }
  },
  reducers: {
    // @ts-ignore
    saveCustomerId (state, {payload}) {
      return {
        ...state,
        customerId: payload
      }
    },
    // @ts-ignore
    saveCompanyId (state, {payload}) {
      return {
        ...state,
        companyId: payload
      }
    }
  }
}

export default Model;

import { Effect, Reducer } from '@umijs/max';

export interface ReviewState {
  list: any[];
  loading: boolean;
}

export interface ReviewModelType {
  namespace: string;
  state: ReviewState;
  effects: {
    getList: Effect;
    submitReply: Effect;
  };
  reducers: {
    saveList: Reducer<ReviewState>;
    setLoading: Reducer<ReviewState>;
  };
}

const ReviewModel: ReviewModelType = {
  namespace: 'review',
  state: { list: [], loading: false },
  effects: {
    *getList({ payload }, { call, put }) {
      yield put({ type: 'setLoading', payload: true });
    
      yield put({ type: 'saveList', payload: [] });
      yield put({ type: 'setLoading', payload: false });
    },
    *submitReply({ payload }, { call, put }) {
    
      yield put({ type: 'getList', payload: {} });
    },
  },
  reducers: {
    saveList(state, action) {
      return { ...state!, list: action.payload };
    },
    setLoading(state, action) {
      return { ...state!, loading: action.payload };
    },
  },
};

export default ReviewModel;
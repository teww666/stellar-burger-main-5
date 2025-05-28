import { AsyncThunk } from '@reduxjs/toolkit';
import userSlice, {
  getUser,
  getOrdersAll,
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
  TUserState,
  initialState
} from './userSlice';

const testAsyncAction = (
  actionCreator: AsyncThunk<any, any, any>,
  actions: {
    pending: { type: string; payload: null };
    rejected: { type: string; error?: { message: string }; payload?: null };
    fulfilled: { type: string; payload: any };
  },
  expectations: {
    pending: (state: TUserState) => void;
    rejected: (state: TUserState) => void;
    fulfilled: (state: TUserState) => void;
  }
) => {
  describe(`тестирование асинхронного экшена ${actionCreator.typePrefix}`, () => {
    test('pending', () => {
      const state = userSlice(initialState, actions.pending);
      expectations.pending(state);
    });

    test('rejected', () => {
      const state = userSlice(initialState, actions.rejected);
      expectations.rejected(state);
    });

    test('fulfilled', () => {
      const state = userSlice(initialState, actions.fulfilled);
      expectations.fulfilled(state);
    });
  });
};

describe('тестирование редьюсера userSlice', () => {
  testAsyncAction(getUser, {
    pending: {
      type: getUser.pending.type,
      payload: null
    },
    rejected: {
      type: getUser.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: getUser.fulfilled.type,
      payload: { user: { name: 'someName', email: 'someEmail' } }
    }
  }, {
    pending: (state) => {
      expect(state.isAuthenticated).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.loginUserRequest).toBe(true);
    },
    rejected: (state) => {
      expect(state.isAuthenticated).toBe(false);
      expect(state.isAuthChecked).toBe(false);
      expect(state.loginUserRequest).toBe(false);
    },
    fulfilled: (state) => {
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
      expect(state.userData).toEqual({ name: 'someName', email: 'someEmail' });
      expect(state.isAuthChecked).toBe(false);
    }
  });

  testAsyncAction(getOrdersAll, {
    pending: {
      type: getOrdersAll.pending.type,
      payload: null
    },
    rejected: {
      type: getOrdersAll.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: getOrdersAll.fulfilled.type,
      payload: ['order1', 'order2']
    }
  }, {
    pending: (state) => {
      expect(state.request).toBe(true);
      expect(state.error).toBe(null);
    },
    rejected: (state) => {
      expect(state.request).toBe(false);
      expect(state.error).toBe('Funny mock-error');
    },
    fulfilled: (state) => {
      expect(state.request).toBe(false);
      expect(state.userOrders).toEqual(['order1', 'order2']);
    }
  });

  testAsyncAction(registerUser, {
    pending: {
      type: registerUser.pending.type,
      payload: null
    },
    rejected: {
      type: registerUser.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: registerUser.fulfilled.type,
      payload: { user: { name: 'someName', email: 'someEmail' } }
    }
  }, {
    pending: (state) => {
      expect(state.request).toBe(true);
      expect(state.error).toBe(null);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
    },
    rejected: (state) => {
      expect(state.request).toBe(false);
      expect(state.error).toBe('Funny mock-error');
      expect(state.isAuthChecked).toBe(false);
    },
    fulfilled: (state) => {
      expect(state.request).toBe(false);
      expect(state.error).toBe(null);
      expect(state.response).toEqual({ name: 'someName', email: 'someEmail' });
      expect(state.userData).toEqual({ name: 'someName', email: 'someEmail' });
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(true);
    }
  });

  testAsyncAction(loginUser, {
    pending: {
      type: loginUser.pending.type,
      payload: null
    },
    rejected: {
      type: loginUser.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: loginUser.fulfilled.type,
      payload: { user: { name: 'someName', email: 'someEmail' } }
    }
  }, {
    pending: (state) => {
      expect(state.loginUserRequest).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(false);
      expect(state.error).toBe(null);
    },
    rejected: (state) => {
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe('Funny mock-error');
    },
    fulfilled: (state) => {
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.loginUserRequest).toBe(false);
      expect(state.error).toBe(null);
      expect(state.userData).toEqual({ name: 'someName', email: 'someEmail' });
    }
  });

  testAsyncAction(updateUser, {
    pending: {
      type: updateUser.pending.type,
      payload: null
    },
    rejected: {
      type: updateUser.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: updateUser.fulfilled.type,
      payload: { user: { name: 'someName', email: 'someEmail' } }
    }
  }, {
    pending: (state) => {
      expect(state.request).toBe(true);
      expect(state.error).toBe(null);
    },
    rejected: (state) => {
      expect(state.request).toBe(false);
      expect(state.error).toBe('Funny mock-error');
    },
    fulfilled: (state) => {
      expect(state.request).toBe(false);
      expect(state.error).toBe(null);
      expect(state.response).toEqual({ name: 'someName', email: 'someEmail' });
    }
  });

  testAsyncAction(logoutUser, {
    pending: {
      type: logoutUser.pending.type,
      payload: null
    },
    rejected: {
      type: logoutUser.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: logoutUser.fulfilled.type,
      payload: null
    }
  }, {
    pending: (state) => {
      expect(state.request).toBe(true);
      expect(state.isAuthChecked).toBe(true);
      expect(state.isAuthenticated).toBe(true);
      expect(state.error).toBe(null);
    },
    rejected: (state) => {
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.request).toBe(false);
      expect(state.error).toBe('Funny mock-error');
    },
    fulfilled: (state) => {
      expect(state.isAuthChecked).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.request).toBe(false);
      expect(state.error).toBe(null);
      expect(state.userData).toBe(null);
    }
  });
});

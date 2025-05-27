import orderSlice, { initialState, getOrderByNumber } from './orderSlice';
import { AsyncThunk } from '@reduxjs/toolkit';
import { TOrderState } from './orderSlice';

describe('тестирование редьюсера orderSlice', () => {
  const testAsyncAction = (
    actionCreator: AsyncThunk<any, any, any>,
    actions: {
      pending: { type: string; payload: null };
      rejected: { type: string; error: { message: string } };
      fulfilled: { type: string; payload: { orders: string[] } };
    },
    expectations: {
      pending: (state: TOrderState) => void;
      rejected: (state: TOrderState) => void;
      fulfilled: (state: TOrderState) => void;
    }
  ) => {
    describe(`тестирование асинхронного экшена ${actionCreator.typePrefix}`, () => {
      test('pending', () => {
        const state = orderSlice(initialState, actions.pending);
        expectations.pending(state);
      });

      test('rejected', () => {
        const state = orderSlice(initialState, actions.rejected);
        expectations.rejected(state);
      });

      test('fulfilled', () => {
        const state = orderSlice(initialState, actions.fulfilled);
        expectations.fulfilled(state);
      });
    });
  };

  testAsyncAction(getOrderByNumber, {
    pending: {
      type: getOrderByNumber.pending.type,
      payload: null
    },
    rejected: {
      type: getOrderByNumber.rejected.type,
      error: { message: 'Funny mock-error' }
    },
    fulfilled: {
      type: getOrderByNumber.fulfilled.type,
      payload: { orders: ['someOrder'] }
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
      expect(state.orderByNumberResponse).toBe('someOrder');
    }
  });
});

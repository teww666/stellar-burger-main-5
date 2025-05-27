import feedSlice, { getFeeds, initialState } from './feedSlice';

describe('тестирование редьюсера feedSlice', () => {
  const testAsyncAction = (
    action: {
      type: string;
      payload?: any;
      error?: { message: string };
    },
    expectations: (state: any) => void
  ) => {
    test(`тест синхронного экшена ${action.type}`, () => {
      const state = feedSlice(initialState, action);
      expectations(state);
    });
  };

  describe('тестирование асинхронного GET экшена getFeeds', () => {
    const actions = {
      pending: {
        type: getFeeds.pending.type,
        payload: null
      },
      rejected: {
        type: getFeeds.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getFeeds.fulfilled.type,
        payload: { orders: ['order1', 'order2'] }
      }
    };

    testAsyncAction(actions.pending, (state) => {
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    testAsyncAction(actions.rejected, (state) => {
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
    });

    testAsyncAction(actions.fulfilled, (state) => {
      expect(state.loading).toBe(false);
      expect(state.orders).toEqual(actions.fulfilled.payload.orders);
    });
  });
});

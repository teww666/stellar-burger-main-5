import ingredientSlice, {
  getIngredients,
  initialState
} from './ingredientSlice';

describe('тестирование редьюсера ingredientSlice', () => {
  const testAsyncAction = (
    action: {
      type: string;
      payload?: any;
      error?: { message: string };
    },
    expectations: (state: any) => void
  ) => {
    test(`тест синхронного экшена ${action.type}`, () => {
      const state = ingredientSlice(initialState, action);
      expectations(state);
    });
  };

  describe('тестирование асинхронного GET экшена getIngredients', () => {
    const actions = {
      pending: {
        type: getIngredients.pending.type,
        payload: null
      },
      rejected: {
        type: getIngredients.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: getIngredients.fulfilled.type,
        payload: ['ingr1', 'ingr2']
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
      expect(state.ingredients).toEqual(actions.fulfilled.payload);
    });
  });
});

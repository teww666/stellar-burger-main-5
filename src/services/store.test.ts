import store, { rootReducer } from './store';
import { initialState as ingredientInitialState } from './slices/ingredientSlice/ingredientSlice';
import { initialState as orderInitialState } from './slices/orderSlice/orderSlice';
import { initialState as constructorInitialState } from './slices/constructorSlice/constructorSlice';
import { initialState as feedInitialState } from './slices/feedSlice/feedSlice';
import { initialState as userInitialState } from './slices/userSlice/userSlice';

describe('Store tests', () => {
  it('should properly handle rootReducer', () => {
    const expectedState = {
      ingredient: ingredientInitialState,
      order: orderInitialState,
      constructorBurger: constructorInitialState,
      feed: feedInitialState,
      user: userInitialState
    };
    
    // Get actual state from store
    const actualState = store.getState();
    
    // Compare states
    expect(actualState).toEqual(expectedState);
  });
});

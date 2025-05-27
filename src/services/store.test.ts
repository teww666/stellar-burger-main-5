import store, { rootReducer } from '../services/store';

describe('Store tests', () => {
  it('should properly handle rootReducer', () => {
    // Get expected state from reducer
    const expectedState = rootReducer(undefined, { 
      type: 'UNKNOWN_ACTION' 
    });
    
    // Get actual state from store
    const actualState = store.getState();
    
    // Compare states
    expect(expectedState).toEqual(actualState);
  });
});

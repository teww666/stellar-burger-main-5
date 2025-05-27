import constructorSlice, {
  addIngredient,
  initialState,
  moveIngredientDown,
  moveIngredientUp,
  orderBurger,
  removeIngredient
} from './constructorSlice';
import { expect, test, describe } from '@jest/globals';

describe('тестирование редьюсера constructorSlice', () => {
  const testAsyncAction = (
    action: {
      type: string;
      payload?: any;
      error?: { message: string };
    },
    expectations: (state: any) => void
  ) => {
    test(`тест синхронного экшена ${action.type}`, () => {
      const state = constructorSlice(initialState, action);
      expectations(state);
    });
  };

  describe('тестирование экшена addIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: []
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const testIngredient = {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
    };

    const testBun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const testBun2 = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
    };

    test('добавление ингредиента в массив ingredients', () => {
      const newState = constructorSlice(initialState, addIngredient(testIngredient));
      expect(newState.constructorItems.ingredients[0]).toEqual({
        ...testIngredient,
        id: expect.any(String)
      });
    });

    test('добавление булки в пустое поле', () => {
      const newState = constructorSlice(initialState, addIngredient(testBun));
      expect(newState.constructorItems.bun).toEqual({
        ...testBun,
        id: expect.any(String)
      });
    });

    test('добавление булки с заменой ранее добавленной', () => {
      const initialStateWithBun = {
        ...initialState,
        constructorItems: {
          bun: { ...testBun, id: 'its so funny =D' },
          ingredients: []
        }
      };

      const newState = constructorSlice(initialStateWithBun, addIngredient(testBun2));
      expect(newState.constructorItems.bun).toEqual({
        ...testBun2,
        id: expect.any(String)
      });
    });
  });

  describe('тестирование экшена removeIngredient', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [{
          id: 'funny',
          _id: '643d69a5c3f7b9001cfa0944',
          name: 'Соус традиционный галактический',
          type: 'sauce',
          proteins: 42,
          fat: 24,
          carbohydrates: 42,
          calories: 99,
          price: 15,
          image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
          image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
        }]
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    test('удаление ингредиента из конструктора', () => {
      const newState = constructorSlice(initialState, removeIngredient('funny'));
      expect(newState.constructorItems.ingredients).toEqual([]);
    });
  });

  describe('тестирование экшенов перемещения: moveIngredientUp & moveIngredientDown', () => {
    const testIngredients = [
      {
        id: 'funnyPig1',
        _id: '643d69a5c3f7b9001cfa0944',
        name: 'Соус традиционный галактический',
        type: 'sauce',
        proteins: 42,
        fat: 24,
        carbohydrates: 42,
        calories: 99,
        price: 15,
        image: 'https://code.s3.yandex.net/react/code/sauce-03.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sauce-03-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-03-large.png'
      },
      {
        id: 'funnyPig2',
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/mineral_rings-large.png'
      },
      {
        id: 'funnyPig3',
        _id: '643d69a5c3f7b9001cfa0947',
        name: 'Плоды Фалленианского дерева',
        type: 'main',
        proteins: 20,
        fat: 5,
        carbohydrates: 55,
        calories: 77,
        price: 874,
        image: 'https://code.s3.yandex.net/react/code/sp_1.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/sp_1-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sp_1-large.png'
      }
    ];

    const testBun = {
      id: 'funBun',
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    };

    const initialState = {
      constructorItems: {
        bun: testBun,
        ingredients: testIngredients
      },
      loading: false,
      orderRequest: false,
      orderModalData: null,
      error: null
    };

    const expectedIngredients = [
      testIngredients[0],
      testIngredients[2],
      testIngredients[1]
    ];

    test('перемещение ингредиента на позицию выше', () => {
      const newState = constructorSlice(initialState, moveIngredientUp(2));
      expect(newState.constructorItems.ingredients).toEqual(expectedIngredients);
    });

    test('перемещение ингредиента на позицию ниже', () => {
      const newState = constructorSlice(initialState, moveIngredientDown(1));
      expect(newState.constructorItems.ingredients).toEqual(expectedIngredients);
    });
  });

  describe('тестирование асинхронного POST экшена orderBurger', () => {
    const actions = {
      pending: {
        type: orderBurger.pending.type,
        payload: null
      },
      rejected: {
        type: orderBurger.rejected.type,
        error: { message: 'Funny mock-error' }
      },
      fulfilled: {
        type: orderBurger.fulfilled.type,
        payload: { order: { number: 404 } }
      }
    };

    testAsyncAction(actions.pending, (state) => {
      expect(state.loading).toBe(true);
      expect(state.error).toBe(actions.pending.payload);
    });

    testAsyncAction(actions.rejected, (state) => {
      expect(state.loading).toBe(false);
      expect(state.error).toBe(actions.rejected.error.message);
      expect(state.orderModalData).toBe(null);
    });

    testAsyncAction(actions.fulfilled, (state) => {
      expect(state.loading).toBe(false);
      expect(state.error).toBe(null);
      expect(state.orderModalData?.number).toBe(actions.fulfilled.payload.order.number);
    });
  });
});

import Cypress from 'cypress';

const BASE_URL = 'https://norma.nomoreparties.space/api';
const ID_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093c'}]`;
const ID_ANOTHER_BUN = `[data-cy=${'643d69a5c3f7b9001cfa093d'}]`;
const ID_FILLING = `[data-cy=${'643d69a5c3f7b9001cfa0941'}]`;

describe('Тестирование функционала конструктора бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BASE_URL}/ingredients`, {
      fixture: 'ingredients.json'
    });
    cy.intercept('POST', `${BASE_URL}/auth/login`, {
      fixture: 'user.json'
    });
    cy.intercept('GET', `${BASE_URL}/auth/user`, {
      fixture: 'user.json'
    });
    cy.intercept('POST', `${BASE_URL}/orders`, {
      fixture: 'orderResponse.json'
    });
    cy.visit('/');
    cy.viewport(1440, 800);
    cy.get('#modals').as('modal');
  });

  describe('Работа с ингредиентами', () => {
    it('должен увеличивать счетчик при добавлении ингредиента', () => {
      cy.get(ID_FILLING).children('button').click();
      cy.get(ID_FILLING).find('.counter__num').contains('1');
    });

    describe('Добавление компонентов бургера', () => {
      it('должен добавлять булку и начинку в указанном порядке', () => {
        cy.get(ID_BUN).children('button').click();
        cy.get(ID_FILLING).children('button').click();
      });

      it('должен добавлять булку после добавления начинки', () => {
        cy.get(ID_FILLING).children('button').click();
        cy.get(ID_BUN).children('button').click();
      });
    });

    describe('Замена булок', () => {
      it('должен заменять булку при пустом списке начинок', () => {
        cy.get(ID_BUN).children('button').click();
        cy.get(ID_ANOTHER_BUN).children('button').click();
      });

      it('должен заменять булку при наличии начинок', () => {
        cy.get(ID_BUN).children('button').click();
        cy.get(ID_FILLING).children('button').click();
        cy.get(ID_ANOTHER_BUN).children('button').click();
      });
    });
  });

  describe('Оформление заказа', () => {
    beforeEach(() => {
      window.localStorage.setItem('refreshToken', 'ipsum');
      cy.setCookie('accessToken', 'lorem');
      cy.getAllLocalStorage().should('be.not.empty');
      cy.getCookie('accessToken').should('be.not.empty');
    });

    afterEach(() => {
      window.localStorage.clear();
      cy.clearAllCookies();
      cy.getAllLocalStorage().should('be.empty');
      cy.getAllCookies().should('be.empty');
    });

    it('должен корректно отправлять и получать данные заказа', () => {
      cy.get(ID_BUN).children('button').click();
      cy.get(ID_FILLING).children('button').click();
      cy.get(`[data-cy='order-button']`).click();
      cy.get('@modal').find('h2').contains('38483');
    });
  });

  describe('Модальные окна', () => {
    describe('Работа с модальным окном ингредиента', () => {
      beforeEach(() => {
        cy.get('@modal').should('be.empty');
        cy.get(ID_FILLING).children('a').click();
        cy.get('@modal').should('be.not.empty');
      });

      it('должно открываться и отображать данные ингредиента', () => {
        cy.url().should('include', '643d69a5c3f7b9001cfa0941');
      });

      it('должно закрываться при клике на кнопку закрытия', () => {
        cy.get('@modal').find('button').click();
        cy.get('@modal').should('be.empty');
      });

      it('должно закрываться при клике на оверлей', () => {
        cy.get(`[data-cy='overlay']`).click({ force: true });
        cy.get('@modal').should('be.empty');
      });

      it('должно закрываться при нажатии клавиши Escape', () => {
        cy.get('body').trigger('keydown', { key: 'Escape' });
        cy.get('@modal').should('be.empty');
      });
    });
  });
});

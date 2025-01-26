describe('app works correctly with routes', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('should open Burger Constructor Page by default', function () {
        cy.contains('Соберите бургер');
    });

    it('should open Feed Page after Feed link click', function () {
        cy.get('a').contains('Лента заказов').click();
        cy.contains('Лента заказов');
        cy.url().should('include', '/feed');
    });

    it('should open Login Page after Profile link clicked', function () {
        cy.get('a').contains('Личный кабинет').click();
        cy.contains('Вход');
        cy.url().should('include', '/login');
    });

    it('should open Register Page after Register link clicked', function () {
        cy.visit('/login');
        cy.get('a').contains('Зарегистрироваться').click();
        cy.contains('Регистрация');
        cy.url().should('include', '/register');
    });

    it('should open Forgot Password Page after Recover Password link clicked', function () {
        cy.visit('/login');
        cy.get('a').contains('Восстановить пароль').click();
        cy.contains('Восстановление пароля');
        cy.url().should('include', '/forgot-password');
    });

    it('should open Profile page', function () {
        window.localStorage.setItem('accessToken', 'test-accessToken');
        cy.wait(300);
        cy.visit('/profile/edit');
        cy.contains('Профиль');
        cy.get('input[name="name"]').should('have.value', 'TestName');
    });
}); 
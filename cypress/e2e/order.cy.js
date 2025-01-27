describe('app order works correctly', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('should create order', function () {
        cy.get('[data-cy="ingredient-list"] #category_bun a').first().as('ingredientBun');
        cy.get('[data-cy="ingredient-list"] #category_main a').first().as('ingredientMain');

        cy.get('@ingredientBun').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        cy.get('@ingredientMain').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        cy.get('@ingredientMain').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        window.localStorage.setItem('accessToken', 'test-accessToken');
        cy.get('[data-cy="order-create"]').click();
        cy.wait('@postOrder');

        cy.get('#react-modals').first().as('modal');
        cy.get('@modal').should('contain', 'идентификатор заказа');
        cy.get('@modal').should('contain', '66698');
    });

    it('should not create order with only buns', function () {
        cy.get('[data-cy="ingredient-list"] #category_bun a').first().as('ingredientBun');

        cy.get('@ingredientBun').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        window.localStorage.setItem('accessToken', 'test-accessToken');
        cy.get('[data-cy="order-create"]').click();

        cy.get('#react-modals').first().as('modal');
        cy.get('@modal').should('contain', 'Ошибка');
        cy.get('@modal').should('contain', 'Выберите ингредиенты');
    });


}); 
describe('app modals works correctly', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('should open modal on ingredient click', function () {
        cy.get('[data-cy="ingredient-list"] a').first().as('ingredient');
        cy.get('@ingredient')
            .find('img')
            .invoke('attr', 'alt')
            .as('ingredientName');
        cy.get('@ingredient').click();

        cy.get('@ingredientName').then((ingredientName) => {
            cy.get('#react-modals').first().as('modal');
            cy.get('@modal').should('contain', ingredientName);
            cy.get('@modal').should('contain', 'Калории');
            cy.get('@modal').should('contain', 'Детали ингредиента');
        });
    });

    it('should close modal on close icon click', function () {
        cy.get('[data-cy="ingredient-list"] a').first().as('ingredient').click();

        cy.get('#react-modals').first().as('modal');
        cy.get('@modal').should('contain', 'Детали ингредиента');

        cy.get('[data-cy="modal-close"]').click();
        cy.get('@modal').should('be.empty');
    });

    it('should close modal on overlay click', function () {
        cy.get('[data-cy="ingredient-list"] a').first().as('ingredient').click();

        cy.get('#react-modals').first().as('modal');
        cy.get('@modal').should('contain', 'Детали ингредиента');

        cy.get('[data-cy="modal-overlay"]').click({force: true});
        cy.get('@modal').should('be.empty');
    });

    it('should close modal on Escape button press', function () {
        cy.get('[data-cy="ingredient-list"] a').first().as('ingredient').click();

        cy.get('#react-modals').first().as('modal');
        cy.get('@modal').should('contain', 'Детали ингредиента');

        cy.get('body').type('{esc}');
        cy.get('@modal').should('be.empty');
    });


}); 
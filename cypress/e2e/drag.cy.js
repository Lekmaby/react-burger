describe('app drag works correctly', function () {
    beforeEach(function () {
        cy.visit('/');
    });

    it('should drag ingredient bun', function () {
        cy.get('[data-cy="ingredient-list"] #category_bun a').first().as('ingredientBun');
        cy.get('@ingredientBun')
            .find('img')
            .invoke('attr', 'alt')
            .as('ingredientName');

        cy.get('@ingredientBun').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        cy.get('@ingredientName').then((ingredientName) => {
            cy.get('[data-cy="burger-constructor"]').find('img').invoke('attr', 'alt')
                .then((ingredientNameConstructor) => {
                    cy.wrap(ingredientNameConstructor).should('eq', ingredientName + ' (верх)');
                });
        });
    });

    it('should drag ingredient main', function () {
        cy.get('[data-cy="ingredient-list"] #category_main a').first().as('ingredientMain');
        cy.get('@ingredientMain')
            .find('img')
            .invoke('attr', 'alt')
            .as('ingredientName');

        cy.get('@ingredientMain').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        cy.get('@ingredientName').then((ingredientName) => {
            cy.get('[data-cy="burger-constructor"]').find('img').invoke('attr', 'alt')
                .then((ingredientNameConstructor) => {
                    cy.wrap(ingredientNameConstructor).should('eq', ingredientName);
                });
        });
    });

    it('should reorder ingredient in constructor', function () {
        // Добавляем два ингредиента в конструктор
        cy.get('[data-cy="ingredient-list"] #category_main a').first().as('ingredientItem1');
        cy.get('[data-cy="ingredient-list"] #category_main a').last().as('ingredientItem2');

        cy.get('@ingredientItem1').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        cy.get('@ingredientItem2').trigger('dragstart')
        cy.get('[data-cy="burger-constructor"]').trigger('drop');

        // Проверяем, что они добавились
        cy.get('[data-cy="burger-constructor"] li[draggable="true"]').first().should('exist').as('ingredient1');
        cy.get('[data-cy="burger-constructor"] li[draggable="true"]').last().should('exist').as('ingredient2');

        // Получаем позиции ингредиентов в конструкторе до перетаскивания
        cy.get('@ingredient1').then(($ingredient1) => {
            const ingredient1IndexBefore = $ingredient1.index();

            cy.get('@ingredient2').then(($ingredient2) => {
                const ingredient2IndexBefore = $ingredient2.index();

                // Перетаскиваем ingredient2 на ingredient1
                cy.get('@ingredient2')
                    .trigger('dragstart');

                cy.get('@ingredient1')
                    .scrollIntoView()
                    .trigger('dragover');

                cy.wait(300);

                cy.get('@ingredient1')
                    .trigger('drop');

                // Проверяем, что их индексы поменялись
                cy.get('@ingredient1').then(($ingredient1After) => {
                    const ingredient1IndexAfter = $ingredient1After.index();

                    cy.get('@ingredient2').then(($ingredient2After) => {
                        const ingredient2IndexAfter = $ingredient2After.index();

                        // Проверяем, что их индексы изменились
                        expect(ingredient1IndexBefore).to.not.eq(ingredient1IndexAfter);
                        expect(ingredient2IndexBefore).to.not.eq(ingredient2IndexAfter);
                        expect(ingredient1IndexAfter).to.eq(ingredient2IndexBefore);
                        expect(ingredient2IndexAfter).to.eq(ingredient1IndexBefore);
                    });
                });
            });
        });


    });

}); 
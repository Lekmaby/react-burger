describe('app is available', function () {
    it('should be available on localhost:5173', function () {
        cy.visit('/');
    });
}); 
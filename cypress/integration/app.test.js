/* eslint-disable */

const AUTH_API =
  'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth';

it('should load the page', () => {
  cy.visit('/');

  cy.findAllByText(/a better way/i).should('have.length', 1);
});

it('successfull submits to api', () => {
  cy.visit('/');
  cy.findByText(/request an invite/i).click();

  cy.findByRole('dialog').within(() => {
    cy.findByLabelText(/full name/i).type('anh');
    cy.findByLabelText(/^email/i).type('anh@gmail.com');
    cy.findByLabelText(/confirm email/i).type('anh@gmail.com');
    cy.findByText(/submit/i).click();

    cy.intercept(AUTH_API).as('api');
    cy.wait('@api').its('response.statusCode').should('eq', 200);
    cy.findByText(/all done/i).should('exist');
  });
});

/// <reference types="Cypress" />

const faker = require('faker');
const URLs = {
  formPage: 'http://webdriveruniversity.com/Contact-Us/contactus.html',
  submitPage: '/contact_us.php',
  thankYouPage: '/contact-form-thank-you.html'
};
const Messages = {
  allFieldsRequired: 'Error: all fields are required',
  invalidEmail: 'Error: Invalid email address',
  success: 'Thank You for your Message!'
};
const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  message: ''
};

function fillInFormData(inputData) {
  Object.entries(inputData).forEach(([key, value]) => {
    cy.get(`[name=${key}]`).type(value);
  });
}

function validateFormInputValues(expectedData) {
  Object.entries(expectedData).forEach(([key, value]) => {
    cy.get(`[name=${key}]`).should('have.value', value);
  });
}

function generateInputData(defaultData = {}) {
  const { first_name, last_name, email, message } = defaultData;
  return {
    first_name: first_name || faker.name.firstName(),
    last_name: last_name || faker.name.lastName(),
    email: email || faker.internet.email(),
    message: message || faker.lorem.sentence()
  };
}

function submitForm() {
  cy.get('[type="submit"]').click();
}

describe('Complete Contact Us Form Tests', () => {
  beforeEach(() => {
    cy.visit(URLs.formPage);
  });

  it('Verifies that input fields are empty', () => {
    validateFormInputValues(emptyForm);
  });

  it('Submits empty form and checks for errors', () => {
    validateFormInputValues(emptyForm);
    submitForm();
    cy.url().should('include', URLs.submitPage);
    cy.contains(Messages.allFieldsRequired);
    cy.contains(Messages.invalidEmail);
  });

  it('Fills the form with invalid email and checks for errors', () => {
    fillInFormData(generateInputData({ email: 'invalidEmail' }));
    submitForm();
    cy.url().should('include', URLs.submitPage);
    cy.contains(Messages.invalidEmail);
  });

  it('Fills the form with valid data and submits', () => {
    const inputData = generateInputData({});
    fillInFormData(inputData);
    submitForm();
    cy.url().should('include', URLs.thankYouPage);
    cy.contains(Messages.success);
    cy.go('back');
    validateFormInputValues(inputData);
  });

  it('Resets the form and verifies fields are empty', () => {
    const inputData = generateInputData({});
    fillInFormData(inputData);
    validateFormInputValues(inputData);
    cy.get('[type="reset"]').should('be.enabled').click();
    validateFormInputValues(emptyForm);
  });
});



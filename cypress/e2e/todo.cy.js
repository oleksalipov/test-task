/// <reference types="Cypress" />
import "cypress-real-events/support";

const URL = 'http://webdriveruniversity.com/To-Do-List/';
const PLUS_ICON_ID = '#plus-icon';
const TODO_ITEM_SELECTOR = 'ul>li';
const FIRST_TODO_ITEM_SELECTOR = 'li:first';
const TODO_ITEM_TEXT_DECORATION = 'text-decoration-line';
const DELETE_ICON_CLASS = '.fa-trash';
const LINE_THROUGH = 'line-through';
const NEW_TODO_ITEM = 'Learn Cypress!';
const NO_FILE_UPLOADED_TEXT = 'You need to select a file to upload!';
const TODO_LIST_ITEM = 'Go to potion class';

function getAddNewToDoInput() {
  return cy.get('#container > input[type=text]');
}

function clickPlusButton() {
  cy.get(PLUS_ICON_ID).click();
}

function lastToDoShouldContain(text) {
  cy.get(TODO_ITEM_SELECTOR).last().should('contain', text);
}

describe('ToDo List Actions', () => {

  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit(URL);
  })

  it('Should have Add ToDo items input', () => {
    getAddNewToDoInput().should('be.visible');
  });

  it('Should add a new element upon clicking on plus', () => {
    clickPlusButton();
    getAddNewToDoInput().type(`${NEW_TODO_ITEM}{enter}`);
    lastToDoShouldContain(NEW_TODO_ITEM);
  });

  describe('Should toggle "Add new Todo" input field and', () => {

    it('Should hide it upon click', () => {
      clickPlusButton();
      getAddNewToDoInput().should('not.be.visible');
    });

    it('Should show it once clicked again', () => {
      clickPlusButton();
      getAddNewToDoInput().should('not.be.visible');
      
      clickPlusButton();
      getAddNewToDoInput().should('be.visible');
    });
  });

  it('Should strike through the items upon click', () => {
    cy.get(TODO_ITEM_SELECTOR).each(($el) => {
      cy.wrap($el).click().should('have.css', TODO_ITEM_TEXT_DECORATION, LINE_THROUGH);
    });
  });

  it('Should display "Delete" button upon hover', () => {
    cy.get(FIRST_TODO_ITEM_SELECTOR).realHover('mouse').children().find(DELETE_ICON_CLASS).should('be.visible');
  });

  it('Should erase the deleted element from the list', () => {
    cy.contains(TODO_LIST_ITEM).find(DELETE_ICON_CLASS).click();
    cy.contains(TODO_LIST_ITEM).should('not.exist');
  });
});




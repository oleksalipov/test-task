import 'cypress-file-upload';

const URL = 'http://webdriveruniversity.com/File-Upload/index.html';
const FILEPATH = 'example.json'; // Ensure this file is in cypress/fixtures directory
const NO_FILE_ALERT = 'You need to select a file to upload!';
const SUCCESS_ALERT = 'Your file has now been uploaded!';
const FILE_INPUT_FIELD_SELECTOR = '#myFile';
const SUBMIT_BUTTON_SELECTOR = '#submit-button';

function uploadFile(filepath) {
    cy.get(FILE_INPUT_FIELD_SELECTOR).attachFile(filepath);
}

function submitForm() {
    cy.get(SUBMIT_BUTTON_SELECTOR).click();
}

function validateAlertMessage(expectedMessage) {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(expectedMessage);
    });
}

describe('File Upload Test', () => {
    beforeEach(() => {
        cy.visit(URL);
    });

    it('Should alert when no file is uploaded and send is clicked', () => {
        // Verify "Send" button is active and click on it
        submitForm();

        // Handle alert and verify text for no file uploaded
        validateAlertMessage(NO_FILE_ALERT);
    });

    it('Successfully uploads a file and verifies notification', () => {
        // Upload a file
        uploadFile(FILEPATH);

        //Assert the filename is correct (example.json in this case)
        cy.get(FILE_INPUT_FIELD_SELECTOR)
         .invoke('val')
         .should('eq', `C:\\fakepath\\${FILEPATH}`);
        
        // Click on the "Send" button and verify the notification
        submitForm();        
        validateAlertMessage(SUCCESS_ALERT);
    });
});

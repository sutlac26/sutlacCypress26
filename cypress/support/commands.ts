// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { Utils } from "@support/utils";

const utils = new Utils();

const authUrl = "";

//
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getAuth(): Cypress.Chainable;
      login(): Cypress.Chainable;
    }
  }
}

Cypress.Commands.add("login", () => {
  return cy
    .request({
      method: "GET",
      url:
        "https://accounts.spotify.com/authorize?response_type=code&state=&client_id=13e44cbc6d7043caa64ac09a44d1e49c&scope=playlist-read-private%20playlist-modify-private&redirect_uri=http%3A%2F%2Flocalhost%3A9876%2Fcallback%2F",
    })
    .then((response: Cypress.Response) => {});
});

/**
 * getAuth - A function to return authentication token
 */
Cypress.Commands.add("getAuth", { prevSubject: true }, () => {
  return cy
    .request({
      method: "POST",
      url: "https://accounts.spotify.com/api/token",
      headers: {
        Accept: "*/*",
        Autherization:
          "Basic MTNlNDRjYmM2ZDcwNDNjYWE2NGFjMDlhNDRkMWU0OWM6ZjIxZWYxMzc1NGIxNGZmODlkNzEzMWVlNThhY2NjMDI=",
      },
      body: {
        grant_type: "authorization_code",
        code:
          "AQDYei7MhoTA8g8Bxax1MtsRNVhue7gOtIZZ_6yu88gGbKuN6uckJDi0IK_-6THFWVdwukHkiX0i9R1dTrWWzuviHO_nrCYIFBWmAWhIMBcr6nJKYhDK_HR__ael4_heMAxOl6W-SKx0oLL8RpyU5c_XZ_O7D0DPJJc6b_zFOUmkFmAAsDmT-nu-Vum00EMMV_Cd4l5Y1dJQX16a_l1Hal1XTnFDU4_nBb6WTq4TetuRLcY",
        redirect_uri: "http://localhost:9876/callback/",
        client_id: "13e44cbc6d7043caa64ac09a44d1e49c",
      },
      timeout: Cypress.config("pageLoadTimeout"),
    })
    .then((response: Cypress.Response) => {
      return cy.wrap({ auth: response.body.access_token });
    });
});

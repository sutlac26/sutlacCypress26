// tag
import { assertSchema } from "@cypress/schema-tools";
import { albumsSchemas } from "@schemas/albums/albums.schema";
import * as bearerToken from "@fixtures/bearer.json";

const assertAlbums100 = assertSchema(albumsSchemas)("Albums", "1.0.0");

describe("When I send a GET request to /albums", () => {
  it("Then I should get 200 status and correct format for a valid submission", () => {
    // cy.
    // login()
    //   .getAuth()
    //   .then((auth) => {
    return cy
      .request({
        method: "GET",
        url: `${Cypress.config("baseUrl")}/v1/albums`,
        headers: {
          Authorization: `Bearer ${bearerToken.bearer}`,
        },
        qs: {},
        timeout: Cypress.config("pageLoadTimeout"),
      })
      .then((response: Cypress.Response) => {
        assert.equal(response.status, 200, "ASSERT STATUS");
        assert.deepEqual(
          assertAlbums100(response.body),
          response.body,
          "ASSERT FORMAT"
        );
        cy.log(response.body);
      });
    //   });
  });
});

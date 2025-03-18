describe("My First Test", () => {
  it("Gets, types and asserts", () => {
    cy.visit("https://example.cypress.io");

    cy.contains("type").click();

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should("include", "/commands/actions");

    // Get an input, type into it
    cy.get(".action-email").type("fake@email.com");

    //  Verify that the value has been updated
    cy.get(".action-email").should("have.value", "fake@email.com");
  });
});

it.only("Test api with simple intercept", () => {
  cy.visit("https://jsonplaceholder.typicode.com/");
  cy.intercept("GET", "/posts", {
    statusCode: 200,
    body: [
      { id: 1, title: "Intercepted Post", body: "This is a mocked response" },
    ],
  }).as("posts");
  cy.get('table:nth-of-type(1) td a[href="/posts"]').click();
  cy.wait("@posts");
});
